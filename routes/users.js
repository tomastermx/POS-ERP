

const express = require("express");
const router = express.Router();
const path = require('path');
const passport = require('passport');

const userService = require('../controllers/users');

const {checkAuthWeb, checkApi,checkAdminWeb} = require('../middleware/auth');

const user = new userService();

///////////////////////////////////Dashboard////////////////////////////////////

router.get('/dashboard',checkAuthWeb ,  (req,res,next)=>{
  
    res.sendFile(path.join(__dirname, '../public/html/users/', 'user-main.html'));
});


/////////////////////Create all Users ///////////////////////////////////////////////////

       router.get('/add',checkAuthWeb,checkAdminWeb,(req,res,next)=>{
           
        res.sendFile(path.join(__dirname, '../public/html/users/', 'register.html'));

     });
 
 /////////////////////// Get User Data //////////////////////////////////////////////
  
   router.get('/user-data', checkApi, (req,res,next)=>{
              
          const user =  req.session.user;
        
          
          res.json(user);
     
   });



 /////////////////////////////////All Users ///////////////////////////////////////////
           router.get('/index',(req,res,next)=>{
  
            res.sendFile(path.join(__dirname, '../public/html/users/', 'users.html'));
            });

    


   //////////////////Login in the App//////////////////////////////////

     router.post('/login', passport.authenticate('local',{ failureRedirect: '/d' }),(req,res,next)=>{


          console.log('authentication-success');
          
              const { firstname , email , role, StoreId } = req.user;
                      
              req.session.user = {firstname,email, role }

              if(StoreId){
                req.session.user.storeid = StoreId;
              }


              console.log(req.session);
           
           res.json({ success: true });
            
                  
        

       });


   ////////////////////////////LogOut/////////////////////////////////////////////////////////
   
      router.get('/logout',(req,res,next)=>{
         
         req.session.destroy(()=>{console.log('session destroyed')});
         res.redirect("/");
         console.log('session-closed');
         console.log(req.session); 
      });
    
   ////////////////////////////Unauthorized User Page////////////////////////

      router.get('/user-unauthorized',(req,res,next)=>{ 
          
         res.sendFile(path.join(__dirname, '../public/html/users/', 'unauthorized.html'));

      });



    ////////////// Create new User/////////////////////////////////

     router.post('/new' , checkAuthWeb, async(req,res,next)=>{ 
        
         const data = req.body
          
         console.log(data);
           
         const newUser =  await user.create(data);
         res.json(newUser) 
      });

////////////////Find all users //////////////////////////////////////////////////////////

 router.get('/', async(req,res,next)=>{
 
      const  allUsers = await user.find();

      res.status(200).json(allUsers);
  
  });


  ////////////////////////////////////////// Find User  /////////////////////////////////
   
   router.get('/:id', async(req,res,next)=>{
      console.log(req.params);
   });


   ///////////////////Modify User Data////////////////////////////////////////////////////
   
     router.post('/update', async(req,res,next)=>{
                
        const {id, updates} = req.body;

        const updateUser = await user.update(id, updates);
        
        res.status(200).json(updateUser);

     });




module.exports = router;

