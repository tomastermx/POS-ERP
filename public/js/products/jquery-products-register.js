$(function () {
  let productname;
  let description
  let price;


  
  /////////////////////////////Create Product ////////////////////////////////////////////////////

  $("#productform").on("submit", (event) => {
    
    event.preventDefault();
  

    //////////////////////////Evaluate  productname

    if ($("#name").val().length < 2  ||  parseFloat($("#name").val()) ) {
      
      $("#name").addClass("error");
      alert('Error con el nombre')
      
    } else {

      $("#name").removeClass("error");
      
       productname = $("#name").val();
         
    }

    ////////////////////////////////////// Evaluate description//////

    if ($("#description").val().length < 5  || parseFloat($("#description").val()) ) {
      
      $("#description").addClass("error");
       alert('Error con la descripcion');
       
    } else {
        description = $("#description").val();
        console.log(description);

      $("#description").removeClass("error");
    }

   /////////////////Evaluate price

    if (isNaN(parseFloat($("#price").val()))) {
      alert('Error con el precio');
      $("#price").addClass("error");

    } else {
      $("#price").removeClass("error");
       price = $("#price").val();
      
      console.log(price);

    } 

      if(productname && description && price ){
        $("#submitModal").modal("show");        
      }                
        
   
 

  });

  ////////////////////// Send Data to Server ///////////////////////77

  $("#productSubmitBtn").on('click',()=>{
    console.log(productname);
    console.log(price);
    console.log(description);

    let product = {"name": productname, "description":description , "price":price }

    $.post('/products/new',product,(data)=>{
       console.log(data);
       window.location.replace("/products/index");
     });


     
  });


});
