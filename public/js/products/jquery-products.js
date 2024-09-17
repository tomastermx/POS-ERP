  

  $(function(){
  
  

    let changes={ }   

    let updateId =  { }

    let updateData = {}
    
    $.getJSON('/products/', (data)=>{
        
        $.each(data, (i, value) => {
            const newRow = document.createElement("tr");
            
            newRow.setAttribute("id" ,  value.id); 

            newRow.innerHTML = '<td>'+value.name +'</td> <td> <input name="description"  type="text" class="form-control dscrptn " value=" '+ value.description + '"> </td><td><input  name="price" type="text" class="form-control prc" value=" '+ value.price + '">   </td> <td> <button type="button" class="btn btn-success update">Actualizar</button> </td>'  
            
            console.log(value);

            $("tbody").prepend(newRow);

        })

    });

    ////////////////////////////////Data Change Validator/////////////////////////////
     
    $("body").on("change","input",function(){
      $(this).addClass("change");
      }); 
 

     ////////////////////////////Updating  Data//////////////////////



      $("body").on("click", "button.update", function() {

        
        let $row = $(this).closest('tr');
        
        let id = $row.attr('id');
        
        updateId['id'] = id;         
        
   
        if( $(this).closest('tr').find('input.prc').hasClass("change")){
 
         
          let price = $row.find('input.prc').val();       
              
          changes['price'] = price
          console.log(changes);
  
        } 

    
        if( $row.find('input.dscrptn').hasClass("change")){
           
          let description = $row.find('input.dscrptn').val();
          
          changes['description'] = description;
           
          
          console.log(changes);
        }     



         if( changes.price || changes.description){
          $('.progress-bar').css("width", "50%"); 
          console.log('buena validación');
          console.log(changes);    
          $("#modal").modal("show");

         } else { alert('No se encontraron modificaciones'); }
        
         

      });
      
      
  //////////////////////// Send to server////////////////////////////7    
     
       $("#saveBtn").on("click", ()=>{
          
           updateData = {...updateId , updates:{...changes}}         
          
           
          console.log(updateData);

           $.ajax({
            url: '/products/update',
            type: 'PUT',
            data: updateData,
            success: function () {
              
              $("#modal").modal("hide"); 
               
            }
        });


       });

 
  });