

const express = require("express");
const router = express.Router();
const path = require('path');
const passport = require('passport');

const userService = require('../controllers/users');

const user = new userService();

router.get('/dashboard',(req,res,next)=>{
  
    res.sendFile(path.join(__dirname, '../public/html/users/', 'user-main.html'));
});


 /////////////////////////////////All Users ///////////////////////////////////////////
           router.get('/page',(req,res,next)=>{
  
            res.sendFile(path.join(__dirname, '../public/html/users/', ''));
            });

    


 //////////////////Login in the App//////////////////////////////////

 router.post('/login', passport.authenticate('local', {session:false}),(req,res,next)=>{


          
        console.log(req.user);  
        console.log(req.isAuthenticated());


 })  ;


 ////////////// Create new User/////////////////////////////////

     router.post('/new', async(req,res,next)=>{ 
        
         const data = req.body
         
         const newUser =  await user.create(data);
         res.json(newUser) 
      });

////////////////Find all users //////////////////////////////////////////////////////////

 router.get('/all', async(req,res,next)=>{
 
      const  allUsers = await user.find();

      res.json(allUsers);
  
  });


 ////////////////////////////////////////// Find User  /////////////////////////////////
   
   router.get('/:id', async(req,res,next)=>{
      console.log(req.params);
   });


module.exports = router;

