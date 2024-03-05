// Importación de la función obtenerOfertas desde el archivo API.js en la carpeta conexion-Api
import { obtenerOfertas } from "../conexion-Api/API.js";

// Declaración de una variable para almacenar las ofertas obtenidas de la API
let ofertas = [];

// Evento que se dispara cuando el DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', async () => {
    // Se obtienen las ofertas de la API y se asignan a la variable ofertas
    ofertas = await obtenerOfertas();
    // Se muestra la lista de ofertas obtenidas
    mostrarOfertas(ofertas);
});

// Selección de elementos del DOM para su manipulación posterior
const ofertasListContainer = document.querySelector('.ofertas_list');
const filtrosList = document.querySelector('.filtros_list');
const contenedorDescripcion = document.querySelector('.descripcion_container');
const searchButton = document.querySelector('.button_search');
const searchInput = document.querySelector('.input_search');

// Evento de clic en la lista de ofertas
ofertasListContainer.addEventListener('click', (e) => {
    // Se busca el elemento más cercano con la clase 'ofertas_items'
    const ofertaElement = e.target.closest('.ofertas_items');
    if (ofertaElement) {
        // Se obtiene el ID de la oferta seleccionada
        const ofertaId = ofertaElement.dataset.ofertaId;
        // Se busca la oferta correspondiente en la lista de ofertas
        const ofertaSeleccionada = ofertas.find(oferta => oferta.id === ofertaId);
        // Se muestra la descripción de la oferta seleccionada
        mostrarDescripcion(ofertaSeleccionada);
    }
});

// Evento de clic en el botón de búsqueda
searchButton.addEventListener('click', () => {
    // Se filtran las ofertas por especialidad al hacer clic en el botón de búsqueda
    filtrarOfertasPorEspecialidad();
});

// Evento de entrada en el campo de búsqueda
searchInput.addEventListener('input', () => {
    // Se filtran las ofertas por especialidad al escribir en el campo de búsqueda
    filtrarOfertasPorEspecialidad();
});

// Evento de clic en la lista de filtros
filtrosList.addEventListener('click', (event) => {
    // Se verifica si el elemento clickeado contiene la clase 'filtros_items'
    if (event.target.classList.contains('filtros_items')) {
        // Se obtiene la clase secundaria del elemento clickeado, que indica el tipo de filtro seleccionado
        const filtroSeleccionado = event.target.classList[1];
        // Se filtran las ofertas según el tipo de filtro seleccionado
        const ofertasFiltradas = filtrarOfertas(filtroSeleccionado, ofertas);
        // Se muestra la lista de ofertas filtradas
        mostrarOfertas(ofertasFiltradas);
    }
});

// Función para mostrar las ofertas en el contenedor correspondiente
function mostrarOfertas(ofertasToShow) {
    // Se crea un fragmento de documento para agregar las ofertas
    const fragment = document.createDocumentFragment();

    // Se itera sobre las ofertas a mostrar
    ofertasToShow.forEach((oferta) => {
        // Se crea un elemento HTML para cada oferta
        const ofertaHtml = document.createElement('li');
        ofertaHtml.className = 'ofertas_items caja_ofertas';
        ofertaHtml.dataset.ofertaId = oferta.id;

        // Se establece el contenido HTML de cada oferta
        ofertaHtml.innerHTML = `
        <a href="#descripcion_empresa">
            <h3 class="ofertas_cargo">${oferta.nombreOferta}</h3>
            <p class="ofertas_empresa">${oferta.empresa}</p>
            <p class="ofertas_ciudad">${oferta.ciudad}</p>
            <p class="ofertas_especialidad">Especialidad: ${oferta.especialidad}</p>
            <p class="ofertas_hora">Publicado el: ${oferta.fechaPublicacion}</p>
        </a>
        `;
        // Se agrega cada oferta al fragmento de documento
        fragment.appendChild(ofertaHtml);
    });

    // Se limpia el contenedor de ofertas y se agrega el fragmento con las ofertas
    ofertasListContainer.innerHTML = '';
    ofertasListContainer.appendChild(fragment);
}

// Función para filtrar las ofertas por especialidad
function filtrarOfertasPorEspecialidad() {
    // Se obtiene el valor del input de búsqueda y se convierte a minúsculas
    const especialidadInput = searchInput.value.trim().toLowerCase();
    // Se filtran las ofertas cuya especialidad incluya el texto ingresado en el input de búsqueda
    const ofertasFiltradasPorEspecialidad = ofertas.filter(oferta => oferta.especialidad.toLowerCase().includes(especialidadInput));
    // Se muestra la lista de ofertas filtradas
    mostrarOfertas(ofertasFiltradasPorEspecialidad);
}

// Función para filtrar las ofertas según un tipo de filtro dado
function filtrarOfertas(tipoFiltro, ofertas) {
    switch (tipoFiltro) {
        // Caso para filtrar por nombre de oferta
        case 'nombreOferta':
            return ofertas.slice().sort((a, b) => a.nombreOferta.localeCompare(b.nombreOferta));
        // Caso para filtrar por fecha de publicación
        case 'fechaPublicacion':
            return ofertas.slice().sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion));
        // Caso para filtrar por especialidad
        case 'especialidad':
            return ofertas.slice().sort((a, b) => a.especialidad.localeCompare(b.especialidad));
        // Caso para filtrar por ubicación
        case 'ubicacion':
            return ofertas.slice().sort((a, b) => a.ciudad.localeCompare(b.ciudad));
        // Caso por defecto: no aplicar ningún filtro y devolver las ofertas sin modificar
        default:
            return ofertas.slice();
    }
}

// Función para mostrar la descripción detallada de una oferta
function mostrarDescripcion(oferta) {
    // Se limpia el contenedor de descripción
    contenedorDescripcion.innerHTML = '';
    // Se crea un elemento HTML para la descripción
    const descripcionHtml = document.createElement("div");
    // Se establece el contenido HTML de la descripción
    descripcionHtml.innerHTML = `
        <div class="descripcion_empresa">
            <h3 class="descripcion_cargo">${oferta.nombreOferta}</h3>
            <p class="descripcion_ciudad">${oferta.ciudad}</p>
            <a class="descripcion_empresa" href="#">${oferta.empresa}</a>
        </div>
        <div class="descripcion_botones_container">
            <button class="boton_aplicar" onclick="aplicarVacante(${oferta.id})">Aplicar a la vacante</button>
            <span class="boton_compartir"><ion-icon name="share-social-outline"></ion-icon></span>
        </div>
        <div class="descripcion_adicionales_container">
            <span class="descripcion_adicionales">${oferta.salario} (Mensual)</span>
            <span class="descripcion_adicionales">${oferta.tipoContrato}</span>
            <span class="descripcion_adicionales">${oferta.tiempo}</span>
        </div>
        <div>
            <p class="descripcion_oferta">
                ${oferta.descripcion}
                <br>
                <br>
                SALARIO: ${oferta.salario} + ${oferta.bono} de bonificación fija + Prestaciones Sociales.
                HORARIO: ${oferta.horario}
                <br>
            </p>
            <p class="descripcion_requisitos">Requerimientos</p>
            <ul class="descripcion_requisitos_list">
                <li class="descripcion_requisitos_items">Educación mínima: ${oferta.estudios}</li>
                <li class="descripcion_requisitos_items">Mínimo ${oferta.experiencia} Meses de experiencia</li>
                <li class="descripcion_requisitos_items">Especialidad en: ${oferta.especialidad}</li>
            </ul>
            <p class="ofertas_hora">Publicado el: ${oferta.fechaPublicacion}</p>
        </div>
    `;

    // Se agrega la descripción al contenedor correspondiente
    contenedorDescripcion.appendChild(descripcionHtml);
}
