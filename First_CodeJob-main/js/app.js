document.addEventListener("DOMContentLoaded", () => {
    showpatrocinadores(patrocinadores);   
})

function showpatrocinadores(patrocinadores){
    const contenedor = document.querySelector('#box_container_companies');
    patrocinadores.forEach((patrocinadores) =>{
        const patrocinadoresHtml = document.createElement('div');
        patrocinadoresHtml.innerHTML=
        `<div class="company_boxes "  >
        <img class= image_companies src="${patrocinadores.imagenUrl}"  alt="...">
        
       
      </div>`;
      contenedor.appendChild(patrocinadoresHtml)
    })

}
















