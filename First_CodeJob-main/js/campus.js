// Declaramos variables
const URLbase = "http://localhost:3000"; // URL base del servidor local
const main_video = document.querySelector('#video'); // Referencia al elemento del reproductor de video principal
const main_video_title = document.querySelector('#title'); // Referencia al elemento del título del video principal
const video_playlist = document.querySelector('#playListVideo'); // Referencia al elemento de la lista de reproducción de video

// Escuchamos el evento 'DOMContentLoaded' que se dispara cuando el documento HTML ha sido completamente cargado y mostramos los videos
document.addEventListener('DOMContentLoaded', mostrarVideos)

// Función asíncrona para obtener la lista de videos desde el servidor
async function obtenerVideos(){
    // Realizamos una solicitud GET al servidor para obtener la lista de videos
    const resultado = await fetch(`${URLbase}/videos`)
    // Parseamos la respuesta como JSON y la devolvemos
    const videos = resultado.json()   
    return videos
}

// Función asíncrona para mostrar los videos en la lista de reproducción
async function mostrarVideos() {
    // Obtenemos la lista de videos desde el servidor
    const videos = await obtenerVideos();
    // Iteramos sobre cada video en la lista
    videos.forEach(video => {
        // Extraemos el título y la URL del video
        const { titulo, video: videoUrl } = video;
        // Creamos un nuevo contenedor para el video en la lista de reproducción
        const videoContainer = document.createElement('div');
        // Asignamos clases CSS al contenedor
        videoContainer.classList.add('ofertas_items', 'caja_ofertas');
        // Establecemos el contenido HTML del contenedor para mostrar el título del video
        videoContainer.innerHTML = `
            <h3 class="video-title">${titulo}</h3>          
        `;
        // Agregamos un event listener para cargar y reproducir el video cuando se haga clic en él
        videoContainer.addEventListener('click', () => cargarVideo(videoUrl, titulo));
        // Agregamos el contenedor del video a la lista de reproducción
        video_playlist.appendChild(videoContainer);
    });
}

// Función para cargar y reproducir un video en el reproductor principal
function cargarVideo(videoUrl, titulo) {
    // Establecemos la URL del video en el reproductor principal
    main_video.src = videoUrl;
    // Actualizamos el título del video principal
    main_video_title.textContent = titulo;
    // Cargamos el video
    main_video.load(); 
    // Reproducimos el video
    main_video.play(); 
}
