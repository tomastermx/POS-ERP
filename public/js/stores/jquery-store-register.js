
 $(function(){
   
  let storename
  let address
  
  
    $("#storeform").on("submit" , (event)=>{
 ///////////////////////// Handle Data///////////////////////7       
        
        event.preventDefault();

        
 / ///////////////////////Evaluate name///////////////////////     
        if( $("#storename").val().length < 2  || parseInt($("#storename").val()) ){

          $("#storename").addClass("error");
        } else {

           $("#storename").removeClass("error");
           storename = $("#storename").val(); 
          
        } 
////////////////////////////Evaluate address//////////////////

        if( $("#address").val().length < 2  || parseInt($("#address").val()) ){

          $("#address").addClass("error");

        } else {

          $("#address").removeClass("error");
           address = $("#address").val();
           
        }

           if(storename && address){
            $("#storemodal").modal("show");
           } else {
             alert('Error en los datos');
           } 

          
    });

      //////////// Send to Server///////////////////////////////////// 
        $('#btnSavestore').on('click',( )=>{
          
          let store = {"name": storename , "street": address } 
           
           console.log(store);

          $.post('/stores/new', store, (data)=>{
            console.log(data);
            
            window.location.replace("/stores/index");

          });
          
        });

 })