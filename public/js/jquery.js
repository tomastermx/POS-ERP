$(function(){

   $("#login").on('click',()=>{

      let email  = $("#email").val();
      let psswd  = $("#password").val();

      

      const user = {
           "email": email,
            "password": psswd
      }
       

      $.post('/users/login',user)
      .done(()=> { 
                 alert('Datos correctos')
         window.location.replace("/users/dashboard") 

       })
      .fail(()=>{ alert('datos invalidos') })
   });


});