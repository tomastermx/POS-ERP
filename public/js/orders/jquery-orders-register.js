
 $(function(){
        let order;    
  //////////////////// Get All Products//////////////////////////////////

     $.getJSON('/products',(data)=>{

        $.each(data, (i, value) => {

         const itemRow = document.createElement("div");

         itemRow.classList.add("row", "gy-2", "align-items-center");

         const newLabel =  document.createElement("div");
         newLabel.classList.add("col", "gy-4");
         
         newLabel.innerHTML =  '<label for="product" class="col-sm-8 col-form-label for">' +
         value.name +
         "</label>";

         const newInput = document.createElement('div');
         newInput.classList.add("col", "gy-4");
         newInput.innerHTML =
          '<input id="' +
          value.id +
          '" type="text" class="form-control" placeholder="0" >';
         
         itemRow.append(newLabel);
         itemRow.append(newInput);
         
         $("#maincol").prepend(itemRow);

        });

     }); 

    //////////////////////Get All Stores////////////////////////////////


    $.getJSON("/stores", (data) => {
      console.log(data);
      $.each(data, (i, value) => {
        const option =
          '<option value="' + value.id + '">' + value.name + "</option>";
  
        $("#selectionstore").prepend(option);
      });
    });




         //////////////////////////////////////////////////////////////////// 
         ///////////////////////////////////// Create new order//////////////
         
         $("#orderform").on("submit",(event)=>{
          $('.progress-bar').css("width", "60%"); 
          event.preventDefault(); 
    
          const store  = $("#selectionstore").val();
          

          const form = document.getElementById("orderform");
          const inputs = form.getElementsByTagName('input');
          const products = [];

      ////////Test inputs////////////////////// 
          
          for (let i = 0; i < inputs.length; i++) {
               if (isNaN(parseFloat(inputs[i].value)) && inputs[i].value !== "") {
                $("#" + inputs[i].id).addClass("error");
               } 

               else if (inputs[i].value && parseFloat(inputs[i].value) >= 0) {
                $("#" + inputs[i].id).removeClass("error"); 
                   if( parseFloat(inputs[i].value)>0){ 
                    const item = { id: inputs[i].id, qty: parseFloat(inputs[i].value) };
                    products.push(item);
                  }  
                    
               }            
               
          }
            
            if( products.length ===  0 ){
              alert('Venta Vacía');
            }

          ////////////////////////////////////////Test Store Value/////////////////////7  
             if(!store){
               alert('Falta seleccionar a que tienda va');
               $("#selectionstore").addClass("error");
             } else {
              $("#selectionstore").removeClass("error");
             } 


             if( store && products.length > 0 ){

             order = { store: store , products };

         ///////Add data to the modal/////////////////////    
            
         $("#ordermodal-body").empty();    
         
         const labels = form.getElementsByTagName("label");
         const newColumn = document.createElement("div");
         const inputs = form.getElementsByTagName("input");
        
         newColumn.classList.add("col", "gy-4"); 
         
         newColumn.innerHTML ="<h1>Funciona</h1>";

          for(let i= 0; i< inputs.length; i++ ){
            
             if( inputs[i].value && inputs[i].value!=='0'){

              const itemRow = document.createElement("div");
              itemRow.classList.add("row", "gy-2","text-center" ,"align-items-center");

               itemRow.innerHTML= "<p>" + labels[i].textContent + " " + "cantidad:"  + inputs[i].value + " " + "lts </p>";

               newColumn.append(itemRow);
              

            } 

          }

         $("#ordermodal-body").append(newColumn);


             $("#OrderModal").modal('show'); 
              
            }

           
           
       

         });
        
         //////////////////////////////Send Data to Server//////////////////77

         $("#confirmBtn").on('click',()=>{
            console.log(order);
            console.log('mandar a servidor');
        
           $.post("/orders/new", order, (data) =>{
              console.log(data);
              window.location.replace("/orders/page");
           });

         });

 });