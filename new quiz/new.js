// Selectors
const QuizName = document.querySelector(".Quiz-name");
const backButton = document.querySelector(".back");
const nextButton = document.querySelector(".forward");
const answer3 = document.querySelector('.answer3');
const answer4 = document.querySelector('.answer4');
const questionNum = document.querySelector('.questionNum');

// Global variables
let currentQuestion = 1;
let questionData = {
    num: currentQuestion,
    question: '',
    correctAnswer: ''
};

// Event listeners
document.addEventListener("DOMContentLoaded", updateNum);
nextButton.addEventListener("Click", nextQuestion);
// backButton.addEventListener("Click", prevQuestion);

// Functions

// A function that will show the current number of a question
function updateNum() {
    questionNum.textContent = currentQuestion;
};

function nextQuestion(){
    // currentQuestion += 1;
    console.log(currentQuestion);
}
