const { Model, Sequelize, DataTypes } = require("sequelize");

const USER_TABLE = "users";

const ShortUniqueId = require('short-unique-id');

const uid = new ShortUniqueId({ length: 10 }); 

  const userSchema = {

    id: {
        type: DataTypes.STRING,
        defaultValue: () => uid.rnd(),
        allowNull: false,
        primaryKey: true,
    
      },
       
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "email",
      },

      
       
       password:{
        allowNull: false,
        type: DataTypes.STRING,
        field: "password",

       },


       firstname:{
        allowNull:true,
        type: DataTypes.STRING,
        field: "firstname" 
       },



         lastname:{
         allowNull:true,
         type: DataTypes.STRING,
         field: "lastname" 
        },

       

        role:{
        allowNull: false,
        type: DataTypes.STRING,
        field: "role", 
       },
        

         StoreId: {
        type: DataTypes.STRING,
        allowNull: true
      },

 }

      class User extends Model {
         
      static associate(models){
        this.belongsTo(models.Store , { onDelete:'SET NULL', onUpdate:'CASCADE',  foreignKey:'StoreId', allowNull:true})

      }
      
      static config(sequelize) {
        return {
          sequelize,
          tableName: USER_TABLE,
          modelName: "User",
          timestamps: false,
            }
         
      }
   

     } 



 module.exports = { USER_TABLE, userSchema, User };