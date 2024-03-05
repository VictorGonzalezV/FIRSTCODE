// Importar la función obtenerOfertas desde el módulo API.js
import { obtenerOfertas } from "../conexion-Api/API.js";

// Función autoejecutable que se ejecuta cuando el DOM ha sido completamente cargado
(function () {
    // Escuchar el evento 'DOMContentLoaded' para llamar a la función mostrarOfertas
    document.addEventListener("DOMContentLoaded", mostrarOfertas);

    // Definición de la función asíncrona mostrarOfertas
    async function mostrarOfertas() {
        // Obtener el contenedor donde se mostrarán las ofertas
        const contenedor = document.querySelector(".lista_ofertas");
        
        // Obtener las ofertas mediante la función obtenerOfertas
        const coders = await obtenerOfertas();
        
        // Iterar sobre cada oferta recibida
        coders.forEach((oferta) => {
            // Extraer los datos de la oferta
            const {
                nombreOferta,
                fechaPublicacion,
            } = oferta;

            // Crear un elemento <li> para mostrar la oferta
            const ofertaHtml = document.createElement("li");
            // Agregar clases y atributos al elemento <li>
            ofertaHtml.className = 'ofertas_items caja_ofertas';
            ofertaHtml.dataset.ofertaId = oferta.id;
            
            // Agregar contenido HTML al elemento <li> utilizando interpolación de cadenas
            ofertaHtml.innerHTML = `
                <a href="#descripcion_empresa">
                    <h3 class="ofertas_cargo">${nombreOferta}</h3>
                    <p class="ofertas_hora">Fecha de publicacion: ${fechaPublicacion}</p>
                    <p class="ofertas_postulaciones">Canitidad de postulaciones: </p>
                </a>
            `;
            
            // Agregar el elemento <li> al contenedor de ofertas
            contenedor.appendChild(ofertaHtml);
        });
    }
})();
