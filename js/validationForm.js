const form = document.querySelector("#form");

form.addEventListener("submit", function(e) {
    const email = document.querySelector("#email").value;
    const asunto = document.querySelector("#asunto").value;
    const mensaje = document.querySelector("#mensaje").value;
    const name = document.querySelector("#name").value;
    
    const validEmail = document.querySelector("#validEmail");
    const success = document.querySelector("#success");

    const caracteres = (/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/);

    e.preventDefault();
    if(name === "" || asunto === "" || !email.match(caracteres) || mensaje === ""){
        if (!email.match(caracteres)){
            validEmail.style.display = "block";
            validEmail.style.color = "red";
            document.getElementById("email").style.border = '2px solid red';
        }

        Swal.fire({  //mostrar ventana
            type: 'Error',
            title: 'Ingrese los campos requeridos',
            icon: 'error',
            timer: 2500,
            showConfirmButton: false,
        })
    }
    else {
        Swal.fire({
            type: 'success',
            title: 'Muchas Gracias',
            icon: 'success',
            html: '<b>En breve nos pondremos en contacto</b>',
            showConfirmButton: false,
            timer: 3000, 
        });
        
        validEmail.style.display = "none";
        document.getElementById("email").style.border = '';

        success.style.display = "block";
        success.style.color = "green";
        
        setTimeout(() => {
            success.style.display = "none";
        }, 6000)

        form.reset();
    }
    
})