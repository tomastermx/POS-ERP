
const { Strategy } = require('passport-local');
const bcrypt = require('bcryptjs');
const boom = require('@hapi/boom');

const UserService = require('../controllers/users');

const User = new UserService();


const LocalStrategy = new Strategy({
              usernameField: 'email',
              passwordField: 'password'
    },

      async(email,password,done)=>{
             
        try{
           
            const user  = await  User.findByEmail(email);
            if(!user){
              return   done(boom.unauthorized(),false);
            }
            

            const isMatch = await bcrypt.compare(password, user.password);
             if(!isMatch){
              return done(boom.unauthorized(),false);
             }
              
             return done(null,user);

              }catch(error){
                
             done(error,false);
         }


      }
);






module.exports =LocalStrategy;