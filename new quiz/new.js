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


let questionList = ['$'];
localStorage.setItem("questionList",JSON.stringify(questionList));
    


// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", setInfo);
document.addEventListener("change", updateData);
nextButton.addEventListener("click", nextQuestion);
backButton.addEventListener("click", prevQuestion);
// saveButton.addEventListener("click", saveQuestion);


// FUNCTIONS

// A function that will show the current number of a question
function setInfo() {
    const DataContent = JSON.parse(localStorage.getItem('Data'));
    questionNum.innerHTML = DataContent.num;
};


// A function that save the question text to Data.questionText
function updateData() {
    const DataContent = JSON.parse(localStorage.getItem('Data'));
    DataContent.questionText = questionInput.value;
    localStorage.setItem("Data", JSON.stringify(DataContent));
};


// Function for moving to the next question
function nextQuestion(e) {

    e.preventDefault();

    // Bringing up the local storage
    let DataContent = JSON.parse(localStorage.getItem('Data'));
    let questionListContent = JSON.parse(localStorage.getItem('questionList'));
    
    
    // Setting the data according to the question number
    if (questionListContent[(DataContent.num - 1)] === undefined){
        questionListContent.push(DataContent);
        localStorage.setItem("questionList", JSON.stringify(questionListContent));
    } else {
        questionListContent[(DataContent.num - 1)] =  DataContent;
        localStorage.setItem("questionList", JSON.stringify(questionListContent));
    };

    questionInput.value = '';
    DataContent.num += 1;
    
    // if (questionListContent[DataContent.num - 1] === null){
    //     DataContent.questionText = '';
    //     DataContent.questionIMG = '';
    //     DataContent.correctAnswer = '';
    // } else {
    //     DataContent.questionText = questionListContent[DataContent.num].questionText;
    //     DataContent.questionIMG = questionListContent[DataContent.num].questionIMG;
    //     DataContent.correctAnswer = questionListContent[DataContent.num].correctAnswer;
    // }
    localStorage.setItem("Data", JSON.stringify(DataContent));


};


// Function for moving to the previous question
function prevQuestion() {
    const DataContent = JSON.parse(localStorage.getItem('Data'));
    DataContent.num -= 1;
    localStorage.setItem("Data", JSON.stringify(DataContent));
};
