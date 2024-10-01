
const { Op } = require('sequelize');
const { models, sequelize } = require("../lib/sequelize");
const { Product } = require("../models/product");
const { Store } = require('../models/store');
const { SaleItems } = require("../models/saleitems");
const boom = require('@hapi/boom');
const moment = require('moment-timezone');

class SalesService {
  constructor() {}

   ///Create  Sale
  async create(data) {
 
    const transaction = await sequelize.transaction();
    
    try{
     console.log(data);
     console.log(data.store);
     console.log(data.seller);
     console.log(data.saletype);
        
    
  

      let totalSale = 0;
  
     const newSale = await models.Sale.create({ totalAmount: 0 }, {transaction});
     const store = await models.Store.findByPk(data.store, {transaction});
     
     const  inventory = await models.Inventory.findAll({where:{StoreId:store.id}});
     
     console.log(inventory);
    

      for (const dataProduct of data.products) {

      

      const product = await models.Product.findByPk(dataProduct.id, {transaction} );
      
      
      

        await models.SaleItems.create({
        SaleId: newSale.id,
        ProductId: product.id,
        quantity: dataProduct.qty,
        price: product.price,
      },{transaction});

      totalSale += product.price * dataProduct.qty;

       const InventoryItem = inventory.find(item=> item.ProductId === dataProduct.id )
        console.log(InventoryItem.ProductId);
        console.log(InventoryItem.quantity); 
     
        const newAmount =  InventoryItem.quantity - dataProduct.qty;
         
         if(newAmount<0){
          throw boom.badRequest('Stock is empty');

         } else {
          InventoryItem.update({quantity:newAmount},{transaction});
         }
        
      

    }
    
    await newSale.update({seller:data.seller} ,{transaction} );
    await newSale.update({typeofsale:data.saletype} , {transaction} );
    await newSale.update({ totalAmount: totalSale } ,{transaction}  );
    await newSale.update({StoreId:store.id}, {transaction} );
      
    
    await transaction.commit();

    
    return newSale;  

     }  catch(error){
      await transaction.rollback();
      throw error; 
      
     } 


  }

  async findOne(id) {
    const sale = await models.Sale.findByPk(id,{include:{model:Product, through:{attributes:["quantity"]} }});
    return sale;
  }

  async find(limit, page, store ) {


    
    

    const  offset = (page - 1)  * limit

    const filter = {};


   if (store) {
      filter.StoreId = store;
     }
     
     console.log(filter);

    const sale = await models.Sale.findAll({ where:filter, 
      include:  [{
        model: Product,
        through: {
          attributes: ["quantity"],
        },

        attributes: ["id", "name"], // Select product attributes to display
      }, {model:  Store } ], order: [['create_at', 'DESC']], limit:limit , offset:offset, 
    });
    
   
    const  countSales = await models.Sale.count({});
    console.log(countSales + 'es aqui'); 
    const pages =  Math.ceil(countSales/limit);

    return {...sale,...{pages:pages}};
  }


  async findCsv(limit, startDate , endDate){ 
    
     
     

     const csvFilter = {};
     
     if (startDate && endDate) {

      const startDateUTC = moment.tz(startDate, 'America/Mexico_City').startOf('day').utc().format();
      const endDateUTC = moment.tz(endDate, 'America/Mexico_City').endOf('day').utc().format();


       csvFilter.createdAt = {
        [Op.between]: [ startDateUTC,endDateUTC]
      };
    
    }





    const sale = await models.Sale.findAll({ where: csvFilter,   
      include:  [{
        model: Product,
        through: {
          attributes: ["quantity"],
        },

        attributes: ["id", "name"], // Select product attributes to display
      }, {model:  Store } ], order: [['create_at', 'DESC']] , limit:limit  
    });
          return sale

  }


   ///////////////////////////////////////////Delete Sale////////////////////////////////////////////////
  async delete(id){
     
         const sale = await this.findOne(id);
         
         const  inventory = await models.Inventory.findAll({where:{StoreId:  sale.StoreId}});

               ////////////////////////////////// Upddate Stock//////////////////////////////////
           for(const saleProduct  of  sale.Products){

            
            console.log(saleProduct.SaleItems.quantity);

            
            const InventoryItem = inventory.find(item => item.ProductId === saleProduct.id);

            const newAmount =  InventoryItem.quantity + saleProduct.SaleItems.quantity;
           
            InventoryItem.update({quantity:newAmount});

            
       
          }
     
         
      
         
           sale.destroy();
       
           return sale;
         

  } 
  
}


module.exports = SalesService;