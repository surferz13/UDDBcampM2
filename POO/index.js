// Bienvenido a mi script. A continuación crearé paso a paso un programa en JS y con POO, para que un usuario pueda crear una encuesta con distintas preguntas
// A su vez, las respuestas podran ser seleccionas y votadas, para que se muestre un resultado de las escogidas de manera actualizada. 
// Fase 1. Acá se Definirá las clases que se utilizarán. 

//Definiré la clase para las respuestas
class Respuesta {
    constructor(texto) {
        this.texto = texto;
        this.votos = 0;
    }

    votar() {
        this.votos++;
    }
}

// Definiré la clase para la pregunta
class Pregunta {
    constructor(texto) {
        this.texto = texto;
        this.respuestas = [];
    }

    // Acá se habilita la posibilidad de agregar una opción de respuesta a la pregunta
    agregarRespuesta(respuesta) {
        this.respuestas.push(new Respuesta(respuesta));
    }

    // Con esto se muestran las respuestas
    mostrarRespuestas() {
        console.log(`Pregunta: ${this.texto}`);
        for (let i = 0; i < this.respuestas.length; i++) {
            console.log(`${i + 1}. ${this.respuestas[i].texto}`);
        }
    }

    // Acá se agrega la forma para votar por alguna respuesta
    votar(indice) {
        if (indice >= 0 && indice < this.respuestas.length) {
            this.respuestas[indice].votar();
        } else {
            console.log('Opción de respuesta inválida.');
        }
    }

    // Aquí con esto se va a mostrar el resultado de los votos
    mostrarResultados() {
        console.log(`Resultados de la pregunta: ${this.texto}`);
        for (let respuesta of this.respuestas) {
            console.log(`${respuesta.texto}: ${respuesta.votos} votos`);
        }
    }
}

// Fase 2. Habilitar la creación de encuesta
class Encuesta {
    constructor(titulo) {
        this.titulo = titulo;
        this.preguntas = [];
    }

    // Parar agregar las preguntas =)
    agregarPregunta(pregunta) {
        this.preguntas.push(new Pregunta(pregunta));
    }

    // Para agregar las respuestas a la pregunta que el usuario está creando
    agregarRespuesta(respuesta) {
        if (this.preguntas.length > 0) {
            this.preguntas[this.preguntas.length - 1].agregarRespuesta(respuesta);
        } else {
            console.log('No hay preguntas para agregar respuestas.');
        }
    }

    // Acá para votar en una pregunta específica
    votar(indicePregunta, indiceRespuesta) {
        if (indicePregunta >= 0 && indicePregunta < this.preguntas.length) {
            this.preguntas[indicePregunta].votar(indiceRespuesta);
        } else {
            console.log('Pregunta inválida.');
        }
    }

    // Para mostrar los resultados de la encuesta
    mostrarResultados() {
        console.log(`Resultados de la encuesta: ${this.titulo}`);
        for (let pregunta of this.preguntas) {
            pregunta.mostrarResultados();
        }
    }
}

// Ejemplo y testing de lo que se hizo
const miEncuesta = new Encuesta('¿Que hamburguesas son mejores?');
miEncuesta.agregarPregunta('¿Cuál hamburguesa prefieres tu?');
miEncuesta.agregarRespuesta('Mcdonalds');
miEncuesta.agregarRespuesta('Burger King');
miEncuesta.agregarRespuesta('Otra');


miEncuesta.preguntas[0].mostrarRespuestas();

miEncuesta.votar(1, 0, 0); // Votar por la primera opción de la primera pregunta
miEncuesta.votar(0, 1, 0); // Votar por la segunda opción de la primera pregunta

miEncuesta.mostrarResultados();