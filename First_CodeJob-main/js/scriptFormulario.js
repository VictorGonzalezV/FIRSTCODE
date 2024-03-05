// Esta función se encarga de calcular el resultado de un cuestionario basado en las respuestas seleccionadas por el usuario.
function calcularResultado() {
  // Objeto que contiene las respuestas correctas junto con su retroalimentación.
  const respuestasCorrectas = {
    q1: { respuesta: 'b', retroalimentacion: '1. Correcto. "String" es un tipo de dato primitivo.' },
    q2: { respuesta: 'a', retroalimentacion: '2. Correcto. La declaración correcta de una variable con "let" es let x = 10;' },
    q3: { respuesta: 'c', retroalimentacion: '3. Correcto. La suma de un número y una cadena en JavaScript concatena la cadena.' },
    q4: { respuesta: 'a', retroalimentacion: '4. Correcto. "//" se utiliza para comentarios de una sola línea.' },
    q5: { respuesta: 'b', retroalimentacion: '5. Correcto. "&&" es el operador lógico AND en JavaScript.' },
    q6: { respuesta: 'a', retroalimentacion: '6. Correcto. El método "push()" se utiliza para agregar elementos al final de un array.' },
    q7: { respuesta: 'b', retroalimentacion: '7. Correcto. El resultado de typeof null es "object".' },
    q8: { respuesta: 'b', retroalimentacion: '8. Correcto. JSON.parse() se utiliza para convertir una cadena JSON a un objeto.' },
    q9: { respuesta: 'a', retroalimentacion: '9. Correcto. Una variable declarada con "var" tiene alcance global.' },
    q10: { respuesta: 'b', retroalimentacion: '10. Correcto. event.stopPropagation() se utiliza para detener la propagación de eventos.' },
    q11: { respuesta: 'c', retroalimentacion: '11. Correcto. innerHTML() se utiliza para cambiar el contenido HTML de un elemento.' },
    q12: { respuesta: 'c', retroalimentacion: '12. Correcto. La suma de un número y una cadena en JavaScript concatena la cadena.' },
  };

  // Inicialización de contadores.
  let respuestasCorrectasCount = 0;
  let respuestasIncorrectas = 0;

  // Elemento HTML donde se mostrará la retroalimentación.
  const retroalimentacionContainer = document.getElementById('retroalimentacion');
  retroalimentacionContainer.innerHTML = ''; // Limpiar el contenido existente

  // Iteración sobre las preguntas del cuestionario.
  for (let i = 1; i <= 12; i++) {
    const preguntaName = 'q' + i;
    const opciones = document.getElementsByName(preguntaName);
    const respuestaSeleccionada = Array.from(opciones).find(opcion => opcion.checked)?.value;

    const retroalimentacionDiv = document.createElement('div');
    const insertarLogro = document.querySelector('.logro');

    // Comprobación de si la respuesta seleccionada es correcta.
    if (respuestaSeleccionada === respuestasCorrectas[preguntaName].respuesta) {
      respuestasCorrectasCount++;

      // Si todas las respuestas son correctas, se muestra un mensaje de logro.
      if (respuestasCorrectasCount == 12) {
        const logro = `Lo has conseguido, sigue sumando logros para destacarte en tu perfil!`;
        insertarLogro.innerHTML = `<p>${logro}</p><br><br> <center><img src="/img/exito.png"></center>`;
        const resultContainer = document.getElementById('result');
        resultContainer.textContent = `Todas tus respuestas son correctas!! ${respuestasCorrectasCount} de 12`;
      } else {
        // Si no todas las respuestas son correctas, se muestra un mensaje de progreso.
        const logro = `No lo has conseguido, corrige las incorrectas y vuelve`;
        insertarLogro.innerHTML = `<br><br><br><p style="font-size: 40px">${logro}</p><br><br> <center><img src="/img/fracaso.png"></center>`;
        const resultContainer = document.getElementById('result');
        resultContainer.textContent = `Aun te falta, llevas: ${respuestasCorrectasCount} de 12 respuestas correctas.`;
      }
      retroalimentacionDiv.innerHTML = `<p>${respuestasCorrectas[preguntaName].retroalimentacion}</p>`;
    } else {
      // Si la respuesta seleccionada es incorrecta, se muestra un mensaje de retroalimentación.
      const logro = `No lo has conseguido, corrige las incorrectas y vuelve`;
      insertarLogro.innerHTML = `<br><br><br><p style="font-size: 40px">${logro}</p><br><br> <center><img src="/img/fracaso.png"></center>`;
      const resultContainer = document.getElementById('result');
      resultContainer.textContent = `Aun te falta, llevas: ${respuestasCorrectasCount} de 12 respuestas correctas.`;

      respuestasIncorrectas++;
      const retroalimentacion = `La respuesta número ${respuestasIncorrectas} es incorrecta. Corrígela.`;
      retroalimentacionDiv.innerHTML = `<p>${retroalimentacion}</p><br>`;
    }
    // Agregar la retroalimentación al contenedor HTML.
    retroalimentacionContainer.appendChild(retroalimentacionDiv);
  }
}

