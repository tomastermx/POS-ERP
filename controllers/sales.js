const { models } = require("../lib/sequelize");
const { Product } = require("../models/product");
const { Store } = require('../models/store');
const { SaleItems } = require("../models/saleitems");
const boom = require('@hapi/boom');

class SalesService {
  constructor() {}

  async create(data) {
    console.log(data);
    console.log(data.store);
    console.log(data.seller);
    console.log(data.saletype);

      let totalSale = 0;
  
     const newSale = await models.Sale.create({ totalAmount: 0 });
     const store = await models.Store.findByPk(data.store);
     
     const  inventory = await models.Inventory.findAll({where:{StoreId:store.id}});
     
     console.log(inventory);
    

      for (const dataProduct of data.products) {

      

      const product = await models.Product.findByPk(dataProduct.id);
      
      
      

        await models.SaleItems.create({
        SaleId: newSale.id,
        ProductId: product.id,
        quantity: dataProduct.qty,
        price: product.price,
      });

      totalSale += product.price * dataProduct.qty;

       const InventoryItem = inventory.find(item=> item.ProductId === dataProduct.id )
        console.log(InventoryItem.ProductId);
        console.log(InventoryItem.quantity); 
     
        const newAmount =  InventoryItem.quantity - dataProduct.qty;
         
         if(newAmount<0){
          throw boom.badRequest('Stock is empty');;
         } else {
          InventoryItem.update({quantity:newAmount});
         }
        
      

    }
    
    newSale.update({seller:data.seller});
    newSale.update({typeofsale:data.saletype});
    newSale.update({ totalAmount: totalSale });
    newSale.update({StoreId:store.id});
      
    
    
    
    return newSale;   
     
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


  async findCsv(limit){ 
    const sale = await models.Sale.findAll({ 
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


  async delete(id){
     
         const sale = await this.findOne(id);
         
         const  inventory = await models.Inventory.findAll({where:{StoreId:  sale.StoreId}});

         for(const item  of  sale.Products){
            console.log(item.name);
         }
     
         
        // await sale.destroy();  
          
         

        
         
        //sale.destroy();
       
       return sale;
         

  } 
  
}


module.exports = SalesService;