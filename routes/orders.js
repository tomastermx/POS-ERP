const express = require('express');
const path = require('path');
const router = express.Router();


const OrderService = require('../controllers/orders');
  
const order = new OrderService();

    

   
     router.get('/index',async(req,res,next)=>{
             
     res.sendFile(path.join(__dirname, '../public/html/orders/', 'orders.html'));

      });


     router.get('/add',async(req,res,next)=>{
             
      res.sendFile(path.join(__dirname, '../public/html/orders/', 'register.html'));

      });

      ////////////////////////////////Get All Orders///////////////////////////////////

      router.get('/', async (req,res, next)=>{
         
         let page  = parseInt(req.query.page) || 1;
         let limit = parseInt(req.query.limit) || 10;          
           

        const Orders =  await order.find(page, limit);
        res.json(Orders);
        
     });




        //////////////////////Create Order/////////////////////////////77
       router.post('/new', async(req,res,next)=>{
       
         const data = req.body;
         console.log(data);
     
         const Order = await order.create(data);
      
        res.json(Order);      
   });

      








module.exports = router;
