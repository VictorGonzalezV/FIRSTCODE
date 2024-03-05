// Importar la función nuevaOferta desde el módulo de conexión a la API
import { nuevaOferta } from "../conexion-Api/API.js";

// Obtener el formulario de publicación de oferta
const publicarOferta = document.querySelector("#formulario");

// Agregar un evento de escucha al formulario para validar la oferta antes de enviarla
publicarOferta.addEventListener("submit", validarOferta);

// Definir la función para validar la oferta antes de enviarla a la API
function validarOferta(e) {
    // Prevenir el comportamiento por defecto del envío del formulario
    e.preventDefault();

    // Obtener los valores de los campos del formulario
    const nombreOferta = document.querySelector("#nombreOferta").value;
    const empresa = document.querySelector("#empresa").value;
    const ciudad = document.querySelector("#ciudad").value;
    const especialidad = document.querySelector("#especialidad").value;
    const estudios = document.querySelector("#estudios").value;
    const experiencia = document.querySelector("#experiencia").value;
    const salario = document.querySelector("#salario").value;
    const bono = document.querySelector("#bono").value;
    const tipoContrato = document.querySelector("#tipoContrato").value;
    const tiempo = document.querySelector("#tiempo").value;
    const requerimientos = document.querySelector("#requerimientos").value;
    const horario = document.querySelector("#horario").value;
    const fechaPublicacion = document.querySelector('#fechaPublicacion').value;
    const descripcion = document.querySelector("#descripcion").value;

    // Crear un objeto con los datos de la oferta
    const oferta = {
        nombreOferta,
        empresa,
        ciudad,
        especialidad,
        estudios,
        experiencia,
        salario,
        bono,
        tipoContrato,
        tiempo,
        requerimientos,
        horario,
        fechaPublicacion,
        descripcion,
    };

    // Obtener los campos vacíos de la oferta
    const camposVacios = obtenerCamposVacios(oferta);

    // Si hay campos vacíos, mostrar una alerta y detener el proceso
    if (camposVacios.length > 0) {
        alert('Todos los campos son OBLIGATORIOS');
        return;
    }

    // Enviar la oferta a la API para su publicación
    nuevaOferta(oferta);

    // Mostrar una alerta indicando que la publicación fue exitosa
    alert('Publicación Exitosa');
}

// Función para obtener los campos vacíos de un objeto
function obtenerCamposVacios(objeto) {
    return Object.entries(objeto)
        .filter(([key, value]) => value === "")
        .map(([key]) => key);
}
