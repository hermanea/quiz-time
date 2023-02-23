// Defining the quiz questions.
let quizQuestions = [
  {
    question: "",
    options: ["", "", "", ""],
    answer: ""
  },
  {
    question: "",
    options: ["", "", "", ""],
    answer: ""
  },
  {
    question: "",
    options: ["", "", "", ""],
    answer: ""
  }
];

// Geting HTML elements.
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionElements = document.getElementsByName("option");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const startButton = document.getElementById("start-button");

let currentQuestionIndex = 0;
let score = 0;

// Displaying current question with answer options.
function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionElements.forEach((optionElement, index) => {
    optionElement.value = currentQuestion.options[index];
    optionElement.textContent = currentQuestion.options[index];
    optionElement.checked = false;
  });
}

// Moving to the next question when user selects an option.
function nextQuestion() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    if (selectedOption.value === quizQuestions[currentQuestionIndex].answer) {
      score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

// Displaying user's final score.
// function displayResult() {
//   quizContainer.style.display = "none";
//   resultContainer.style.display = "block";
//   resultContainer.textContent = `Your score is ${score} out of ${quizQuestions.length}.`;
// }

// Adds event listeners to the buttons.
nextButton.addEventListener("click", nextQuestion);

// Displays the first question when the quiz is loaded
displayQuestion();