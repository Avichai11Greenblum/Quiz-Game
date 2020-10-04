
// SELECTORS

const homeButton = document.querySelector(".back-home");

const quizNameGUI = document.querySelector(".quiz-name");
const questionNumGUI = document.querySelector(".questionNum");

const GUIImage = document.getElementById("the-picture");
const GUIText = document.querySelector(".text");

const answer1 = document.querySelector(".answer1");
const answer2 = document.querySelector(".answer2");
const answer3 = document.querySelector(".answer3");
const answer4 = document.querySelector(".answer4");

// EVENT LISTENERS

homeButton.addEventListener("click", goHome);
document.addEventListener("DOMContentLoaded", setQuiz)

// FUNCTIONS

function goHome(e) {
    e.preventDefault();
    
    //clearing local and moving back to home screen
    localStorage.removeItem("QuizName");
    localStorage.removeItem("Data");
    localStorage.removeItem("questionList");

    window.location.href = "../Home page/Home.html";
}

function setQuiz() {
    // Bringing up local storage as variables
    const quiz_name = localStorage.getItem("QuizName");
    const questionList = JSON.parse(localStorage.getItem("questionList"));

    // Setting the quiz name
    quizNameGUI.innerText = quiz_name;

    // setting first question

    // Question number
    questionNumGUI.innerText = 1;
    // Question Text
    GUIText.innerText = questionList[0][0].questionText;
    // Question answers
    answer1.innerText = questionList[0][0].answersBank.first;
    answer2.innerText = questionList[0][0].answersBank.second;
    answer3.innerText = questionList[0][0].answersBank.third;
    answer4.innerText = questionList[0][0].answersBank.fourth;
    // Question Image
    GUIImage.setAttribute("src", questionList[0][0].questionIMG); 
};
