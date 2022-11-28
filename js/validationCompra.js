let btnPago = document.getElementById("btnPago");
btnPago.onclick = () => {
    if (isFormValid()) {
        const myModal = new bootstrap.Modal(document.getElementById('modalPago'), {});
        myModal.show();
    }
};

document.getElementById("notificar-pago").onclick = () => {
    Swal.fire({
        type: 'success',
        title: 'Muchas Gracias Por Su Compra!',
        icon: 'success',
        html: '<p>¡Nos comunicaremos para la entrega del producto!</p>',
        showConfirmButton: false,
        timer: 3000, 
    });

    setTimeout(() => {
        localStorage.clear();
        location.href = "index.html";
    }, 3000)
};

function isFormValid() {
    let nombreCompleto = document.getElementById("nombre-completo").value.trim();
    let celular = document.getElementById("celular").value.trim();
    let distrito = document.getElementById("distrito").value;
    let direccion = document.getElementById("direccion").value.trim();

    let letrasYEspacio = /^[a-zA-ZÀ-ú\s]*$/;  
    let soloNum = /^[0-9]*$/;  

    if (nombreCompleto.length == 0) {
        document.getElementById("nombre-completo").focus();
        alert("Debe ingresar su nombre completo");
        return false;
    } else if (!nombreCompleto.match(letrasYEspacio)) {
        document.getElementById("nombre-completo").focus();
        alert("El nombre solo debe contener letras y espacios");
        return false;
    }

    if (celular.length == 0) {
        document.getElementById("celular").focus();
        alert("Debe ingresar su celular");
        return false;
    } else if (!celular.match(soloNum)) {
        document.getElementById("celular").focus();
        alert("El celular solo debe contener números");
        return false;
    }

    if (distrito == "") {
        document.getElementById("distrito").focus();
        alert("Debe seleccionar un distrito");
        return false;
    }

    if (direccion.length == 0) {
        document.getElementById("direccion").focus();
        alert("Debe ingresar una dirección");
        return false;
    }

    return true;
}