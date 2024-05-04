

const select_servicios = document.getElementById('serv');

class Servicio {

    constructor(id, nombre, duracion, precio) {
        this.id = id
        this.nombre = nombre
        this.duracion = duracion
        this.precio = precio
    }

}

const crearOpcionServicio = (servicio) => {
    let option = document.createElement("option");
    option.text = servicio.nombre;
    option.value = servicio.id;
    return option

}

fetch("../data.json")
    .then(datos => {
        if (!datos.ok) {
            throw new Error("Error al traer los datos")
        } else {
            return datos.json()
        }
    })
    .then(servicios => {
        servicios.forEach(servicio => {
            const option = crearOpcionServicio(servicio)
            select_servicios.append(option)
        })
    })
    .catch(e => {
        console.error("Hubo un error al operar con fetch " + e.message)
    })


let data_reserva = {
    "id_servicio": "",
    "servicio": "",
    "fecha": "",
    "hora": ""
}

select_servicios.addEventListener('change', (e) => {
    data_reserva.servicio = select_servicios.options[select_servicios.selectedIndex].text
    data_reserva.id_servicio = e.target.value
    const value = e.target.value
    if (value !== '0') {
        document.getElementById('calendario').disabled = false
    }

})


// Función para formatear una fecha en el formato deseado (d-MM-y)
function formatDate(date) {
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear().toString().slice(-2);
    return day + '-' + month + '-' + year;
}

// Función para generar un arreglo de horas (HH:MM) para un día dado
function generateHours() {
    let hours = [];
    for (let hour = 10; hour < 19; hour++) {
        for (let minute = 0; minute < 60; minute += 60) {
            let hourStr = hour.toString().padStart(2, '0');
            let minuteStr = minute.toString().padStart(2, '0');
            hours.push(hourStr + ':' + minuteStr);
        }
    }
    return hours;
}

// Función para generar un arreglo de fechas y horas para los próximos 7 días
function generateDates() {
    let dates = [];
    let today = new Date();
    for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
        let formattedDate = formatDate(currentDate);
        let hours = generateHours();
        dates.push({ date: formattedDate, hours: hours });
    }
    return dates;
}

// Generar el arreglo de fechas y horas para los próximos 7 días
let datesWithHours = generateDates();


const calendario = document.getElementById('calendario');
let fechaActual = new Date();
calendario.min = fechaActual.toISOString().split('T')[0];
// Establecer la fecha máxima (dentro de 7 días)
let fechaMaxima = new Date();
fechaMaxima.setDate(fechaActual.getDate() + 7);
calendario.max = fechaMaxima.toISOString().split('T')[0]

calendario.addEventListener('change', (e) => {
    let fecha = e.target.value
    let date = new Date(fecha)
    let currentDate = new Date(date.getTime() + 24 * 60 * 60 * 1000)
    data_reserva.fecha = formatDate(currentDate)
    document.getElementById('hora').disabled = false
    _cargarHoras(data_reserva.fecha)
})

let horaInput = document.getElementById('hora');
const _cargarHoras = (fecha) => {
    datesWithHours.forEach(f => {
        if (f.date === fecha) {
            f.hours.forEach(hora => {
                // Crear una nueva opción y agregarla al input
                let option = document.createElement('option');
                option.text = hora;
                option.value = hora;
                horaInput.appendChild(option);
            })
        }
    })

}

horaInput.addEventListener('change', (e) => {
    data_reserva.hora = e.target.value
})

const validarDatos = () => {
    const nombre = document.getElementById('nombre').value
    const telefono = document.getElementById('telefono').value
    const id_servicio = select_servicios.options[select_servicios.selectedIndex].value
    const fecha = calendario.value
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

form_reserva.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('nombre').classList.remove('is-invalid')
    document.getElementById('telefono').classList.remove('is-invalid')
    if (validarDatos()) {
        data_reserva.hora = horaInput.options[horaInput.selectedIndex].text

        _borrarHoraDisponible(data_reserva.fecha, data_reserva.hora)

        localStorage.setItem("id_servicio", data_reserva.id_servicio)
        localStorage.setItem("servicio", data_reserva.servicio)
        localStorage.setItem("fecha", data_reserva.fecha)
        localStorage.setItem("hora", data_reserva.hora)



        horaInput.innerHTML = ""

        form_reserva.reset()

        Swal.fire({
            icon: "success",
            title: "Turno reservado!",
            showConfirmButton: false,
            timer: 1500
        });


    } else {
        marcarDatosFaltantes()
    }
})

const _borrarHoraDisponible = (fecha, hora) => {
    datesWithHours.forEach(f => {
        if (f.date === fecha) {
            f.hours = f.hours.filter((valor) => {
                return valor !== hora
            })
        }
    })
}

