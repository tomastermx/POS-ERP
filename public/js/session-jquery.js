         
     
  

  $(()=>{
          
           
        $.getJSON('/users/user-data/',(data)=>{

            
      
          let path = window.location.pathname;
           
        
          
      
          let user = document.getElementById("usernavbar");
          
          user.textContent = data.firstname;
           
          if( path.split("/")[1] =='sales' || path.split("/")[2] =='add'){
            console.log('exito');
            localStorage.setItem("storeId", data.storeid); 
          }
           
          

    });
    
  })