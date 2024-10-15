    $(function(){
    
      let urlParams = new URLSearchParams(window.location.search);

      const page = urlParams.get('page') || 1;    
      
      console.log(page);

    //////////// Get Products////////////////////////////////////

    $.getJSON('/products',(data)=>{
                           
         $.each(data, (i, value) => {
           
            const row ='<th id="' + value.id + '" scope="col">' + value.name + " " + "lts." +"</th>";
    
          $("tr").append(row);

        });
         
    });

      // Get Orders //////////////////////7

      $.getJSON('/orders?page=' + page + '&limit=3' , (data)=>{



          const table = document.getElementById("maintable");
          const head = table.getElementsByTagName("th");
                    
           function pad(number) {
            return number < 10 ? '0' + number : number.toString();
           }  
        
         /////Pagination//////////////////////////////////////////////////////////7
         
         

         const lastpage = parseInt(page) - 1 > 1 ? parseInt(page) - 1 : 1;

          const nextpage = parseInt(page)  + 1 <= data.pages ? parseInt(page) + 1 : page; 

            
         $("ul.pagination").append('<li class="page-item"><a class="page-link" href="/orders/index?page=' +  lastpage   +'" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>');




          for(let i = 1 ; i<= data.pages; i++ ){


          let activeClass = (i == page) ? " active" : ''; // Nota el espacio antes de 'active'

          $("ul.pagination ").append('<li class="page-item' + activeClass + '"><a class="page-link" href="/orders/index?page=' + i + '">' + i + '</a></li>');    

        }
   
             
        $("ul.pagination").append('<li class="page-item"><a class="page-link" href="/orders/index?page=' +  nextpage   +'" aria-label="Previous"><span aria-hidden="true">&raquo;</span></a></li>');





              $.each(data,(i,value)=> {

                 let newRow = document.createElement("tr"); 

                 let date = new Date(value.createdAt);

                 newRow.innerHTML = '<td>' + pad(date.getDate()) + "-" + pad(date.getMonth()) + "-" + date.getFullYear() +  "-" + pad(date.getHours()) + ":" + pad(date.getMinutes()) + '</td><td>'+ value.Store.name +  '</td>'
                  

                 const productMap = {};
                 for (let j = 0; j < value.Products.length; j++) {
                   const product = value.Products[j];
                   productMap[product.id] = product.OrderItems.quantity || 0;
                 }
                   
          
                
                 for (let k = 2; k < head.length ; k++) {
    
                  const header = head[k];
                  const rowData = document.createElement("td");
                  rowData.innerHTML =
                  productMap[header.id] !== undefined ? productMap[header.id] : "0";
                  newRow.appendChild(rowData);
                }




                 $("#maintable").append(newRow);
                 
                 ////Progress bar
                 setTimeout(()=>{ $('.progress-bar').css("width", "100%"); }, 900); 
                 setTimeout(()=>{ $('.progress-bar').css("width", "3%"); }, 1800); 

              });


      });

      /////////////////  Get CSV///////////////////////////////////

       $("#csvBtn").on('click',()=>{
         
          $("#csvModal").modal('show');

       });

      /////////////////////////////////Confirm Csv//////////////
               
        $("#csvConfirm").on('click',()=>{
           
          let limit  = $("#csvoption").val();

           console.log(limit);

          window.location.href ='/orders/get-csv'  + '?limit=' + limit

        });
       
       
  });