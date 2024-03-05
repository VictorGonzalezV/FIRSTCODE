// URL base para las peticiones al servidor local
var URLbase = "http://localhost:3000";

// Cuando el contenido del DOM se haya cargado, se ejecuta obtenerDatos
document.addEventListener("DOMContentLoaded", () => {
    obtenerDatos();
});

// Función asincrónica para obtener los datos de los videos guardados en el servidor
async function obtenerDatos() {
    const respuesta = await fetch(`${URLbase}/videosGuardados`);
    const datosRespuesta = await respuesta.json();
    showVideos(datosRespuesta);
}

// Función para mostrar los videos en el contenedor especificado
function showVideos(videos) {
    const contenedor = document.querySelector('#box_container_companies');

    // Itera sobre cada video en la lista y crea un elemento de video para mostrarlo
    videos.forEach((video) => {
        const videoElement = document.createElement('video');
        contenedor.appendChild(videoElement);
        videoElement.width = '500';
        videoElement.src = `video/${video.videosmp4}`;
        videoElement.height = '500';
        videoElement.controls = true;

        // Crea un elemento de origen (source) para el video y establece su fuente y tipo
        const sourceElement = document.createElement('source');
        sourceElement.src = video.videosmp4;
        sourceElement.type = 'video/mp4';

        videoElement.appendChild(sourceElement);
    });
}

// Función de inicialización
const init = () => {
    // Función para verificar si el navegador soporta getUserMedia para acceder a dispositivos de usuario
    const tieneSoporteUserMedia = () => !!(navigator.mediaDevices.getUserMedia);

    // Verifica si el navegador es compatible con MediaRecorder y getUserMedia, de lo contrario muestra un mensaje de alerta
    if (typeof MediaRecorder === "undefined" || !tieneSoporteUserMedia())
        return alert("Tu navegador web no cumple los requisitos; por favor, actualiza a un navegador decente como Firefox o Google Chrome");

    // Declaración de elementos del DOM
    const $dispositivosDeAudio = document.querySelector("#dispositivosDeAudio"),
        $dispositivosDeVideo = document.querySelector("#dispositivosDeVideo"),
        $duracion = document.querySelector("#duracion"),
        $video = document.querySelector("#video"),
        $btnComenzarGrabacion = document.querySelector("#btnComenzarGrabacion"),
        $btnDetenerGrabacion = document.querySelector("#btnDetenerGrabacion");

    // Función para limpiar las opciones de un elemento select
    const limpiarSelect = elemento => {
        for (let x = elemento.options.length - 1; x >= 0; x--) {
            elemento.options.remove(x);
        }
    };

    // Función para convertir segundos en formato de tiempo (HH:MM:SS)
    const segundosATiempo = numeroDeSegundos => {
        let horas = Math.floor(numeroDeSegundos / 60 / 60);
        numeroDeSegundos -= horas * 60 * 60;
        let minutos = Math.floor(numeroDeSegundos / 60);
        numeroDeSegundos -= minutos * 60;
        numeroDeSegundos = parseInt(numeroDeSegundos);
        if (horas < 10) horas = "0" + horas;
        if (minutos < 10) minutos = "0" + minutos;
        if (numeroDeSegundos < 10) numeroDeSegundos = "0" + numeroDeSegundos;

        return `${horas}:${minutos}:${numeroDeSegundos}`;
    };

    // Variables globales
    let tiempoInicio, mediaRecorder, idIntervalo;

    // Función para refrescar el contador de duración
    const refrescar = () => {
        $duracion.textContent = segundosATiempo((Date.now() - tiempoInicio) / 1000);
    };

    // Consulta la lista de dispositivos de entrada de audio y video, y llena los select correspondientes
    const llenarLista = () => {
        navigator
            .mediaDevices
            .enumerateDevices()
            .then(dispositivos => {
                limpiarSelect($dispositivosDeAudio);
                limpiarSelect($dispositivosDeVideo);
                dispositivos.forEach((dispositivo, indice) => {
                    if (dispositivo.kind === "audioinput") {
                        const $opcion = document.createElement("option");
                        // En caso de que no haya etiqueta, se asigna un nombre predeterminado
                        $opcion.text = dispositivo.label || `Micrófono ${indice + 1}`;
                        $opcion.value = dispositivo.deviceId;
                        $dispositivosDeAudio.appendChild($opcion);
                    } else if (dispositivo.kind === "videoinput") {
                        const $opcion = document.createElement("option");
                        // En caso de que no haya etiqueta, se asigna un nombre predeterminado
                        $opcion.text = dispositivo.label || `Cámara ${indice + 1}`;
                        $opcion.value = dispositivo.deviceId;
                        $dispositivosDeVideo.appendChild($opcion);
                    }
                });
            });
    };

    // Función para iniciar la cuenta regresiva de grabación
    const comenzarAContar = () => {
        tiempoInicio = Date.now();
        idIntervalo = setInterval(refrescar, 500);
    };

    // Función para enviar los datos del video al servidor en formato JSON
    async function jsonServer(temporal) {
        const videosGuardados = await fetch(`${URLbase}/videosGuardados`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(temporal)
        });
    }

    // Función para comenzar la grabación de audio y video
    const comenzarAGrabar = () => {
        btnComenzarGrabacion.classList.add("btn-active");
        if (!$dispositivosDeAudio.options.length) return alert("No hay micrófono");
        if (!$dispositivosDeVideo.options.length) return alert("No hay cámara");
        // Evita iniciar una grabación si ya está en curso
        if (mediaRecorder) return alert("Ya se está grabando");

        navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: $dispositivosDeAudio.value, // Dispositivo de audio seleccionado
            },
            video: {
                deviceId: $dispositivosDeAudio.value, // Dispositivo de video seleccionado
            }
        })
            .then(stream => {
                // Muestra el stream de video en el elemento de video
                $video.srcObject = stream;
                $video.play();
                // Inicia la grabación con el stream
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                comenzarAContar();
                // Almacena los fragmentos de audio en un arreglo
                const fragmentosDeAudio = [];
                // Escucha eventos de disponibilidad de datos para agregar fragmentos
                mediaRecorder.addEventListener("dataavailable", evento => {
                    fragmentosDeAudio.push(evento.data);
                });
                // Cuando se detiene la grabación, se ejecuta esta función
                mediaRecorder.addEventListener("stop", () => {
                    // Pausa el video
                    $video.pause();
                    // Detiene el stream
                    stream.getTracks().forEach(track => track.stop());
                    // Detiene el contador
                    detenerConteo();
                    // Convierte los fragmentos en un objeto binario
                    const blobVideo = new Blob(fragmentosDeAudio);

                    // Crea una URL para descargar el video
                    const urlParaDescargar = URL.createObjectURL(blobVideo);
                    // Crea un enlace para descargar el video
                    let a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    a.href = urlParaDescargar;
                    let id = Date.now();
                    a.download = `entrevistaCoder_${id}.mp4`;
                    const temporal = {
                        id: id,
                        nombre: `video_${id}`,
                        videosmp4: `entrevistaCoder_${id}.mp4`,
                    };

                    jsonServer(temporal);

                    // Simula el clic en el enlace para iniciar la descarga
                    a.click();
                    // Revoca el objeto URL
                    window.URL.revokeObjectURL(urlParaDescargar);
                });
            })
            .catch(error => {
                // Maneja el error, por ejemplo, si no se otorgaron permisos
                console.log(error);
            });
    };

    // Detiene la cuenta regresiva y la grabación
    const detenerConteo = () => {
        clearInterval(idIntervalo);
        tiempoInicio = null;
        $duracion.textContent = "";
    };

    // Función para detener la grabación
    const detenerGrabacion = (e) => {
        e.preventDefault();
        $btnComenzarGrabacion.classList.remove("btn-active");
        if (!mediaRecorder) return alert("No se está grabando");
        mediaRecorder.stop();
        mediaRecorder = null;
    };

    // Evento click para comenzar a grabar
    $btnComenzarGrabacion.addEventListener("click", comenzarAGrabar);
    // Evento click para detener la grabación
    $btnDetenerGrabacion.addEventListener("click", detenerGrabacion);

    // Llena la lista de dispositivos cuando el documento esté listo
    llenarLista();
};

// Espera a que el documento esté listo para inicializar
document.addEventListener("DOMContentLoaded", init);
