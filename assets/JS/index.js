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
const highscoreContainer = document.getElementById("highscore-form-container");

const TIME_LIMIT = 100;
let timeLeft = TIME_LIMIT;
let currentQuestionIndex = 0;
let score = 0;
let intervalId;

// Adding event listener that begins the quiz, removes the start quiz button, adds the quiz container, and begins the countdown.
startButton.addEventListener("click", function() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    timerElement.classList.add('timer-new');
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

// Displays the questions with options contained in the quizQuestions array.
function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionLabels.forEach((optionLabel, index) => {
    optionLabel.textContent = currentQuestion.options[index];
  });
}

// Displays the next questions with options. If a user gets the correct answer, 1 is added to their score, if it is incorrect, 5 seconds are deducted from the timer.
function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption && parseInt(selectedOption.value) === quizQuestions[currentQuestionIndex].answerIndex) {
            score++;
        } else {
            timeLeft -= 5;
        }
        sessionStorage.setItem('score', score);
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion();
            selectedOption.checked = false;
        } else {
            clearInterval(intervalId);
            quizContainer.style.display = "none";
            timerElement.style.display = "none";
            showResult();
        }
}

// Displays the user's final score in an alert. Removes the quiz container and adds the high score container.
function showResult() {
    const resultText = `Your score: ${score} out of ${quizQuestions.length}`;
    alert(resultText);
    startButton.style.display = "none";
    quizContainer.style.display = "none";
    highscoreContainer.style.display = "block";
}

// Allows the user to input and save intials which are then displayed in the header after clicking the save score button.
const saveScoreForm = document.getElementById('save-score-form');
const initialsInput = document.getElementById('initials');
const highScoreElement = document.getElementById('highscore-value');
const saveButton = document.getElementById("save-button");

saveButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    let highestScore = parseInt(localStorage.getItem('highestScore')) || 0;
    let currentScore = parseInt(sessionStorage.getItem('score')) || 0;
    let initials = initialsInput.value.trim();

    if (initials && currentScore > highestScore) {
        highestScore = currentScore;
        console.log('Setting highestScore in localStorage to', highestScore);
        localStorage.setItem('highestScore', highestScore);
        highScoreElement.textContent = `${initials} - ${highestScore}`;
    }

    initialsInput.value = '';
});

// Calls the nextQuestion function when clicking the next questions button.
nextButton.addEventListener("click", function() {
    nextQuestion();
});
