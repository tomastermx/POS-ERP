$(function () {

  $('.progress-bar').css("width", "10%"); 

   //////////////////Show spinner first////////////////////////////////////

    let spinning = '<div id="spinner" class="d-flex justify-content-center"><div class="spinner-border" style="width: 7rem; height: 7rem;"  role="status"><span class="visually-hidden">Loading...</span></div> </div>'
    $('#maincontent').append('<h2>LOADING</h2>');
    $('#maincontent').append(spinning);
    
    $('#maintable').hide();

  ////Get all stores////////////////////////////////////////////////////////

  $.getJSON("/stores", (data) => {
    $.each(data, (i, value) => {
      let option = "<option value=" + value.id + ">" + value.name + "</option>";

      $("#select").append(option);
    });
  });

  /// Get all products///////////////////////////////////////////////////////////////////////////////

  $.getJSON("/products", (data) => {
    
     // Seleccionamos el encabezado de la tabla (thead > tr)
  const headerRow = $("#maintable thead tr");

  // Recorrer los productos y construir las columnas dinámicamente
  $.each(data, (i, value) => {
    const row =
      '<th id="' + value.id + '" scope="col">' + value.name + " lts." + "</th>";
    
    // Añadir la columna al encabezado
    headerRow.append(row);
  });

  // Añadir columna "Monto Total"
  const totalRow = '<th scope="col">Monto Total</th>';
  const actionRow = '<th scope="col">Acción</th>';

  headerRow.append(totalRow);
  headerRow.append(actionRow);

  ////////////////////////////////////////////////////////
  });

  $("#spinner").remove();
  $("h2").remove();
  $('#maintable').show();

  //////// Get all Sales /////////////////////////////////////////777
  
   let urlParams = new URLSearchParams(window.location.search);
  
   const page = urlParams.get('page') || 1;

   
   function pourTable(){
    ///////////////////Empieza funcion ///////////

  $.getJSON('/sales/'+ "?limit=" + 2 + "&page=" +  page  , (data) => {
    
    const table = document.getElementById("maintable");
    const head = table.getElementsByTagName("th");

    
              

      
          ///////////////Pagination//////////////////////////////
             
          const lastpage = parseInt(page) - 1 > 1 ? parseInt(page) - 1 : 1;

          const nextpage = parseInt(page)  + 1 <= data.pages ? parseInt(page) + 1 : page; 

            
             $("ul.pagination").append('<li class="page-item"><a class="page-link" href="/sales/index?page=' +  lastpage   +'" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>');


          for(let i = 1 ; i<= data.pages; i++ ){


            let activeClass = (i == page) ? " active" : ''; // Nota el espacio antes de 'active'

            $("ul.pagination").append('<li class="page-item' + activeClass + '"><a class="page-link" href="/sales/index?page=' + i + '">' + i + '</a></li>');    

          }
     
          $("ul.pagination").append('<li class="page-item"><a class="page-link" href="/sales/index?page=' +  nextpage   +'" aria-label="Previous"><span aria-hidden="true">&raquo;</span></a></li>');
    /////////////////////////////////////////////Populate///////////Sales/////////////////////////////7
               
          
    function pad(number) {
      return number < 10 ? '0' + number : number.toString();
    }  

    $('.progress-bar').css("width", "100%"); 
    
    $.each(data, (i, value) => {
      console.log(value);
      const newRow = document.createElement("tr");

      let date = new Date(value.createdAt);
     
      newRow.innerHTML =
        "<td>" +
       pad(date.getDate()) +
        "-" +
       pad (date.getMonth()) +
        "-" +
        date.getFullYear() +
        "-" +
        pad(date.getHours()) +
        ":" +
        pad(date.getMinutes()) +
        "</td><td>" +
        value.Store.name +
        "</td><td>" + value.typeofsale + "</td>";

      const productMap = {};
      for (let j = 0; j < value.Products.length; j++) {
        const product = value.Products[j];
        productMap[product.id] = product.SaleItems.quantity || 0;
      }
        
      console.log(productMap);

      for (let k = 3; k < head.length - 2; k++) {
        const header = head[k];
        const rowData = document.createElement("td");
        rowData.innerHTML =
          productMap[header.id] !== undefined ? productMap[header.id] : "0";
        newRow.appendChild(rowData);
      }
       
    
        
              // Añadir la celda de "totalAmount"
      const totalAmountCell = document.createElement("td");
       totalAmountCell.innerHTML = value.totalAmount;
       newRow.innerHTML +='<td>' + value.totalAmount + '</td><td> <button type="button" id="'+ value.id +' " class="btn btn-outline-danger"> Cancelar </button> </td>';

        

    
 
      $("#maintable tbody").append(newRow);
 
     

          
    
    });
    
    
   
  
  });

    }   
    ///////////////////The end of pourtable function//////////////////7
   
    pourTable();

  ///////////////// Csv Modal ///////////////////////////////////////////7
   
     $("#csv").on('click',()=>{
         
      $("#csvModal").modal("show");

     });


   //////////////////////////////////CSV////////////////////////////////////

   $("#csvBtn").on('click',()=>{
     
    let  limit = $("#limit").val();




    window.location.href = '/sales/get-csv?limit=' + limit;
       

   })
     

   /////////////////////////////////////Filter Data////////////////////////////////////////

       $("#filterBtn").on('click',()=>{
              
          $("tbody").empty();
              
      });
           


});
