// Esta función abre un modal que muestra un PDF en un iframe.
// Toma la URL del PDF y el contenedor en el que se encuentra.
function openModal(pdfUrl, container) {
    // Obtiene referencias a los elementos del modal y del iframe.
    let modal = document.getElementById('pdfModal');
    let pdfFrame = document.getElementById('pdfFrame');
    let modalContent = document.getElementById('modalContent');

    // Establece el tamaño del modal y del iframe.
    modal.style.width = '90%';
    modal.style.height = '90%';
    pdfFrame.style.width = '100%';
    pdfFrame.style.height = '100%';

    // Establece la URL del PDF en el iframe.
    pdfFrame.src = pdfUrl;
    
    // Aplica una animación de fadeIn al contenido del modal.
    modalContent.style.animation = 'fadeIn 0.5s';
    
    // Hace visible el modal.
    modal.style.display = 'flex';

    // Agrega una clase al contenedor para indicar que se ha hecho clic en el PDF.
    container.classList.add('pdf-clicked');
}

// Esta función cierra el modal que muestra el PDF.
function closeModal() {
    // Obtiene referencias al modal y al contenido del modal.
    let modal = document.getElementById('pdfModal');
    let modalContent = document.getElementById('modalContent');

    // Aplica una animación de fadeOut al contenido del modal.
    modalContent.style.animation = 'fadeOut 0.5s';
    
    // Establece un temporizador para ocultar el modal después de que se complete la animación.
    setTimeout(function () {
        modal.style.display = 'none';
    }, 500); // Espera 500 milisegundos (0.5 segundos) antes de ocultar el modal.
}












