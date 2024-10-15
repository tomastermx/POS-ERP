const { models } = require("../lib/sequelize");

 module.exports  =  function(passport){ 

    
  
  passport.serializeUser((user, done) => {
  
     done(null, user.id);

    
  });

  // Deserialización: busca al usuario por ID cuando sea necesario
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await models.User.findByPk(id, {
        attributes: ['id', 'email', 'role'] });
      

      if (!user) {
        return done(new Error('Usuario no encontrado'));
      }
        done(null, user); 
     } catch (err) {
     done(err);
    }
  });

  
 }
