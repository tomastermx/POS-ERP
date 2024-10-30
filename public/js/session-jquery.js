         
     
  

  $(()=>{
          
     
        
       
           
        $.getJSON('/users/user-data/',(data)=>{

          console.log(data);  
      
          let path = window.location.pathname;
           
        
          
      
          let user = document.getElementById("usernavbar");
          
          user.textContent = data.firstname;
           
          if( path.split("/")[1] =='sales' && path.split("/")[2] =='add' &&  data.role=='seller'  ){
            
            localStorage.setItem("storeId", data.storeid); 
          }
           
        
          ////////////////////////For sales///////////////////////////////

          if( path.split("/")[1] =='sales' && path.split("/")[2] =='index' && data.role=='seller' ){

                console.log('inhabilitación funcionand');
                   
                
                  setTimeout(function() {
                    console.log('iniciando funcion retardada');
                    let buttons = $(".btn-outline-danger");
        

                    // Verificamos si los botones existen
                    if (buttons.length > 0) {
                        console.log("Botones encontrados, deshabilitándolos...");
                        buttons.prop('disabled', true); // Deshabilita los botones
                    } else {
                        console.log("No se encontraron botones con la clase .btn-outline-danger");
                    }
        
                }, 400); // Retardo de 500 ms para dar tiempo a la carga de los botones    
                  
          
                
          }


    });
             
  })