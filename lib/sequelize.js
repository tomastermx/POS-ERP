const { Sequelize } = require('sequelize');

const setupModels = require('../models/index');
    
    require('dotenv').config();
    
     //process.env.SEQUELIZE_USER,


     const sequelize = new Sequelize( process.env.SEQUELIZE_DB, process.env.SEQUELIZE_USER , process.env.SEQUELIZE_PASSWORD , {
     host:  process.env.SEQUELIZE_HOST,
     port:  3306,
     dialect: 'mysql',
    
    });

    async function authenticateDatabase() {
      try {
        await sequelize.authenticate();
        console.log('++++++++++++++++++++Connected to database ++++++++++++++++++++++++++ ');
      } catch (err) {
        console.error('Database connection failed:', err);
      }
    }
    


    authenticateDatabase();

    
   
    setupModels(sequelize);

     
 
    sequelize.sync({ alter:true });

    ///alter: true   
    ///force:true    

    module.exports = {
      sequelize, // Exportar sequelize aquí
      models: sequelize.models // Exportar los modelos
    };