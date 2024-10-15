
const { models } = require('../lib/sequelize');

const { Product } = require('../models/product');



 class StoreService {
     constructor(){

     }
    
      async create(data){

           const  store  = await models.Store.create(data);
           const products = await   models.Product.findAll();
         
          
            for( const product of products){

               console.log(product.id);

               await models.Inventory.create({
                  StoreId:  store.id,
                  ProductId: product.id,
                  quantity:  0  
                  })

          }
           
           return store;


     }

      async findOne(id){
        const store = await models.Store.findByPk(id, {
          include: {
            model: Product,
            through: {
              attributes: ['quantity'] 
            }
          }
        });
        return store;
     }

        async Allstores(){

        const Allstores = await models.Store.findAll();

        return Allstores;
      
     }

       async update(id,updates){
          console.log(updates)
          const store =   await this.findOne(id);
          const updatestore =  await store.update(updates);
          return updatestore
      }

      async delete(id){
       const dstore = await this.findOne(id);
       dstore.destroy();
       return dstore;
     }

        async test(){
          const stores = await models.Store.findAll({
            include: {
              model: Product,
              through: {
                attributes: ['quantity'] // Solo incluye el campo 'quantity' de la tabla intermedia
              }
            }
          });
    
          return stores;
        }

 }

  module.exports = StoreService;