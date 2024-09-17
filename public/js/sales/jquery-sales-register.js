$(function () {
  console.log("funcionando");

  let sale;

  /// Get all stores ///////////////////////////////////

  $.getJSON("/stores", (data) => {
    console.log(data);
    $.each(data, (i, value) => {
      const option =
        '<option value="' + value.id + '">' + value.name + "</option>";

      $("#selection").prepend(option);
    });
  });

  ///// get all products ///////////////////////////////

  $.getJSON("/products", (data) => {
    console.log(data);

    $.each(data, (i, value) => {
      const betaRow = document.createElement("div");

      betaRow.classList.add("row", "gy-2", "align-items-center");

      const newLabel = document.createElement("div");
      newLabel.classList.add("col", "gy-4");
      newLabel.innerHTML =
        '<label for="inputEmail3" class="col-sm-8 col-form-label for">' +
        value.name +
        "</label>";

      const newInput = document.createElement("div");
      newInput.classList.add("col", "gy-4");
      newInput.innerHTML =
        '<input id="' +
        value.id +
        '" type="text" class="form-control" placeholder="0" >';

      betaRow.append(newLabel);
      betaRow.append(newInput);

      $("#maincol").prepend(betaRow);
    });
  });

  ///////////////////////////////////////////////////////////

  ////////////// Create  new Sale////////////////////////////
  $("#myform").on("submit", (event) => {
    event.preventDefault();
    
    $('.progress-bar').css("width", "60%"); 

    const store = $("#selection").val();
    const type = $("#saletype").val();

    const form = document.getElementById("myform");
    const inputs = form.getElementsByTagName("input");
    const products = [];

    let invalid = 0;
    let nostore = 0;
    ///////////////////////////////////Testing Input Entries///////////
    
    for (let i = 0; i < inputs.length; i++) {
      if (isNaN(parseFloat(inputs[i].value)) && inputs[i].value !== "") {
        $("#" + inputs[i].id).addClass("error");

        invalid++;
        console.log(invalid);
      } 
      else if (inputs[i].value && parseFloat(inputs[i].value) > 0) {
        $("#" + inputs[i].id).removeClass("error");

        const item = { id: inputs[i].id, qty: parseFloat(inputs[i].value) };
        products.push(item);
      }
    }
             
     if (invalid > 0) {
      alert("Datos Inválidos");
    } 
     
    ////////////////// Store ////////////////////////////////////////
    
    if (!store) {
      
        alert("Se debe seleccionar una tienda");
        $("#selection").addClass("error");
       } else {  
        $("#selection").removeClass("error");    
       }

     if(!type){
      alert('Seleccione el tipo de venta')
      $("#saletype").addClass("error");
     } else {  
      $("#saletype").removeClass("error"); } 
 

    if (products.length === 0) {
      $('.progress-bar').css("width", "10%"); 
      alert("Venta vacía");
    
    } else if (products.lenght !== 0 && store && type ) {

      sale = { store: store, saletype:type , products };
      console.log(sale);
     
     //// Add data to Modal //////////////////////////////////////////////////// 
         $("#modal-body-content").empty();    
         
         console.log($('select .form-select  option:selected ').text());        


         const labels = form.getElementsByTagName("label");
         const newColumn = document.createElement("div");
         const inputs = form.getElementsByTagName("input");

         newColumn.classList.add("col", "gy-4"); 
        
        const titleRow = document.createElement("div");
        titleRow.classList.add("row", "text-center" );
        titleRow.innerHTML='<p> Tipo de venta ' + sale.saletype + '</p>';
        
        newColumn.append(titleRow);

         for(let i= 0; i< inputs.length; i++){
             
            

            if( inputs[i].value && inputs[i].value!=='0'){ 
                
              
              
              const itemRow = document.createElement("div");
              itemRow.classList.add("row", "gy-2","text-center" ,"align-items-center");

               itemRow.innerHTML= "<p>" + labels[i].textContent + " " + "cantidad:"  + inputs[i].value + " " + "lts </p>" 

            
               newColumn.append(itemRow);
              

                }  

         }
      


          $("#modal-body-content").append(newColumn);

      $("#saleModal").modal("show");
    }
  });

  //////////////////////////////////////////////////////////////////////////

  ////////////////////////////Confirm new Sale//////////////////////////////

  $("#confirmSaleBtn").on("click", () => {

    $('.progress-bar').css("width", "99%"); 

     $.post("/sales/new", sale)
      .done(()=>{  window.location.replace("/sales/page")})
      .fail((jqXHR, textStatus, errorThrown)=>{
        
        $("#saleModal").modal("hide"); 
        //////Erase elements modal////////////////
        $("#saleModal-header").empty()
        $("#modal-body-content").empty();
        $("#salemodal-footer").empty();     
        /////////////////////Add elements////////////////////////
        $("#saleModal-header").append('<h5>Error en Operación de compra</5>')
        $("#modal-body-content").append( '<p>Inventario Insuficiente</p>');
        $('#salemodal-footer').append('<button type="button" class="btn btn-success" data-bs-dismiss="modal">Aceptar</button>')  
        $("#saleModal").modal("show"); 
        
        
      }); 

  
  });

  ///////////////////////////////////////////////////////////////////////////////7
});
