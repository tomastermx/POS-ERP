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

        lastname:{
         allowNull:true,
         type: DataTypes.STRING,
         field: "lastname" 
        },

       

        role:{
        allowNull: false,
        type: DataTypes.STRING,
        field: "role", 
       }

 }

      class User extends Model {
         
      static associate(models){
        this.belongsTo(models.Store)

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