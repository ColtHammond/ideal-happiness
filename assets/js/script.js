const quizQuestions = [
  {
    question: 'What is JavaScript?',
    options: ['A programming language', 'A markup language', 'A database', 'A server-side scripting language'],
    answer: 'A programming language',
  },
  {
    question: 'What is the syntax for a single-line comment in JavaScript?',
    options: ['//', '<!--', '/*', '#'],
    answer: '//',
  },
  {
    question: 'What is the DOM?',
    options: ['A programming language', 'A database', 'A server-side scripting language', 'A way to interact with HTML and XML documents'],
    answer: 'A way to interact with HTML and XML documents',
  },
  {
    question: 'What is a variable?',
    options: [
      'A container for storing data values',
      'A loop that executes a block of code a specified number of times',
      'A function that returns a value',
      'A conditional statement that executes different actions based on different conditions',
    ],
    answer: 'A container for storing data values',
  },
  {
    question: 'What is an array?',
    options: [
      'A data structure that stores a collection of elements',
      'A loop that executes a block of code a specified number of times',
      'A function that returns a value',
      'A conditional statement that executes different actions based on different conditions',
    ],
    answer: 'A data structure that stores a collection of elements',
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerId;

const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const timerElement = document.getElementById('timer');

startButton.addEventListener('click', startQuiz);

function createAnswerButton(option) {
  const button = document.createElement('button');
  button.innerText = option;
  button.classList.add('btn');
  button.addEventListener('click', () => selectAnswer(option));
  return button;
}

function startQuiz() {
  startButton.classList.add('hide');
  quizContainer.classList.remove('hide');

  timeLeft = 60;

  timerElement.innerText = `Time Left: ${timeLeft}`;

  timerId = setInterval(updateTimer, 1000);

  currentQuestionIndex = 0;
  score = 0;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestion.options.forEach((option) => {
    const button = createAnswerButton(option);
    answerButtons.appendChild(button);
  });
}

function createAnswerButton(option) {
  const button = document.createElement('button');
  button.innerText = option;
  button.classList.add('btn');
  button.addEventListener('click', clickHandler);
  return button;
}

function clickHandler() {
  const selectedOption = this.innerText;
  selectAnswer(selectedOption);
}

function startQuiz() {
  startButton.classList.add('hide');
  quizContainer.classList.remove('hide');

  timeLeft = 60;

  timerElement.innerText = `Time Left: ${timeLeft}`;

  timerId = setInterval(updateTimer, 1000);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestion.options.forEach((option) => {
    const button = createAnswerButton(option);
    answerButtons.appendChild(button);
  });
}

function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  questionElement.innerText = currentQuestion.question;

  answerButtons.innerHTML = '';

  currentQuestion.options.forEach((option) => {
    const button = createAnswerButton(option);
    answerButtons.appendChild(button);
  });
}

function updateTimer() {
  timeLeft--;
  if (timeLeft < 0) {
    endQuiz();
  } else {
    timerElement.innerText = `Time Left: ${timeLeft}`;
  }
}

function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  questionElement.innerText = currentQuestion.question;

  answerButtons.innerHTML = '';

  currentQuestion.options.forEach((option) => {
    const button = document.createElement('button');
    button.innerText = option;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(option));
    answerButtons.appendChild(button);
  });
}

function selectAnswer(selectedOption) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    score++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerId);

  const initials = prompt('Quiz over! Enter your initials:');

  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScores.push({ initials, score });
  localStorage.setItem('highScores', JSON.stringify(highScores));

  const highScoreList = highScores.map((score) => `<li>${score.initials} - ${score.score}</li>`).join('');
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.classList.add('hide');
  const highScoresContainer = document.getElementById('high-scores-container');
  highScoresContainer.classList.remove('hide');
  const highScoresList = document.getElementById('high-scores-list');
  highScoresList.innerHTML = highScoreList;

  startButton.classList.remove('hide');

  answerButtons.querySelectorAll('button').forEach((button) => {
    button.removeEventListener('click', clickHandler);
  });
}
