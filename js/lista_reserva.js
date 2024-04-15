const id_servicio = localStorage.getItem('id_servicio')
const servicio = localStorage.getItem('servicio')
const fecha = localStorage.getItem('fecha')
const hora = localStorage.getItem('hora')
console.log(servicio)
console.log(fecha)
console.log(hora)

const tabla = document.getElementById('tabla-turnos').getElementsByTagName('tbody')[0]
console.log(tabla)
// Crear una nueva fila
let nuevaFila = tabla.insertRow()

// Insertar celdas en la nueva fila
let celdaServicio = nuevaFila.insertCell(0)
let celdaFecha = nuevaFila.insertCell(1)
let celdaHora = nuevaFila.insertCell(2)

// Agregar contenido a las celdas (puedes obtener estos valores de un formulario, por ejemplo)
celdaServicio.innerHTML = servicio;
celdaFecha.innerHTML = fecha;
celdaHora.innerHTML = hora