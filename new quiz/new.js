// Selectors
const QuizName = document.querySelector(".Quiz-name");
const questionInput = document.querySelector(".question");
const saveButton = document.querySelector(".save");
const backButton = document.querySelector(".back");
const nextButton = document.querySelector(".forward");
const questionNum = document.querySelector('.questionNum');

// Global variables
let currentQuestion = 1;
let questionData = {
    num: currentQuestion,
    questionText: '',
    correctAnswer: ''
};


// Event listeners
document.addEventListener("DOMContentLoaded", updateNum);
nextButton.addEventListener("click", nextQuestion);
// backButton.addEventListener("click", prevQuestion);
saveButton.addEventListener("click", saveQuestion);

// Functions

// A function that will show the current number of a question
function updateNum() {
    questionNum.textContent = currentQuestion;
};

function nextQuestion(event){
    event.preventDefault();
    // currentQuestion += 1;
}

// A function that will save the user's progress at local storage
function saveQuestion(event) {
    let questions;


    // if (localStorage.getItem('questions') === null) {
    //     // if we don't have any previous questions we will create a new list that will contain the questions
    //     questions = [];
    // } else {
    //     // if we do have previous tasks we will use them as "questions"
    //     questions = JSON.parse(localStorage.getItem("questions"));    
    // }
    
    // // adding the new question data mission to the list
    // questions.push(newMission);

    // // setting the new question variable in the local storage
    // localStorage.setItem("questions", JSON.stringify(questions));
}
