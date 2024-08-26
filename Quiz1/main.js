//index based answer
const quizData = [
  {
      question: "¿Cuál es la capital de Francia?",
      options: ["Madrid", "Londres", "París", "Roma"],
      correctAnswer: 2 // Índice de la respuesta correcta (París)
  },
  {
      question: "¿Cuál es el elemento químico con el símbolo 'O'?",
      options: ["Oxígeno", "Oro", "Osmio", "Oganesón"],
      correctAnswer: 0 // Índice de la respuesta correcta (Oxígeno)
  },
  {
      question: "¿Qué planeta es conocido como el planeta rojo?",
      options: ["Tierra", "Venus", "Marte", "Júpiter"],
      correctAnswer: 2 // Índice de la respuesta correcta (Marte)
  },
  {
      question: "¿En qué año llegó el hombre a la Luna?",
      options: ["1965", "1969", "1972", "1980"],
      correctAnswer: 1 // Índice de la respuesta correcta (1969)
  },
  {
      question: "¿Quién escribió 'Don Quijote de la Mancha'?",
      options: ["Miguel de Cervantes", "William Shakespeare", "Gabriel García Márquez", "Pablo Neruda"],
      correctAnswer: 0 // Índice de la respuesta correcta (Miguel de Cervantes)
  },
  {
      question: "¿Cuál es el océano más grande del mundo?",
      options: ["Atlántico", "Índico", "Pacífico", "Ártico"],
      correctAnswer: 2 // Índice de la respuesta correcta (Pacífico)
  },
  {
      question: "¿Qué instrumento mide la presión atmosférica?",
      options: ["Termómetro", "Higrómetro", "Barómetro", "Anemómetro"],
      correctAnswer: 2 // Índice de la respuesta correcta (Barómetro)
  },
  {
      question: "¿Qué país es famoso por la Torre Eiffel?",
      options: ["Italia", "Francia", "Reino Unido", "Alemania"],
      correctAnswer: 1 // Índice de la respuesta correcta (Francia)
  },
  {
      question: "¿Cuál es el animal terrestre más rápido?",
      options: ["León", "Tigre", "Guepardo", "Caballo"],
      correctAnswer: 2 // Índice de la respuesta correcta (Guepardo)
  },
  {
      question: "¿Quién pintó la Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Rembrandt"],
      correctAnswer: 2 // Índice de la respuesta correcta (Leonardo da Vinci)
  }
];

let currentQuestionIndex = 0;
let box = document.getElementById('box')
let btn = document.getElementById('next')
let h1Final = document.getElementById('final')

let htmlAnswers = [];

function displayInfo() {
    if(currentQuestionIndex === 10){
        let puntaje = htmlAnswers.reduce((acc,curr) => acc + curr.punto ,0)
        h1Final.innerText = `Examen finalizado - Puntaje total: ${puntaje}`
        btn.disabled = true;
        btn.innerText = 'Examen finalizado'

        /* El error
        es que despliega todas las preguntas sin haber
        guardado el "VALUE ESCOGIDO" 
        y de alguna manera realizar un CSS 
        para indicar cual era el correcto
        y error si hubo uno*/
        let finalHTML = htmlAnswers.map(i => i.htmlText).join(" ")
        box.innerHTML = finalHTML;
        return
    }

    const {question, options} = quizData[currentQuestionIndex];

    let h1 = document.createElement('h1')
    h1.innerText = `Pregunta ${currentQuestionIndex + 1}: ` + question;
    //console.log(h1)

    let inputRadios = options.map((i,index) => {
        return `
            <input type="radio" name="options" id="option${index+1}" value="${i}">
            <label for="option${index+1}">${i}</label> <br>`
    }).join(" ")

    // Limpiar el contenido anterior del form
    box.innerHTML = '';

    // Añadir el h1 al form
    box.appendChild(h1);

    // Insertar los input radios como HTML
    box.insertAdjacentHTML('beforeend', inputRadios);

    btn.addEventListener('click', getSelectedValue)
}

function getSelectedValue() {
    const selectedOption = document.querySelector("input[name='options']:checked")

    if(selectedOption){
        const {options, correctAnswer} = quizData[currentQuestionIndex];
        let punto = 0;
        if(options[correctAnswer] === selectedOption.value) punto = 1;
        let obj = {
            htmlText: box.innerHTML,
            selectedOption: selectedOption.value,
            correctAnswer: options[correctAnswer],
            punto
        }
        htmlAnswers.push(obj)
        currentQuestionIndex++;
        displayInfo();
        console.log(htmlAnswers)
    }
}
displayInfo();