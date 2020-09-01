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


let questionList = {};
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


function updateData() {
    const DataContent = JSON.parse(localStorage.getItem('Data'));
    DataContent.questionText = questionInput.value;
    localStorage.setItem("Data", JSON.stringify(DataContent));
};



        //  i was in the middle of making the next button save the object of data as one of 
        //  the values in the object of questionList all in local Storage. 

        !!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Function for moving to the next question
function nextQuestion() {
    const DataContent = JSON.parse(localStorage.getItem('Data'));
    const questionListContent = JSON.parse(localStorage.getItem('questionList'));


    localStorage.setItem("questionList", JSON.stringify(questionListContent));

    DataContent.num += 1;
    localStorage.setItem("Data", JSON.stringify(DataContent));


};


// Function for moving to the previous question
function prevQuestion() {
    const DataContent = JSON.parse(localStorage.getItem('Data'));
    DataContent.num -= 1;
    localStorage.setItem("Data", JSON.stringify(DataContent));
};
