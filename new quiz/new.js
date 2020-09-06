                // SELECTORS

const GUIQuizName = document.querySelector(".Quiz-name");
const GUIQuestionNum = document.querySelector('.questionNum');
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

// A function that will show the current info of a question when the user gets inside the website
function setInfo() {
    const QuizName_storage = JSON.parse(localStorage.getItem('QuizName'));
    const DataContent = JSON.parse(localStorage.getItem('Data'));

    GUIQuizName.value = QuizName_storage;
    GUIQuestionNum.innerHTML = DataContent.num;
    questionText.value = DataContent.questionText;
};


// A function that save the question text to Data.questionText
function updateData() {
    const DataContent = JSON.parse(localStorage.getItem('Data'));
    const QuizName_storage = GUIQuizName.value;

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

    // If the next question doesn't have values it will be blank
    if (questionListContent[(DataContent.num - 1)] === undefined){
        questionListContent.push(DataContent);
        localStorage.setItem("questionList", JSON.stringify(questionListContent));

    } else { // If the next question has values load them up from local storage 
        questionListContent[(DataContent.num - 1)] =  DataContent;
        localStorage.setItem("questionList", JSON.stringify(questionListContent));
    };

    // Changing the displayed question number according to the value we are at
    DataContent.num += 1;
    GUIQuestionNum.innerHTML = DataContent.num;
    
    // setting the values for the next item on the list:

    // If the next question doesn't have any saved values at all so we will make "Data"(local storage) be blank and it will be
    // filled ny the user.
    if (questionListContent[DataContent.num] === undefined){
        DataContent.questionText = '';
        DataContent.questionIMG = '';
        DataContent.correctAnswer = '';

        // UI change
        questionText.value = DataContent.questionText;

      // If the next question does have saved values so we will set them on the values of "Data"(local storage)
    } else { 
        DataContent.questionText = questionListContent[DataContent.num - 1].questionText;
        DataContent.questionIMG = questionListContent[DataContent.num - 1].questionIMG;
        DataContent.correctAnswer = questionListContent[DataContent.num - 1].correctAnswer;   

        // UI change
        questionText.value = DataContent.questionText;
    };

    localStorage.setItem("Data", JSON.stringify(DataContent));
};


// Function for moving to the previous question
function prevQuestion(e) {
    e.preventDefault(); // preventing the button from refreshing the page
    
    // Bringing up the local storage
    let DataContent = JSON.parse(localStorage.getItem('Data'));
    let questionListContent = JSON.parse(localStorage.getItem('questionList'));    
    
    // preventing the user from going to a lower number then 1 and ending the function here
    // with an alert that explains it.
    if (DataContent.num === 1){
        alert("זו היא שאלה מספר 1 ואין אפשרות לעשות שאלה לפניה.")
        return '';
    };

    // Saving the current question values when going back to the previous question so the user 
    // will be able to go back and forth and all of his progress will be saved. 
    
    // questionListContent[DataContent.num - 1] --> now is one index ahead of the displayed number same for DataContent
    
    questionListContent[DataContent.num - 1] = DataContent;
    localStorage.setItem("questionList", JSON.stringify(questionListContent));

    // Setting the previous question values: 

    // Changing the displayed question number according to the value we are at
    DataContent.num -= 1;
    DataContent = questionListContent[DataContent.num - 1];

    // Changing the display according to the values in Data(local storage) for out question position.
    questionText.value = DataContent.questionText;
    GUIQuestionNum.innerHTML = DataContent.num;
    
    localStorage.setItem("Data", JSON.stringify(DataContent));

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
