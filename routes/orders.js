const express = require('express');
const path = require('path');
const fs = require('fs');
const { Parser } = require('json2csv');

const router = express.Router();

const OrderService = require('../controllers/orders');

const ProductService = require('../controllers/products');

const order = new OrderService();

const products = new ProductService();
    

   
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
      
       ///////////////////////////////*----------Get---CSV----  *////////////////////////
 
       
        router.get('/get-csv', async(req,res,next)=>{    
         
         let limit = parseInt(req.query.limit) || 50 ;

         console.log(limit);
       
         const Orders =  await order.csvOrders(); 
          
         const allproducts  = await  products.find() 
        
         let listArrayproducts =  allproducts.map((item)=>{
              return item.name;
          });
   
      
          const fields = [
            {label:'Id', value: 'id'},
            {label:'Date', value: 'Date'},
            {label: 'Store', value: 'Store'},
            ...listArrayproducts.map(product=>({
              label:product, value: row => row[product] || 0
            }))
          ]
         

           let  data = Orders.map( orders => {
            
         
                const orderQuantities = {}

               listArrayproducts.forEach(product=>{
                   
               orderQuantities[product] = 0;
                 
            })
            
        

              orders.Products.forEach(products => {
                    
               if(listArrayproducts.includes(products.name)){

                  orderQuantities[products.name] = products.OrderItems.quantity
               }


             }) 
            
        
             return { id: orders.id, Date: orders.createdAt, Store: orders.Store.name, 
              ...orderQuantities
             }

           });

          

     
                   //////Create Csv/////////////////////////////////////////////
                  const opts = { fields };
                  const parserCsv = new Parser(opts);
                  const csv =  await parserCsv.parse(data);        
                  
                 ///////Assign location and name///////////////////////////////////////
                 const filePath = path.join(__dirname,'../' ,'data.csv');

                 fs.writeFileSync(filePath , csv);
                 ///////Send File/////////////////////////////////////////////////////

                 res.download(filePath, 'data.csv', (err) => {
                  if (err) {
                    console.error('Error al descargar el archivo:', err);
                    res.status(500).send('Error al descargar el archivo.');
                  }
              
                  // Delete file
                  fs.unlinkSync(filePath);   
                  
                });
                    
                

       });
      
       /*---- ----------*/


        //////////////////////Create Order/////////////////////////////77
       router.post('/new', async(req,res,next)=>{
       
         const data = req.body;
         console.log(data);
     
         const Order = await order.create(data);
      
        res.json(Order);      
      });

      








module.exports = router;
