
const express = require("express");

const router = express.Router();
const path = require('path');

const StoreService = require('../controllers/stores');


const store = new StoreService();



     router.get('/index',(req,res,next)=>{
      res.sendFile(path.join(__dirname, '../public/html/stores/', 'store.html'));
      
     }); 

      router.get('/:id/profile',(req,res,next)=>{
                  
             res.sendFile(path.join(__dirname, '../public/html/stores/', 'profile.html'));
  
      });
     

        router.get('/add',(req,res,next)=>{
              
       res.sendFile(path.join(__dirname, '../public/html/stores/', 'register-store.html'));
        });

      
       router.get('/:id', async (req, res, next) => {
    
          const id  = req.params.id;
          
  
         const  Onestore = await store.findOne(id);
  
          res.json(Onestore);
       });
  

      
      router.get('/',  async(req,res,next)=>{
          
        const stores = await store.Allstores();    

       res.json(stores);

      
     });
   
   router.get('/test', async(req,res,next)=>{
      const stores = await store.test();
      res.json(stores);
   })
 




    router.post('/new', async (req, res, next) => {

      let data = req.body;
      console.log(data);

      const newStore = await store.create(data);
      res.json(newStore);
  });




    router.put('/update', async(req,res,next)=>{
      
       const {id, updates} = req.body;
         
       

       const updatestore =  await store.update(id, updates);
       
       res.json(updatestore);
    
    });

    

    
    router.delete('/id:',async(req,res,next)=>{
    
    });
    












module.exports = router;





