
const express = require('express');
const path = require('path');
const router = express.Router();
const ProductService = require('../controllers/products');
  
const product = new ProductService();

   router.get('/page', async (req,res,next)=>{
    res.sendFile(path.join(__dirname, '../public/html/products/', 'products.html' ));
   });


  router.get('/add',async(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../public/html/products/', 'register.html' ));
  });


   router.get('/id:',async(req,res,ext)=>{
     const oneProduct = await product.findOne(req.params.id);
     res.json(oneProduct);
   });

   router.get('/', async (req,res,next)=>{
            
          const allProducts = await  product.find();
           res.json(allProducts);
          
   });

 
  
   router.post('/new', async (req,res,next)=>{
     console.log(req.body);
             
       const newProduct = await  product.create(req.body);
       console.log(newProduct);
       res.json(newProduct);
  });


     router.put('/update', async(req,res,next)=>{
        

        const { id , updates } = req.body
        console.log(req.body);

       const updateProduct = await product.update(id, updates);
      
        res.json(updateProduct); 

    });


     router.get('/test', async(req,res,next)=>{
       const products = await  product.test();
       res.json(products);
     });



module.exports = router;