const preguntas = [
    {
      pregunta: `¿Cómo crees que JavaScript está impactando en la sociedad y la cultura?`,
    },
    {
      pregunta: `¿Qué son las promise en JavaScript?`,
    },
    {
      pregunta: `Menciona algunos métodos de los array for javascript`,
    },
    {
      pregunta: `Diferencias entre Java y JavaScript`,
    },
    {
      pregunta: `¿Cuáles son los tipos de datos de JavaScript?`,
    },
    {
      pregunta: `¿Qué es el método Push en JavaScript?`,
    },
    {
      pregunta: `Diferencia entre “==” y “===”`,
    },
    {
      pregunta: `¿Cuál es la diferencia entre “let” y “const”?`,
    },
    {
      pregunta: `¿Qué es JavaScript?`,
    },
    {
      pregunta: `¿Cuál es la diferencia entre null y undefined?
      `,
    },
    {
      pregunta: `¿Cómo se utilizan los eventos en JavaScript?
      `,
    },
    {
      pregunta: `¿Cuál es la mayor diferencia entre var y let?`,
    },
    {
      pregunta: `¿Cómo crees que JavaScript evolucionará en el futuro?`,
    },
    {
      pregunta: `¿Qué consejo le darías a alguien que recién está empezando a aprender JavaScript?`,
    },
    {
      pregunta: `¿Qué son las buenas prácticas para escribir código JavaScript limpio y eficiente?`,
    },
    {
      pregunta: `¿Qué son los frameworks de JavaScript y cuáles son algunos de los más utilizados?`,
    },
    {
      pregunta: `¿Cómo se utilizan las librerías populares de JavaScript como jQuery o React?`,
    },
    {
      pregunta: `¿Qué es Node.js y para qué se utiliza?`,
    },
    {
      pregunta: `¿Cómo se utilizan los módulos en JavaScript para organizar el código?`,
    },
    {
      pregunta: `¿Qué son los callbacks y cómo se utilizan en JavaScript?`,
    }
  ];
  
  let preguntaActual = 0;
  
  function mostrarPregunta() {
    // obtener la pregunta actual
    const pregunta = preguntas[preguntaActual];
  
    // mostrar la pregunta
    const elementoPregunta = document.querySelector("#pregunta");
    elementoPregunta.textContent = pregunta.pregunta;
  
    // mostrar las opciones de respuesta

  }
  
  function siguientePregunta() {
    // avanzar a la siguiente pregunta
    preguntaActual++;
  
    // si no hay más preguntas, volver a la primera
    if (preguntaActual >= preguntas.length) {
      preguntaActual = 0;
    }
  
    // mostrar la pregunta actual
    mostrarPregunta();
  }
  
  function anteriorPregunta() {
    // retroceder a la pregunta anterior
    preguntaActual--;
  
    // si la pregunta actual es menor que 0, ir a la última
    if (preguntaActual < 0) {
      preguntaActual = preguntas.length - 1;
    }
  
    // mostrar la pregunta actual
    mostrarPregunta();
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    // mostrar la primera pregunta
    mostrarPregunta();
  
    // eventos de los botones
    document.querySelector("#siguiente").addEventListener("click", siguientePregunta);
    document.querySelector("#anterior").addEventListener("click", anteriorPregunta);
  });
  