  $(function(){

  
     //////////////////Get Products data//////////////

     $.getJSON('/products/',(data)=>{
             
        $.each(data, (i, value) => {
        const row ='<th id="' + value.id + '" scope="col">' + value.name + " " + "lts." + "</th>";
             
        $("tr").append(row);

        });
        

     });



     ///////////Store Data ////////////////////////

    let pathArray = window.location.pathname.split('/');
    let  param1 = pathArray[2];
     console.log(param1);

        $.getJSON('/stores/' + param1 ,(data)=>{
                
    
           $("#storename").append('<h1>'+ data.name + '</h1>')
    
           console.log(data);

           const table = document.getElementById("maintable");
           const head = table.getElementsByTagName("th");
           const Row = document.createElement("tr");
        

               const productMap = {};
         

             for(let j = 0; j < data.Products.length ; j++ ){
                  const product = data.Products[j];
                  
                  productMap[product.id] = product.Inventory.quantity || 0; 
                  
              } 

              for (let k = 0; k < head.length ; k++) {
                  
                  const header = head[k];

                  const rowData = document.createElement("td");
                  rowData.innerHTML = productMap[header.id] !== undefined ? productMap[header.id] : "0";
                  Row.appendChild(rowData);
              }

              $("#maintable").append(Row);                
      


     }); 

});