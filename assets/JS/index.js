// Defining the quiz questions.
let quizQuestions = [
  {
    question: "Which cocktail is created with Rum, Lime, and Mexican Coke?",
    options: ["Daquiri", "Moscow Mule", "Cuba Libre", "Caipirinha"],
    answerIndex: 2
  },
  {
    question: "Which cocktail is created with Gin, Campari, and Sweet Vermouth?",
    options: ["Alaska", "Negroni", "Boulevardier", "Sidecar"],
    answerIndex: 1
  },
  {
    question: "Which cocktail is created with Gin, Yellow Chartreuse, and Orange Bitters?",
    options: ["Manhattan", "Rob Roy", "Japanese", "Alaska"],
    answerIndex: 3
  },
  {
    question: "Which cocktail is created with Cognac, Cointreau, and Lemon Juice?",
    options: ["Sidecar", "Margarita", "Negroni", "Rob Roy"],
    answerIndex: 0
  },
  {
    question: "Which cocktail is created with Cachaça, Sugar, and Lime?",
    options: ["Daquiri", "Grasshopper", "Cuba Libre", "Caipirinha"],
    answerIndex: 3
  },
  {
    question: "Which cocktail is created with Vodka, Kahlúa, and Heavy Cream?",
    options: ["Grasshopper", "White Russian", "Old-Fashioned", "Moscow Mule"],
    answerIndex: 1
  },
  {
    question: "Which cocktail is created with Campari, Sweet Vermouth, and Bourbon?",
    options: ["Boulevardier", "Alaska", "Manhattan", "Japanese"],
    answerIndex: 0
  },
  {
    question: "Which cocktail is created with Tequila, Lime Juice, and Cointreau?",
    options: ["Daquiri", "Moscow Mule", "Margarita", "Sidecar"],
    answerIndex: 2
  },
  {
    question: "Which cocktail is created with Vodka, Lime Juice, and Ginger Beer",
    options: ["White Russian", "Rob Roy", "Japanese", "Moscow Mule"],
    answerIndex: 3
  },
  {
    question: "Which cocktail is created with Scotch, Sweet Vermouth, and Angostura Bitters?",
    options: ["Rob Roy", "Old-Fashioned", "Negroni", "Alaska"],
    answerIndex: 0
  },
  {
    question: "Which cocktail is created with Crème de Menthe, Crème de Cacao, and Heavy Cream?",
    options: ["Grasshopper", "Caipirinha", "White Russian", "Rob Roy"],
    answerIndex: 0
  },
  {
    question: "Which cocktail is created with Rye Whiskey, Sweet Vermouth, and Angostura Bitters?",
    options: ["Boulevardier", "Manhattan", "Old-Fashioned", "Sidecar"],
    answerIndex: 1
  },
  {
    question: "Which cocktail is created with Cognac, Orgeat, and Angostura Bitters?",
    options: ["Alaska", "Daquiri", "Japanese", "Sidecar"],
    answerIndex: 2
  },
  {
    question: "Which cocktail is created with White Rum, Lime Juice, and Simple Syrup?",
    options: ["Margarita", "Cuba Libre", "Caipirinha", "Daquiri"],
    answerIndex: 3
  },
  {
    question: "Which cocktail is created with Bourbon, Sugar, and Angostura Bitters?",
    options: ["Old-Fashioned", "Manhattan", "Alaska", "Negroni"],
    answerIndex: 0
  }
];

// Geting HTML elements.
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionElements = document.querySelectorAll('input[name="option"]');
const optionLabels = document.querySelectorAll('#options-container label span');
const nextButton = document.getElementById("next-button");
const startButton = document.getElementById("start-button");
const timerElement = document.getElementById("timer");
const resultContainer = document.getElementById("result-container");
const TIME_LIMIT = 150;
let timeLeft = TIME_LIMIT;
let currentQuestionIndex = 0;
let score = 0;

let intervalId;

startButton.addEventListener("click", function() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    timerElement.classList.add("timer-started");
    startQuiz();
});


function startQuiz() {
    displayQuestion();
    intervalId = setInterval(function() {
        timeLeft--;
        timerElement.textContent = `${timeLeft} seconds remaining`;
        if (timeLeft <= 0) {
          clearInterval(intervalId);
          quizContainer.style.display = "none";
          timerElement.style.display = "none";
          showResult();
        }
    }, 1000);
}

function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionLabels.forEach((optionLabel, index) => {
    optionLabel.textContent = currentQuestion.options[index];
  });
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption && parseInt(selectedOption.value) === quizQuestions[currentQuestionIndex].answerIndex) {
            score++;
        } else {
            timeLeft -= 5;
            timerElement.classList.add("timer-wrong");
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion();
            selectedOption.checked = false;
            // timerElement.classList.remove("timer-wrong");
        } else {
            clearInterval(intervalId);
            quizContainer.style.display = "none";
            timerElement.style.display = "none";
            showResult();
        }
}

function showResult() {
    const resultText = `Your score: ${score} out of ${quizQuestions.length}`;
    alert(resultText);
    timerElement.classList.remove("timer-wrong");
}

let highScore = localStorage.getItem('highScore') || 0;
if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
}
const highScoreElement = document.getElementById('highscore');
highScoreElement.textContent = `High Score: ${highScore}`;



nextButton.addEventListener("click", function() {
    nextQuestion();
});
