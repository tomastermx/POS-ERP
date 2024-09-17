const { Model, Sequelize, DataTypes } = require("sequelize");

const ShortUniqueId = require('short-unique-id');

const { PRODUCTS_TABLE } = require("./product");
const { SALES_TABLE } = require("./sales");

const STORE_TABLE = "store";


const uid = new ShortUniqueId({ length: 10 }); 
 
 

const StoreSchema = {
  id: {
    type: DataTypes.STRING,
     defaultValue: () => uid.rnd(),
    allowNull: false,
    primaryKey: true,

  },

  name: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "name",
  },

  street:{
    allowNull:false,
    type: DataTypes.STRING,
    field:"street"
  }



  
};

class Store extends Model {

  static associate(models) {
    this.belongsToMany(models.Product, { through: 'Inventory'}, {foreignKey:'StoreId'});
    this.hasMany(models.Sale ,{ onDelete: 'NULL',  onUpdate: 'CASCADE' });
    this.hasMany(models.Order,{onDelete:null,onUpdate:'CASCADE'});
  
  }
   


  static config(sequelize) {
    return {
      sequelize,
      tableName: STORE_TABLE,
      modelName: 'Store',
      timestamps: false,
    };
  }
}

module.exports = { STORE_TABLE, StoreSchema, Store };
