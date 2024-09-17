


const boom = require('@hapi/boom');

    function   checkAuth(req,res,next){
      if(req.isAuthenticated()){
         next()
      }
    }