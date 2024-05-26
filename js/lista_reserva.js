let turnos = localStorage.getItem("turnos");

const tabla = document.getElementById('tabla-turnos').getElementsByTagName('tbody')[0]

const borrarTurno = (turno) => {
    console.log(turnos)
    console.log(turno)
    const turnosFiltrados = turnos.filter(t => t.hora !== turno.hora || t.fecha !== turno.fecha);

    localStorage.setItem("turnos", JSON.stringify(turnosFiltrados))
    renderTable(turnosFiltrados)
}

turnos = JSON.parse(turnos)
const renderTable = (turnosFiltrados = turnos) => {
    tabla.innerHTML = '';
    turnosFiltrados.forEach(turno => {

        // Crear una nueva fila
        let nuevaFila = tabla.insertRow()

        // Insertar celdas en la nueva fila
        let celdaServicio = nuevaFila.insertCell(0)
        let celdaFecha = nuevaFila.insertCell(1)
        let celdaHora = nuevaFila.insertCell(2)
        let celdaAction = nuevaFila.insertCell(3);

        // Agregar contenido a las celdas (puedes obtener estos valores de un formulario, por ejemplo)
        celdaServicio.innerHTML = turno.servicio;
        celdaFecha.innerHTML = turno.fecha;
        celdaHora.innerHTML = turno.hora;
        let button = document.createElement("button");
        button.innerText = "Borrar";
        button.className = "btn btn-primary";
        button.onclick = (() => borrarTurno(turno));
        celdaAction.appendChild(button);
    });
}

renderTable()

