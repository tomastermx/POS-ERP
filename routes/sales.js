const express = require('express');
const { Parser } = require('json2csv');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const SalesService = require('../controllers/sales');

const sales = new SalesService();


const ProductService = require('../controllers/products');
  
const products = new ProductService();





  router.get('/index', async(req,res)=>{
     res.sendFile(path.join(__dirname, '../public/html/sales/', 'sales.html'));
  });


  router.get('/add' , async(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../public/html/sales/', 'register.html' )); 
  });


  router.get('/one/:id', async(req,res,next)=> {
    
      const id = req.params.id
      const oneSale = await sales.findOne(id);

      res.json(oneSale);
  });

  router.get('/', async(req,res,next)=> {
 
    let page  = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5; 
    
    
    console.log(req.query);
    
    const Allsales = await sales.find(limit,page);
    
    res.json(Allsales);
  });


  ///////////////////////New Sale////////////////////////////////////////

    router.post('/new', async (req,res,next)=>{
    

    const data  = req.body;
   try{    
    const newSale =  await sales.create(data);

   res.json(newSale);
       } catch(error){
        next(error);
      }

  
     });

    
     router.delete('/delete/:id',async(req,res,next)=>{
           
            const id = req.params.id;
      
            const deletedSale = await sales.delete(id);
       
     });
    

////////////////////////////////Export Sales CSV///////////////////////////

   router.get('/get-csv', async (req,res,next)=>{

     let  limit =  parseInt(req.query.limit) || 5;
     
     

    const csvSales =    await sales.findCsv(limit);
   
    
    
    const allproducts  = await  products.find(); 
    
    let arrayProducts =  allproducts.map((item)=>{
         return item.name;
    })

   

  console.log(arrayProducts);
  
    const fields = [
        { label: 'Date', value: 'Date' },
        { label:'Store', value:'Store'},
        { label:'SaleType', value:'Type'},
         ...arrayProducts.map(product =>({
             label:product,
             value: row => row[product] || 0
         })),
        {label:'Total', value:'total'} 
    ];
 
  

   
     const data = csvSales.map(sales =>{

          console.log(sales.totalAmount);
          console.log(sales.id);
            const saleQuantities = {}

            arrayProducts.forEach(product=>{

                saleQuantities[product]=0;
                
            });
                console.log(saleQuantities);

              sales.Products.forEach( products => {
                

                      if(arrayProducts.includes(products.name)){
                        saleQuantities[products.name] = products.SaleItems.quantity;
                        
                      }

               });
              
             return { Date:sales.createdAt,
                     Store: sales.Store.name,
                     Type: sales.typeofsale,
                     ...saleQuantities,
                     total:sales.totalAmount  
               };

     })

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
 

module.exports = router;