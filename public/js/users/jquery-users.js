$(function(){

   let changes = { }    
   let updateData = { }
   let updateId = { }

   function numbersandLetters(str){
      const haveLetters = /[a-zA-Z]/.test(str);
      const haveNumbers = /\d/.test(str);
             
          return  haveLetters && haveNumbers
    }



   ////////////////////////Get all Users//////////////////////////

   $.getJSON('/users/',(data)=>{

         $.each(data, (i, value) => {

            const newRow = document.createElement("tr");
            newRow.setAttribute("id" ,  value.id);  

            const storeName = value.Store ? value.Store.name : 'No Aplica';   

         newRow.innerHTML +='<td>' + value.id + '</td><td>' + value.email +'</td>'
         newRow.innerHTML += '<td>  <input  type="text" class="form-control firstname" value="'+ value.firstname + '"> </td>' 
         newRow.innerHTML += '<td> <input  type="text" class="form-control lastname  " value="'+ value.lastname + '"> </td>'
         newRow.innerHTML += '<td>'+ value.role  +'</td> <td>' + storeName + '</td>'
         newRow.innerHTML += '<td> <button  type="button" class="btn btn-outline-success editBtn ">Editar</button> </td>' 
         newRow.innerHTML += '<td> <button type="button" class="btn btn-outline-info moreBtn"> Más </button> </td>' 
            $("tbody").prepend(newRow);

         });

    

   })
    


                ////////////////////////////////Data Change Validator/////////////////////////////
     
          $("body").on("change","input",function(){
          $(this).addClass("change");
          }); 
   


                    
          $("body").on('click', "button.editBtn", function() {

            $('.progress-bar').css("width", "55%");

            let $row = $(this).closest('tr');
        
            let id = $row.attr('id');
         

            updateId['id'] = id;  
            console.log(updateId);

         
            if( $(this).closest('tr').find('input.firstname').hasClass("change")){
         
               let firstname =  $row.find('input.firstname').val();
            
               changes['firstname'] = firstname;
               
                
               } 

               if( $(this).closest('tr').find('input.lastname').hasClass("change")){
         
                  let lastname =  $row.find('input.lastname').val();
               
                  changes['lastname'] = lastname;
                  
                } 
 
              
                if(changes.firstname  || changes.lastname ){
                   
                  $("#editConfBtn").modal('show');

                } else {      
                  $('.progress-bar').css("width", "15%");
                  alert('Ningun dato fue modificado'); 

                   }
 
               
          });

          //////////////////////////////////Send data to sever//////////////////////

          $("#saveBtnA").on('click',()=>{
          
            updateData = {...updateId , updates:{...changes}} 
   
            
            $.post('/users/update', updateData, (data)=>{
               console.log(data);
               
              
   
             });

          });



         ///////////////////////////////Save Password///////////////////

        $("tbody").on('click', '.moreBtn', function() {

         let $row = $(this).closest('tr');
        
         let id = $row.attr('id');
      

         updateId['id'] = id;  

         $("#moreEditBtn").modal('show');

     });
    
        /////////////////////////////////Send Password to Server//////////////77

        
         $("#SvPsswd").on('click',function(){

           

         

      

            ////Test Password////////////////////////////////////////////


            if( $("#password1").val().length < 8  || !numbersandLetters($("#password1").val()) ){
               alert('El nuevo password debe tener 8 caracteres  con letras y números');

            } else if( $("#password1").val()!==$("#password2").val() ){
                alert('La contraseña y la confirmación no coinciden');
            } else {

                let password = $("#password1").val();

                changes.password = password;

                updateData = {...updateId , updates:{...changes}} 
                
                $.post('/users/update', updateData, (data)=>{
                  console.log(data);
                  
                 
      
                });
   

               

            }

            
            
        });


   

 });