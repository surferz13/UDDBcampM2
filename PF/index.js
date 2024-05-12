// Bienvenido a mi script. A continuación crearé paso a paso un programa en JS y con Programación funcional, para que un usuario pueda crear una encuesta con distintas preguntas
// A su vez, las respuestas podran ser seleccionas y votadas, para que se muestre un resultado de las escogidas de manera actualizada. 
// Fase 1. Crearé funciones para iniciar el programa.
// Aqui se creará una variable para tener una nueva opción de respuesta
const crearRespuesta = (texto) => ({
    texto,
    votos: 0,
});

// Acá se creará esta variable para poder votar por alguna respuesta
const votarPorRespuesta = (respuesta) => ({
    ...respuesta,
    votos: respuesta.votos + 1,
});

// Función para crear una nueva pregunta
const crearPregunta = (texto) => ({
    texto,
    respuestas: [],
});

// Función para agregar una opción de respuesta a una pregunta
const agregarRespuestaAPregunta = (pregunta, respuesta) => ({
    ...pregunta,
    respuestas: [...pregunta.respuestas, crearRespuesta(respuesta)],
});

// Función para votar por una opción de respuesta en una pregunta
const votarEnPregunta = (pregunta, indiceRespuesta) => {
    const respuestasActualizadas = pregunta.respuestas.map((resp, index) =>
        index === indiceRespuesta ? votarPorRespuesta(resp) : resp
    );
    return {
        ...pregunta,
        respuestas: respuestasActualizadas,
    };
};

// Acá se creará esta función para generar una nueva encuesta
const crearEncuesta = (titulo) => ({
    titulo,
    preguntas: [],
});

// Función para agregar una pregunta a una encuesta
const agregarPreguntaAEncuesta = (encuesta, pregunta) => ({
    ...encuesta,
    preguntas: [...encuesta.preguntas, crearPregunta(pregunta)],
});

// Función para agregar una opción de respuesta a la última pregunta de la encuesta
const agregarRespuestaAEncuesta = (encuesta, respuesta) => {
    const ultimaPregunta = encuesta.preguntas[encuesta.preguntas.length - 1];
    if (ultimaPregunta) {
        const nuevaPregunta = agregarRespuestaAPregunta(ultimaPregunta, respuesta);
        const preguntasActualizadas = [
            ...encuesta.preguntas.slice(0, -1),
            nuevaPregunta,
        ];
        return {
            ...encuesta,
            preguntas: preguntasActualizadas,
        };
    } else {
        console.log('No hay preguntas para agregar respuestas.');
        return encuesta;
    }
};

// Función para votar en una pregunta específica de la encuesta
const votarEnEncuesta = (encuesta, indicePregunta, indiceRespuesta) => {
    if (indicePregunta >= 0 && indicePregunta < encuesta.preguntas.length) {
        const preguntasActualizadas = encuesta.preguntas.map((pregunta, index) =>
            index === indicePregunta ? votarEnPregunta(pregunta, indiceRespuesta) : pregunta
        );
        return {
            ...encuesta,
            preguntas: preguntasActualizadas,
        };
    } else {
        console.log('Pregunta inválida.');
        return encuesta;
    }
};

// Función para mostrar las opciones de respuesta de una pregunta
const mostrarRespuestasDePregunta = (pregunta) => {
    console.log(`Pregunta: ${pregunta.texto}`);
    pregunta.respuestas.forEach((respuesta, index) => {
        console.log(`${index + 1}. ${respuesta.texto}`);
    });
};

// Acá se creará la Función para mostrar los resultados de la encuesta
const mostrarResultadosDeEncuesta = (encuesta) => {
    console.log(`Resultados de la encuesta: ${encuesta.titulo}`);
    encuesta.preguntas.forEach((pregunta) => {
        console.log(`Pregunta: ${pregunta.texto}`);
        pregunta.respuestas.forEach((respuesta) => {
            console.log(`${respuesta.texto}: ${respuesta.votos} votos`);
        });
    });
};

// Ejemplo y testing de lo que hicimos
let miEncuesta = crearEncuesta('¿Qué gaseosa prefieres?');
miEncuesta = agregarPreguntaAEncuesta(miEncuesta, '¿Es Pepsi la mejor gaseosa que existe?');
miEncuesta = agregarRespuestaAEncuesta(miEncuesta, 'Sí');
miEncuesta = agregarRespuestaAEncuesta(miEncuesta, 'No');
miEncuesta = agregarRespuestaAEncuesta(miEncuesta, 'No estoy seguro');


mostrarRespuestasDePregunta(miEncuesta.preguntas[0]);


miEncuesta = votarEnEncuesta(miEncuesta, 0, 0); // Votar por la primera opción de la primera pregunta
miEncuesta = votarEnEncuesta(miEncuesta, 0, 1); // Votar por la segunda opción de la primera pregunta

// Con esto se mostrará los resultados
mostrarResultadosDeEncuesta(miEncuesta);