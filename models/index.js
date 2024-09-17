

  const {Sale,  SalesSchema } = require('../models/sales');
  const {Product, productSchema} = require('../models/product');
  const {SaleItems, SaleItemsSchema} = require('./saleitems');
  const {Store, StoreSchema} = require('../models/store');
  const {User,userSchema} = require('../models/users');  
  const {Inventory,InventorySchema} = require('../models/inventory.js');
  const {Order, ordersSchema} = require('../models/orders');
  const {OrderItems,OrderItemsSchema } = require('../models/orderitems.js');

 function setupModels(sequelize){

    Sale.init(SalesSchema, Sale.config(sequelize));
    Product.init(productSchema, Product.config(sequelize));
    SaleItems.init(SaleItemsSchema, SaleItems.config(sequelize));
    Store.init(StoreSchema, Store.config(sequelize));
    User.init(userSchema, User.config(sequelize));
    Inventory.init(InventorySchema , Inventory.config(sequelize));
    Order.init(ordersSchema, Order.config(sequelize));
    OrderItems.init(OrderItemsSchema, OrderItems.config(sequelize));


   Sale.associate(sequelize.models);
   Product.associate(sequelize.models); 
   Store.associate(sequelize.models);
   SaleItems.associate(sequelize.models);
   User.associate(sequelize.models);
   Inventory.associate(sequelize.models);
   Order.associate(sequelize.models);
   OrderItems.associate(sequelize.models);
 }


module.exports = setupModels;