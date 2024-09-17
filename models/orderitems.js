

const { Model, Sequelize, DataTypes } = require("sequelize");

const ORDERITEMS_TABLE = "orderitems";


   const OrderItemsSchema = {
  
              
     quantity:{
          allowNull: false,
          type: DataTypes.FLOAT

         }

     }


    class OrderItems extends Model {
        static associate(){}

         static config(sequelize){

            return {
                sequelize,
                tableName: ORDERITEMS_TABLE,
                modelName: 'OrderItems',
                timestamps: false,
            }

        }

    }
   
    module.exports = {ORDERITEMS_TABLE ,OrderItems, OrderItemsSchema} 