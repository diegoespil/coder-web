const formContacto = document.getElementById('form-contacto')
const alertaExito = document.getElementById('alert-exito');
formContacto.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener los valores del formulario
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let telefono = document.getElementById('telefono').value;
    let comentario = document.getElementById('comentario').value;

    // Enviar los datos al servidor
    enviarDatosAlServidor(nombre, email, telefono, comentario);

    // Mostrar la alerta de éxito
    alertaExito.style.display = 'block';

    // Limpiar el formulario después de guardar los datos
    formContacto.reset();

    // Ocultar la alerta después de 3 segundos
    setTimeout(function () {
        alertaExito.style.display = 'none';
    }, 3000);
});

function enviarDatosAlServidor(nombre, email, telefono, comentario) {
    console.log("Nombre: ", nombre)
    console.log("Email: ", email)
    console.log("Telefono: ", telefono)
    console.log("Comentario: ", comentario)
}