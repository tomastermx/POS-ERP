
$(function(){
     
     
     let changes = { }    
     let updateId = { }

     let updateData = { }
  

     ///////////////////////////////////////////Get All Stores/////////////////////////////77
      
     $.getJSON('/stores/',(data)=>{
                    
            console.log(data);
           
          $.each(data, (i, value)=> {
            const newRow = document.createElement("tr");
             newRow.setAttribute("id" ,  value.id); 
             newRow.innerHTML = '<td><input  type="text" class="form-control store" value="'+ value.name + '"> </td> <td>   <input  type="text" class="form-control addrss" value="'+ value.street + '"></td> <td><a href="/stores/'+ value.id +'/profile"> Stock-Perfil</a></dt> <td><button type="button" class="btn btn-success update">Editar</button></td>'


             $("#maintable").prepend(newRow);

          });



     }); 

  
       ////////////////////////////////Data Change Validator/////////////////////////////
     
    $("body").on("change","input",function(){
     $(this).addClass("change");
     }); 


   ////////////////////////////////Data Change Validator/////////////////////////////
 
     $("body").on("click", "button.update", function() {
      
      $('.progress-bar').css("width", "30%"); 
       
      let $row = $(this).closest('tr');
        
      let id = $row.attr('id');
      
      updateId['id'] = id;         
      
         
         if( $(this).closest('tr').find('input.store').hasClass("change")){
         
         let namestore =  $row.find('input.store').val();
         console.log(namestore);
         changes['name'] = namestore;
         
          
         } 



         if( $(this).closest('tr').find('input.addrss').hasClass("change")){

            let  street = $row.find('input.addrss').val();

           console.log(street);
           changes['street'] = street;
           
           

          }

          if( changes.name || changes.street){

            $("#mainmodal").modal('show');

          } else {
            $('.progress-bar').css("width", "10%");
            alert('Ningun dato fue modificado');

          }

     });  

 /////////////////////////////////////////Send data to sever////////////////////////////////
                   
                 $("#saveBtn").on('click',()=>{

                
                 console.log('botn aservirdor'); 
                 updateData = {...updateId , updates:{...changes}}  
                
                 console.log(updateData)
                               
                 $.ajax({
                  url: '/stores/update',
                  type: 'PUT',
                  data: updateData,
                  success: function (data) {
                    $('.progress-bar').css("width", "100%");   
                    
                    $("#mainmodal").modal("hide"); 
                                  
                  }
              });
             

         });



});