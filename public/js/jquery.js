$(function(){

   $("#login").on('click',()=>{

      let email  = $("#email").val();
      let psswd  = $("#password").val();

      console.log(email);
      console.log(psswd);

      const user = {
           "email": email,
            "password": psswd
      }
       console.log(user);

      $.post('/users/login',user, (data)=>{
           
      })

     // window.location.replace("/users/dashboard");
   });


});