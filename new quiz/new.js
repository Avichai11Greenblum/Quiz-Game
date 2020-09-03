// SELECTORS
const QuizName = document.querySelector(".Quiz-name");
const questionNum = document.querySelector('.questionNum');
const questionText = document.querySelector(".question");

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

let questionList
if (localStorage.getItem("questionList") === null){
    questionList = [undefined];
    localStorage.setItem("questionList",JSON.stringify(questionList));  
} else {
    questionList = localStorage.getItem("questionList");
}



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
    DataContent.questionText = questionText.value;
    localStorage.setItem("Data", JSON.stringify(DataContent));
};


// Function for moving to the next question
function nextQuestion(e) {

    e.preventDefault(); // preventing the button from refreshing the page

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

    // Changing the displayed question number according to the value we are at
    DataContent.num += 1;
    questionNum.innerHTML = DataContent.num;
    
    // setting the values for the next item on the list
    if (questionListContent[DataContent.num] === undefined){
        DataContent.questionText = '';
        DataContent.questionIMG = '';
        DataContent.correctAnswer = '';
    } else {
        DataContent.questionText = questionListContent[DataContent.num - 1].questionText;
        DataContent.questionIMG = questionListContent[DataContent.num - 1].questionIMG;
        DataContent.correctAnswer = questionListContent[DataContent.num - 1].correctAnswer;

    }
    localStorage.setItem("Data", JSON.stringify(DataContent));
    // console.log(DataContent);

};


// Function for moving to the previous question
function prevQuestion(e) {

    e.preventDefault(); // preventing the button from refreshing the page
    
    // Bringing up the local storage
    let DataContent = JSON.parse(localStorage.getItem('Data'));
    let questionListContent = JSON.parse(localStorage.getItem('questionList'));    
    
    // preventing the user from going to a lower number then 1 and ending the function here
    if (DataContent.num === 1){
        return '';
    };

    // Changing the displayed question number according to the value we are at
    DataContent.num -= 1;
    questionNum.innerHTML = DataContent.num;

    // Setting the question text
    DataContent.questionText = questionListContent[DataContent.num - 1].questionText;
    questionText.value = DataContent.questionText;

    DataContent.questionIMG = questionListContent[DataContent.num - 1].questionIMG;
    DataContent.correctAnswer = questionListContent[DataContent.num - 1].correctAnswer;
    localStorage.setItem("Data", JSON.stringify(DataContent));


};
