let container_servicios = document.getElementById("main-servicios");

const crearCardServicio = ({ titulo, descripcion, imagen, alt }) => {
    container_servicios.innerHTML += `
        <div class=" servicio-descripcion">
            <img src="${imagen}" alt="${alt}">
            <h2 class="titulo-servicio">${titulo}</h2>
            <p class="texto-servicio">${descripcion}</p>
        </div>
     `
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
            crearCardServicio(servicio)
        })
        //agregarEvento() 
    })
    .catch(e => {
        console.error("Hubo un error al operar con fetch " + e.message)
    }) 