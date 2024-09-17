const { Model, Sequelize, DataTypes } = require("sequelize");


const ORDERS_TABLE = "orders";


ordersSchema = {
     
     id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
       },
    
      createdAt: {
         allowNull: false,
         type: DataTypes.DATE,
         field: "create_at",
         defaultValue: Sequelize.NOW,
      }



    
 
    }

       class Order extends Model {
        static associate(models){
            this.belongsToMany(models.Product,{through:'OrderItems'});
            this.belongsTo(models.Store); 
        }

        static config(sequelize){
            return{
                sequelize,
                tableName: ORDERS_TABLE,
                modelName: 'Order',
                timestamps: false

            }

        }

    }


module.exports = { ORDERS_TABLE, ordersSchema, Order  };