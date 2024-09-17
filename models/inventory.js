const { Model, Sequelize, DataTypes } = require("sequelize");


const INVENTORY_TABLE = "inventory";



const InventorySchema = {



  
    quantity:{
        allowNull: false,
        type: DataTypes.FLOAT

    }
    
 } 

 
 class Inventory extends  Model {
                 
    static associate(models){

    }
      
    static config(sequelize){
           return {
            sequelize,
            tableName: INVENTORY_TABLE,
            modelName: 'Inventory',
            timestamps: false,

           }
 

    }
    
 } 





module.exports = {INVENTORY_TABLE ,Inventory, InventorySchema}

