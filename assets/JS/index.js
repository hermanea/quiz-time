// Defining the quiz questions.
let quizQuestions = [
  {
    question: "Which cocktail is created with Rum, Lime, and Mexican Coke?",
    options: ["Daquiri", "Moscow Mule", "Cuba Libre", "Caipirinha"],
    answer: "Cuba Libre"
  },
  {
    question: "Which cocktail is created with Gin, Campari, and Sweet Vermouth?",
    options: ["Alaska", "Negroni", "Boulevardier", "Sidecar"],
    answer: "Negroni"
  },
  {
    question: "Which cocktail is created with Gin, Yellow Chartreuse, and Orange Bitters?",
    options: ["Manhattan", "Rob Roy", "Japanese", "Alaska"],
    answer: "Alaska"
  },
  {
    question: "Which cocktail is created with Cognac, Cointreau, and Lemon Juice?",
    options: ["Sidecar", "Margarita", "Negroni", "Rob Roy"],
    answer: "Sidecar"
  },
  {
    question: "Which cocktail is created with Cachaça, Sugar, and Lime?",
    options: ["Daquiri", "Grasshopper", "Cuba Libre", "Caipirinha"],
    answer: "Caipirinha"
  },
  {
    question: "Which cocktail is created with Vodka, Kahlúa, and Heavy Cream?",
    options: ["Grasshopper", "White Russian", "Old-Fashioned", "Moscow Mule"],
    answer: "White Russian"
  },
  {
    question: "Which cocktail is created with Campari, Sweet Vermouth, and Bourbon?",
    options: ["Boulevardier", "Alaska", "Manhattan", "Japanese"],
    answer: "Boulevardier"
  },
  {
    question: "Which cocktail is created with Tequila, Lime Juice, and Cointreau?",
    options: ["Daquiri", "Moscow Mule", "Margarita", "Sidecar"],
    answer: "Margarita"
  },
  {
    question: "Which cocktail is created with Vodka, Lime Juice, and Ginger Beer",
    options: ["White Russian", "Rob Roy", "Japanese", "Moscow Mule"],
    answer: "Moscow Mule"
  },
  {
    question: "Which cocktail is created with Scotch, Sweet Vermouth, and Angostura Bitters?",
    options: ["Rob Roy", "Old-Fashioned", "Negroni", "Alaska"],
    answer: "Rob Roy"
  },
  {
    question: "Which cocktail is created with Crème de Menthe, Crème de Cacao, and Heavy Cream?",
    options: ["Grasshopper", "Caipirinha", "White Russian", "Rob Roy"],
    answer: "Grasshopper"
  },
  {
    question: "Which cocktail is created with Rye Whiskey, Sweet Vermouth, and Angostura Bitters?",
    options: ["Boulevardier", "Manhattan", "Old-Fashioned", "Sidecar"],
    answer: "Manhattan"
  },
  {
    question: "Which cocktail is created with Cognac, Orgeat, and Angostura Bitters?",
    options: ["Alaska", "Daquiri", "Japanese", "Sidecar"],
    answer: "Japanese"
  },
  {
    question: "Which cocktail is created with White Rum, Lime Juice, and Simple Syrup?",
    options: ["Margarita", "Cuba Libre", "Caipirinha", "Daquiri"],
    answer: "Daquiri"
  },
  {
    question: "Which cocktail is created with Bourbon, Sugar, and Angostura Bitters?",
    options: ["Old-Fashioned", "Manhattan", "Alaska", "Negroni"],
    answer: "Old-Fashioned"
  }
];

// Geting HTML elements.
// const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionElements = document.querySelectorAll('input[name="option"]');
const optionLabels = document.querySelectorAll('#options-container label span');
const nextButton = document.getElementById("next-button");
// const resultContainer = document.getElementById("result-container");
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");

startButton.addEventListener("click", function() {
    startButton.style.disaply = "none";
    quizContainer.style.display = "block";
});

let currentQuestionIndex = 0;
let score = 0;

// Displaying current question with answer options.
function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionLabels.forEach((optionLabel, index) => {
    optionLabel.textContent = currentQuestion.options[index];
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
  optionElements.forEach((optionElement) => {
    optionElement.checked = false;
  });
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