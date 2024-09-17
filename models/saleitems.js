const { Model, Sequelize, DataTypes } = require("sequelize");

const SALEITEMS_TABLE = "saleitems";
const {PRODUCTS_TABLE}  = require('./product');

const SaleItemsSchema = {
      
    

    quantity:{
        allowNull: false,
        type: DataTypes.FLOAT

    }

    
};

class SaleItems extends Model {

    static associate(){}

    static config(sequelize) {
        return {
          sequelize,
          tableName:  SALEITEMS_TABLE,
          modelName: 'SaleItems',
          timestamps: false
        }
         
      }
    

    
}

module.exports = { SALEITEMS_TABLE, SaleItemsSchema, SaleItems };
