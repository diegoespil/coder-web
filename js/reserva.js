const select_servicios = document.getElementById('serv');

class Servicio {

    constructor(id, nombre, duracion, precio) {
        this.id = id
        this.nombre = nombre
        this.duracion = duracion
        this.precio = precio
    }
}

const servicios = [
    new Servicio(1, "servicio 1", 30, 3000),
    new Servicio(2, "servicio 2", 30, 3000),
    new Servicio(3, "servicio 3", 30, 3000),
    new Servicio(4, "servicio 4", 30, 3000),
]

const agregarServicio = (servicio) => {
    var option = document.createElement("option");
    option.text = servicio.nombre;
    option.value = servicio.id;
    return option

}

servicios.forEach(servicio => {
    const option = agregarServicio(servicio)
    select_servicios.append(option)

})

let data_reserva = {
    "servicio": "",
    "fecha": "",
    "hora": ""
}

select_servicios.addEventListener('change', (e) => {
    data_reserva.servicio = e.target.value
    console.log("servicio guardado ", data_reserva.servicio)
    const value = e.target.value
    if (value !== '0') {
        document.getElementById('calendario').disabled = false
    }

})



const calendario = document.getElementById('calendario');
let fechaActual = new Date();
calendario.min = fechaActual.toISOString().split('T')[0];
// Establecer la fecha máxima (dentro de 7 días)
let fechaMaxima = new Date();
fechaMaxima.setDate(fechaActual.getDate() + 7);
calendario.max = fechaMaxima.toISOString().split('T')[0];
calendario.addEventListener('change', (e) => {
    let fecha = e.target.value
    console.log("fecha: ", fecha)
    data_reserva.fecha = e.target.value
    console.log("fecha guardada ", data_reserva.fecha)
    document.getElementById('hora').disabled = false
})

let horaInput = document.getElementById('hora');

// Generar opciones de horas cada media hora
for (let hora = 10; hora <= 18; hora++) {
    for (let minuto = 0; minuto < 60; minuto += 60) {
        let horaStr = ('0' + hora).slice(-2); // Asegurar formato HH
        let minutoStr = ('0' + minuto).slice(-2); // Asegurar formato MM
        let horaCompleta = horaStr + ':' + minutoStr;

        // Crear una nueva opción y agregarla al input
        let option = document.createElement('option');
        option.text = horaCompleta;
        option.value = horaCompleta;
        horaInput.appendChild(option);
    }
}

horaInput.addEventListener('change', (e) => {
    console.log("hora seleccionada: ", e.target.value)
    data_reserva.hora = e.target.value
    console.log("hora guardada: ", data_reserva.hora)
})

const validarDatos = () => {
    const nombre = document.getElementById('nombre').value
    const telefono = document.getElementById('telefono').value
    const id_servicio = select_servicios.options[select_servicios.selectedIndex].value;
    const fecha = calendario.value;
    console.log("nombre: ", nombre)
    console.log("telefono: ", telefono)
    console.log("id servicio: ", id_servicio)
    console.log("fecha ", fecha)
    if (nombre !== "" && telefono !== "" && id_servicio !== "" && fecha !== "")
        return true
    else
        return false
}

const marcarDatosFaltantes = () => {
    const nombre = document.getElementById('nombre')
    const telefono = document.getElementById('telefono')
    if (nombre.value == "") {
        nombre.classList.add("is-invalid")
    }
    if (telefono.value == "") {
        telefono.classList.add("is-invalid")
    }
}

const form_reserva = document.getElementById('form-reserva');
const alertaExito = document.getElementById('alert-exito');
form_reserva.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('nombre').classList.remove('is-invalid')
    document.getElementById('telefono').classList.remove('is-invalid')
    if (validarDatos()) {
        console.log("datos validados")
        console.log("data: ", data_reserva)
        let data = JSON.stringify(data_reserva)
        localStorage.setItem(document.getElementById('nombre').value, data)
        alertaExito.style.display = 'block'
        form_reserva.reset()
        setTimeout(function () {
            alertaExito.style.display = 'none';
        }, 3000);
    } else {
        console.log("datos no validados")
        marcarDatosFaltantes()
    }
})

