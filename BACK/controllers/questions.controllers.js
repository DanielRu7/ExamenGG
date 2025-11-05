const QUESTIONS = require("../data/questions");

const NUM_QUESTIONS_TO_SEND = 8;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generamos un índice aleatorio 'j' entre 0 e 'i'
    const j = Math.floor(Math.random() * (i + 1));
    // Intercambiamos los elementos en las posiciones 'i' y 'j'
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const startQuiz = (req, res) => {
  console.log("Acceso al /api/questions/start - Edson Leonardo");

  let shuffledQuestions = [...QUESTIONS];
  
  shuffleArray(shuffledQuestions);

  let selectedQuestions = shuffledQuestions.slice(0, NUM_QUESTIONS_TO_SEND);

  const publicQuestions = selectedQuestions.map(q => {
    
    let shuffledOptions = [...q.options];
    shuffleArray(shuffledOptions);
    
    return {
      id: q.id,
      text: q.text,
      options: shuffledOptions 
    };
  });

  console.log("Preguntas enviadas al frontend (8 aleatorias):", publicQuestions);

  res.status(200).json({
    message: "Preguntas listas. ¡Éxito!",
    questions: publicQuestions 
  });
};

// --- 2) Recibir y evaluar respuestas ---
const submitAnswers = (req, res) => {
  console.log("Acceso al /api/questions/submit - Edson Leonardo");

  // 1. Toma las respuestas enviadas por el usuario
  const userAnswers = Array.isArray(req.body.answers) ? req.body.answers : [];

  // Importante: mostrar en consola las respuestas recibidas (para evidencia)
  console.log("Respuestas recibidas del frontend:", userAnswers);

  // 2. Inicializa puntaje y arreglo de detalles
  let score = 0;
  const details = [];

  // 3. (MODIFICADO) Crear un "mapa" de respuestas correctas para calificar rápido
  // Esto es más eficiente que buscar en el array en cada iteración
  const correctAnswersMap = new Map();
  QUESTIONS.forEach(q => {
    correctAnswersMap.set(q.id, q.correct);
  });

  // 4. (MODIFICADO) Recorre las respuestas del usuario (las 8 que envió)
  // En lugar de recorrer las 16 del servidor
  for (const userAnswer of userAnswers) {
    const questionId = userAnswer.id;
    const submittedAnswer = userAnswer.answer;
    
    // 4.1) Busca la pregunta original en el banco completo
    const originalQuestion = QUESTIONS.find(q => q.id === questionId);
    
    // Si el ID no existe (raro), saltar
    if (!originalQuestion) continue; 
    
    // 4.2) Determina si es correcta
    const correctAnswer = correctAnswersMap.get(questionId);
    const isCorrect = (submittedAnswer === correctAnswer);

    // 4.3) Suma al puntaje
    if (isCorrect) score++;

    // 4.4) Agrega la información detallada
    details.push({
      id: questionId,
      text: originalQuestion.text,
      yourAnswer: submittedAnswer || null, // Mantenemos el 'null' de tu código
      correctAnswer: correctAnswer,
      correct: isCorrect
    });
  }

  // 5. Envía el resultado al cliente
  const resultado = {
    message: "Respuestas evaluadas.",
    score,
    total: NUM_QUESTIONS_TO_SEND, // <-- CAMBIO CLAVE: El total ahora es 8, no 16
    details
  };

  //  Mostrar el JSON completo que se manda al frontend (para tu PDF)
  console.log("Resultado enviado al frontend:", resultado);

  return res.status(200).json(resultado);
};

module.exports = { startQuiz, submitAnswers };