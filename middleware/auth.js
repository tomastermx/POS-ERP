


const boom = require('@hapi/boom');

     function  checkAuthWeb(req,res,next){

       if(req.session.user){
         
         console.log('checkAuthWebTrue');
        
          next();

          } else {  res.redirect('/') }

       }


      function checkApi(req,res,next){

       if(req.session.user){
        
           console.log('checkApiTrue');

           next();
          } else {  
             console.log('block');
            next(boom.unauthorized('Sin autorización'));
          
          }
          

          }

          function checkAdminWeb(req,res,next){
                     if(req.session.user.role =='admin'){
                      console.log(req.session.user.role);
                      
                      next();
                     }   else {
                       console.log('permission denied');
                       res.redirect('/chido');
                     }   

         }   
          


           function  checkAdmin(req,res,next){
                 if(req.session.user.role =='admin'){
                      
                 } else {next(boom.unauthorized('permission denied')); }
         } 
     

     module.exports = {checkAuthWeb , checkApi, checkAdminWeb }