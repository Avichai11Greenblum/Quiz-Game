// SELECTORS
const QuizName = document.querySelector(".Quiz-name");
const questionNum = document.querySelector('.questionNum');
const questionInput = document.querySelector(".question");

const saveButton = document.querySelector(".save");
const backButton = document.querySelector(".back");
const nextButton = document.querySelector(".forward");


// GLOBAL VARIABLES
let questionData = {
    num: '',
    questionText: '',
    questionIMG: '',
    correctAnswer: ''
};
// A check to see if Data doesn't exists in local  
if (localStorage.getItem('Data') === null) {
    questionData.num = 1;
    localStorage.setItem("Data", JSON.stringify(questionData));
};


// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", setNum);
// document.addEventListener("change", updateData);
nextButton.addEventListener("click", nextQuestion);
backButton.addEventListener("click", prevQuestion);
// saveButton.addEventListener("click", saveQuestion);


// FUNCTIONS

// A function that will show the current number of a question
function setNum() {
    const Data = JSON.parse(localStorage.getItem('Data'));
    questionNum.innerHTML = Data.num;
};


function nextQuestion() {
    const DataContent = JSON.parse(localStorage.getItem('Data'));
    DataContent.num += 1;
    localStorage.setItem("Data", JSON.stringify(DataContent));
}


function prevQuestion() {
    const DataContent = JSON.parse(localStorage.getItem('Data'));
    DataContent.num -= 1;
    localStorage.setItem("Data", JSON.stringify(DataContent));
}
