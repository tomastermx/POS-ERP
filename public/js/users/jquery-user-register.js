

$(function(){

    let user = {}

    /// Get  Stores /////////////////7

    $.getJSON("/stores", (data) => {
        
        $.each(data, (i, value) => {
          const option =
            '<option value="' + value.id + '">' + value.name + "</option>";
    
          $("#store").prepend(option);
        });
      });

    ////////////////////////////////// Progress Bar  ///////////////////////////

    setTimeout(()=>{ $('.progress-bar').css("width", "100%"); }, 900); 
    setTimeout(()=>{ $('.progress-bar').css("width", "3%"); }, 1800); 

    //////////////////////////////  Post User //////////////////////////////////

        $("#userform").on("submit",(event)=>{

            event.preventDefault();
            $('.progress-bar').css("width", "50%");                         
             

            //////////Evaluate if function contains numbers/////////////
            function containsNumber(str){
             
               return /\d/.test(str);

            }
               
             
              function numbersandLetters(str){
                const haveLetters = /[a-zA-Z]/.test(str);
                const haveNumbers = /\d/.test(str);
                       
                    return  haveLetters && haveNumbers
              }
 
         //////////////////////////////////////////////////// 
               
            let name = "";

            let lastname = "";

            let email = "";

            let role = "";

            let store = ""; 

            let password ="";



              

                /////Test Name/////////////////////////

            if( $("#name").val().length < 4 ||  containsNumber($("#name").val())){
              alert('Error en la selección del nombre'); 
              $("#name").addClass("error");
            } else {
               
               name = $("#name").val();
               $("#name").removeClass("error");
             }
             
             ////////////////////////////Test Last Name   

            if( $("#lastname").val().length < 5 ||  containsNumber($("#lastname").val())){
              alert('Error en la selección del Apellidos'); 
              $("#lastname").addClass("error");
            }  else {
                lastname = $("#lastname").val();
                $("#last#name").removeClass("error");
            }
                  
                ////////////////Test Email/////////////////////7
                   
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

             if( ! emailRegex.test($("#email").val()) ){

                 alert('Error en la selección de  correo ');
                $("#email").addClass("error");

            } else  {
                email = $("#email").val();
               $("#email").removeClass("error");
            }

               ////////////////////////////Test Role///////////////////////
            if(!$("#role").val() ){
                alert('Error en la captura de rol'); 
                $("#role").addClass("error");
            } else {
                role = $("#role").val();
            }
            
            ///////////////////////////Test  Store ////////////////////////////////////7

              if( $("#role").val()== 'seller' && ! $("#store").val()){
                 
                  alert('Si elige el rol de vendedor, deberá elegir una sucusal');


              } 

     

             
            //////////////////////Test Password/////////////////////////////////


            if( $("#password").val().length < 8  || !numbersandLetters($("#password").val()) ){

              alert('La contraseña debe tener al menos 8 caracteres con letras y numeros');
              $("#password").addClass("error");
            } else {
              $("#password").removeClass("error");
            }



            ////////////////////////////////////Test Password Confirmation////////////////////
            
             if($("#password").val() !==  $("#password2").val() ||  $("#password2").val()== '' ){
                      
                  alert('El password y la confirmación no coinciden');
                  $("#password2").addClass("error");

              } else if( $("#password").val() == $("#password2").val() ){
                   
                  password = $("#password").val();

                   $("#password2").removeClass("error");
             }

             
                   
              
               if(name && lastname && email && role && password){
     
                   user.name = name;
                   user.lastname =  lastname;
                   user.email = email;
                   user.role =  role;
                   user.store = store || null
                   user.password = password;

                  let modalname = document.getElementById("namemodal");
                  let modalemail = document.getElementById("emailmodal");
                  let modalrole =  document.getElementById("rolmodal");
                  modalname.innerHTML += name  + " " + lastname ;
                  modalemail.innerHTML += email;
                  modalrole.innerHTML += role;
                     
                  $('.progress-bar').css("width", "90%"); 
                   
                  $("#userModal").modal('show');

               } else {alert('algo fallo')}

       });

       ////////////////////////////Send Data to the Server ///////////7777
       
       $("#btnConfirm").on('click',()=>{
            console.log(user);
         
            $.post('/users/new', user)
             .done((data)=>{})
             .fail((jqXHR, textStatus, errorThrown)=>{})
       });

 });