const { models } = require("../lib/sequelize");

const { Product } = require("../models/product");

const { Store } = require('../models/store');

const boom = require('@hapi/boom');

class OrderService{
   
      constructor(){}
      
        async create(data){
          
        
      
          
          const newOrder = await models.Order.create();
         // const store = await models.Store.findByPk(data.store);
          const  inventory = await models.Inventory.findAll({where:{StoreId:data.store}});

           

           for( const dataProduct of  data.products){

            const product = await models.Product.findByPk(dataProduct.id);
             
              console.log(product);
            
             await models.OrderItems.create({
               OrderId: newOrder.id,
               ProductId: product.id,
               quantity: dataProduct.qty 
             });

             const InventoryItem = inventory.find(item=> item.ProductId === dataProduct.id);

             const newInvAmount =  InventoryItem.quantity + dataProduct.qty;
               
             InventoryItem.update({quantity:newInvAmount});

           }

            newOrder.update({StoreId:data.store});

           return newOrder;

     } 

      async find(page,limit){

    
        const  offset = (page - 1)  * limit  
 
           const Orders =   await models.Order.findAll({
           include:[{ model:Product,through:{attributes:["quantity"]}, attributes:["id","name"] }, {model:Store}  ] , order: [['create_at', 'DESC']], limit:limit
           , offset:offset 
        });
        

         const  countSales = await models.Order.count({});
         console.log(countSales);

         const pages =  Math.ceil(countSales/limit);

         console.log(pages);

         return {...Orders,...{pages:pages}}; 
          

     }




     async delete(){

     }
    


} 

module.exports = OrderService;