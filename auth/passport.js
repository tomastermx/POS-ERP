const { models } = require("../lib/sequelize");




module.exports = function(passport) {
  
  // Serialización: guarda solo el ID del usuario en la sesión
  passport.serializeUser((user, done) => {
    done(null, user.id); // Puedes agregar más campos si es necesario
  });

  // Deserialización: busca al usuario por ID cuando sea necesario
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await models.User.findByPk(id, {
        attributes: ['id', 'email', 'role'] });

      if (!user) {
        return done(new Error('Usuario no encontrado'));
      }
      done(null, user); // `user` ahora estará disponible en `req.user`
    } catch (err) {
      done(err);
    }
  });

};
