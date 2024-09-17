const { Model, Sequelize, DataTypes } = require("sequelize");

const { SALES_TABLE } = require("./sales");
const { STORE_TABLE } = require("./store");

const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 15 }); 

const PRODUCTS_TABLE = "product";

productSchema = {
  id: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: () => uid.rnd(),
    primaryKey: true,
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "name",
  },

  description:{
    allowNull:false,
    type: DataTypes.STRING,
    field: "description"
  },

  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
    field: "price",
  },
};

class Product extends Model {
  static associate(models){
    this.belongsToMany(models.Sale,{through:'SaleItems'},{ onDelete: 'NULL',  onUpdate: 'CASCADE' },{ foreignKey: { allowNull: true } });
    this.belongsToMany(models.Store,{through:'Inventory'},{foreignKey:'ProductId'} );
    this.belongsToMany(models.Order,{through:'OrderItems'});
    }
    
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = { PRODUCTS_TABLE, productSchema, Product };
