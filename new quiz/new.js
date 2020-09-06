                // SELECTORS
const QuizName = document.querySelector(".Quiz-name");
const questionNum = document.querySelector('.questionNum');
const questionText = document.querySelector(".question");

const saveButton = document.querySelector(".save");
const backButton = document.querySelector(".back");
const nextButton = document.querySelector(".forward");

const radioButton1 = document.querySelector(".radio1");
const radioButton2 = document.querySelector(".radio2");
const radioButton3 = document.querySelector(".radio3");
const radioButton4 = document.querySelector(".radio4");

               // GLOBAL VARIABLES
let questionData = {
    num: '',
    questionText: '',
    questionIMG: '',
    correctAnswer: ''
};

// A check to see if Data doesn't exists in local and if not so create it
if (localStorage.getItem('Data') === null) {
    questionData.num = 1;
    localStorage.setItem("Data", JSON.stringify(questionData));
};

// Same check for concept for questionList 
let questionList
if (localStorage.getItem("questionList") === null){
    questionList = [undefined];
    localStorage.setItem("questionList",JSON.stringify(questionList));  
} else {
    questionList = localStorage.getItem("questionList");
}

// Making the space for the Quiz name in local storage
if (localStorage.getItem("QuizNAme") === "") {
    localStorage.setItem("QuizName",JSON.stringify(""));
};

                // EVENT LISTENERS

document.addEventListener("DOMContentLoaded", setInfo);
document.addEventListener("change", updateData);

nextButton.addEventListener("click", nextQuestion);
backButton.addEventListener("click", prevQuestion);

radioButton1.addEventListener("click", correctFunction);
radioButton2.addEventListener("click", correctFunction);
radioButton3.addEventListener("click", correctFunction);
radioButton4.addEventListener("click", correctFunction);


                // FUNCTIONS

// A function that will show the current number of a question
function setInfo() {
    const QuizName_storage = JSON.parse(localStorage.getItem('QuizName'));
    const DataContent = JSON.parse(localStorage.getItem('Data'));

    QuizName.value = QuizName_storage;
    questionNum.innerHTML = DataContent.num;
    questionText.value = DataContent.questionText;
};


// A function that save the question text to Data.questionText
function updateData() {
    const DataContent = JSON.parse(localStorage.getItem('Data'));
    const QuizName_storage = QuizName.value;

    DataContent.questionText = questionText.value;

    localStorage.setItem("QuizName",JSON.stringify(QuizName_storage));
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

        // UI change
        questionText.value = DataContent.questionText;

    } else {
        DataContent.questionText = questionListContent[DataContent.num - 1].questionText;
        DataContent.questionIMG = questionListContent[DataContent.num - 1].questionIMG;
        DataContent.correctAnswer = questionListContent[DataContent.num - 1].correctAnswer;   

        // UI change
        questionText.value = DataContent.questionText;
    };

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

    // console.log(DataContent);
};


function correctFunction() {

    // Bringing up the local storage
    let DataContent = JSON.parse(localStorage.getItem('Data'));
    let questionListContent = JSON.parse(localStorage.getItem('questionList'));

    if (radioButton1.checked) {
        DataContent.correctAnswer = 1;

    } else if (radioButton2.checked){
        DataContent.correctAnswer = 2;

    } else if (radioButton3.checked){
        DataContent.correctAnswer = 3;

    } else if (radioButton4.checked){
        DataContent.correctAnswer = 4;
    }
    
    localStorage.setItem("Data", JSON.stringify(DataContent));
    
};
