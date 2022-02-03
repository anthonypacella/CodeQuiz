//query selectors
var startButton = document.querySelector("#start-quiz-button");
var questionsContainer = document.querySelector("#questions-container");
var introContainer = document.querySelector("#intro-container");
var resultsContainer = document.querySelector("#results-container");
var completeContainer = document.querySelector("#complete-container");
var question = document.querySelector(".question");
var answer1 = document.querySelector("#answer-1");
var answer2 = document.querySelector("#answer-2");
var answer3 = document.querySelector("#answer-3");
var answer4 = document.querySelector("#answer-4");
var result = document.querySelector(".result");
var timeEl = document.querySelector("#timer");
var submitButton = document.querySelector("#submit-button");
var highScoreForm = document.querySelector("#highscore-form");
var highScoreContainer = document.querySelector("#highscore-container");
var highScoreList = document.querySelector("#highscore-list");
var clearButtonEl = document.querySelector("#clear-button");
var highScoreList = document.querySelector("#highscore-list");
var highScoresLink = document.querySelector("#high-scores-link");
var goBackButton = document.querySelector("#back-button");

//variables
var questionNumber = 0;
var timeLeft = 75;
var gameOver = 0;
var questionsAnswers = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: 2
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: 3  
    },
    {
        question: "The condition in an if / else statement is enclosed with:",
        answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctAnswer: 1
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: 3 
    },
    {
        question: "String values must be enclosed within ________ when being assigned variable:",
        answers: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnswer: 2
    },
]

//eventListeners
startButton.addEventListener("click", showQuestionContainer);
startButton.addEventListener("click", startTimer);
answer1.addEventListener("click", clickAnswer1);
answer2.addEventListener("click", clickAnswer2);
answer3.addEventListener("click", clickAnswer3);
answer4.addEventListener("click", clickAnswer4);
submitButton.addEventListener("click", enterInitials);
clearButtonEl.addEventListener("click", clearScores);
highScoresLink.addEventListener("click", showHighScores);
highScoresLink.addEventListener("click", printScores);
goBackButton.addEventListener("click", showIntroContainer);

//functions
function showQuestionContainer () {
    questionNumber = 0;
    introContainer.setAttribute("style","display:none");
    questionsContainer.setAttribute("style","display:block");
    highScoreContainer.setAttribute("style", "display:none");
    newQuestion();
}

function startTimer() {
    timeLeft = 75;
    var timerInterval = setInterval(timerFunction, 1000);
    timeEl.textContent = "Time: " + timeLeft;

    function timerFunction() {
        timeLeft--;
        timeEl.textContent = "Time: " + timeLeft;

        if (timeLeft === 0 || gameOver ===1) {
            clearInterval(timerInterval);
        }
    }
}

function clickAnswer1 (event) {
    checkCorrectAnswer(event);
}

function clickAnswer2 (event) {
    checkCorrectAnswer(event);
}

function clickAnswer3 (event) {
    checkCorrectAnswer(event);
}

function clickAnswer4 (event) {
    checkCorrectAnswer(event);
}

function newQuestion() {
    question.textContent = questionsAnswers[questionNumber].question;
    answer1.textContent = questionsAnswers[questionNumber].answers[0];
    answer2.textContent = questionsAnswers[questionNumber].answers[1];
    answer3.textContent = questionsAnswers[questionNumber].answers[2];
    answer4.textContent = questionsAnswers[questionNumber].answers[3];
}

function checkCorrectAnswer(event) {
    if(event.target.textContent === questionsAnswers[questionNumber].answers[questionsAnswers[questionNumber].correctAnswer])
        {
            result.textContent = "Correct!";
            resultsContainer.setAttribute("style","display:block");
            questionNumber++
            if (questionNumber < 5) {
                newQuestion();
            }
            else {
                gameOver = 1;
                resultsContainer.setAttribute("style","display:none"); 
                questionsContainer.setAttribute("style","display:none"); 
                completeContainer.setAttribute("style","display:block"); 
            }
        }
    else {
        if (questionNumber < 4) {
            questionNumber++;
            timeLeft = timeLeft - 10;
            resultsContainer.setAttribute("style","display:block");
            result.textContent = "Incorrect!"
            newQuestion();
        }
        else {
            gameOver = 1;
            resultsContainer.setAttribute("style","display:none"); 
            questionsContainer.setAttribute("style","display:none"); 
            completeContainer.setAttribute("style","display:block"); 
            timeLeft = timeLeft - 10;
        }
    }
}

function enterInitials(event) {
    event.preventDefault();
    if (highScoreForm.value === "") {
        alert("Please enter your initials");
    }
    else {
        storeHighScores();
        showHighScores();
        printScores();
    }
}

function storeHighScores() {
    var scoresList = localStorage.getItem("scoresList");
    console.log(scoresList);
        if (scoresList == null)
        {
            var scoresList = [];
            highScore = highScoreForm.value + " - " + timeLeft;
            scoresList.push(highScore);
            localStorage.setItem("scoresList", JSON.stringify(scoresList));    
            console.log(scoresList);
        }

        else {
            var scoresListString = localStorage.getItem("scoresList");
            scoresList = JSON.parse(scoresListString);
            highScore = highScoreForm.value + " - " + timeLeft;
            scoresList.push(highScore);
            localStorage.setItem("scoresList", JSON.stringify(scoresList));    
        }

}

function clearScores() {
    timeLeft = 1;
    highScoreList.innerHTML = "";
    scoreList=[];
    localStorage.clear();
}

function showHighScores() {
    timeLeft = 1;
    resultsContainer.setAttribute("style","display:none"); 
    questionsContainer.setAttribute("style","display:none"); 
    completeContainer.setAttribute("style","display:none");
    introContainer.setAttribute("style", "display:none");
    highScoreContainer.setAttribute("style", "display:block");
}

function showIntroContainer () {
    timeLeft = 75;
    timeEl.textContent = "Time: " + timeLeft;
    gameOver = 0;
    resultsContainer.setAttribute("style","display:none"); 
    questionsContainer.setAttribute("style","display:none"); 
    completeContainer.setAttribute("style","display:none");
    introContainer.setAttribute("style", "display:block");
    highScoreContainer.setAttribute("style", "display:none");
}

function printScores () {

    var scoresListString = localStorage.getItem("scoresList");
    var scoresListStored = JSON.parse(scoresListString);

    highScoreList.innerHTML = "";

    scoresListStored.forEach((item) => {

        listEl = document.createElement("li");
        listEl.textContent = item;

        highScoreList.append(listEl);

    })

}