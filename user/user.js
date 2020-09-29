
// SELECTORS

const homeButton = document.querySelector(".back-home");
const quizNameGUI = document.querySelector(".quiz-name");
const questionNumGUI = document.querySelector(".questionNum");


// EVENT LISTENERS

homeButton.addEventListener("click", goHome);
document.addEventListener("DOMContentLoaded", setQuiz)

// FUNCTIONS

function goHome(e) {
    e.preventDefault();
    window.location.href = "../made quizzes/made.html";
}

function setQuiz() {
    // Bringing up local storage as variables
    const quiz_name = JSON.parse(localStorage.getItem("QuizName"));

    // Setting the quiz name
    quizNameGUI.innerText = quiz_name;

};