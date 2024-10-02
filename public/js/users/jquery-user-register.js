

$(function(){

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
             
            let name = $("#name").val();

            let lastname = $("#lastname").val();

            let email = $("#email").val();

            console.log(name);
            console.log(lastname);
            console.log(email);
              
       });

 
 });