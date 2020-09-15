// SELECTORS

const GUIQuizName = document.querySelector(".Quiz-name");
const GUIQuestionNum = document.querySelector('.questionNum');
const GUIquestionText = document.querySelector(".question");

const uploadPictureButton = document.querySelector(".photo-upload");
const saveButton = document.querySelector(".save");
const backButton = document.querySelector(".back");
const nextButton = document.querySelector(".forward");

const radioButton1 = document.querySelector(".radio1");
const radioButton2 = document.querySelector(".radio2");
const radioButton3 = document.querySelector(".radio3");
const radioButton4 = document.querySelector(".radio4");

const answer1 = document.querySelector(".answer1");
const answer2 = document.querySelector(".answer2");
const answer3 = document.querySelector(".answer3");
const answer4 = document.querySelector(".answer4");
    
// GLOBAL VARIABLES

let questionData = {
    num: '',
    questionText: '',
    questionIMG: '',
    correctAnswer: '',
    answersBank: {first: '', second: '', third: '', fourth: ''}
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

uploadPictureButton.addEventListener("change", function() { displayPicture(this) });

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
    GUIquestionText.value = DataContent.questionText;
    answer1.value = DataContent.answersBank.first;
    answer2.value = DataContent.answersBank.second;
    answer3.value = DataContent.answersBank.third;
    answer4.value = DataContent.answersBank.fourth;
};
    
    
// A function that updates the the local storage according to changes of the inputs
function updateData() {
    // Bringing up the local storage
    const DataContent = JSON.parse(localStorage.getItem('Data'));
    const QuizName_storage = GUIQuizName.value;

    // Changing the display(GUI) according to the values in Data(local storage) for our question position. 
    DataContent.questionText = GUIquestionText.value;

    DataContent.answersBank.first = answer1.value;
    DataContent.answersBank.second = answer2.value;
    DataContent.answersBank.third = answer3.value;
    DataContent.answersBank.fourth = answer4.value;

    localStorage.setItem("QuizName",JSON.stringify(QuizName_storage));
    localStorage.setItem("Data", JSON.stringify(DataContent));
};
    
    
// Function for moving to the next question
function nextQuestion(e) {
    e.preventDefault(); // preventing the button from refreshing the page

    // Bringing up the local storage
    let DataContent = JSON.parse(localStorage.getItem('Data'));
    let questionListContent = JSON.parse(localStorage.getItem('questionList'));
    
    // questionListContent[DataContent.num ] --> now is the index of the current displayed question inside the local storage list. (GUI = 2 --> index = 1)
    
    // Saving the values of the question where we pressed forward before going to the next question:
    questionListContent[(DataContent.num - 1)] = DataContent;
    localStorage.setItem("questionList", JSON.stringify(questionListContent));

    // Moving to the next index and with it to the next question
    DataContent.num += 1;
    GUIQuestionNum.innerHTML = DataContent.num;  // Changing the displayed question number according to the value we are at

    // setting the values for the next item on the list:
    
    // If the question we just got to doesn't have any saved values at all so we will make "Data"(local storage) 
    // to a blank object and it will be filled by the user.
    if (questionListContent[DataContent.num - 1] === undefined){ // questionListContent[DataContent.num - 1] = index of the question we just got to
        DataContent.questionText = '';
        DataContent.questionIMG = '';
        DataContent.correctAnswer = '';
        DataContent.answersBank = {first: '', second: '', third: '', fourth: ''};

        // Changing the display(GUI) according to the values in Data(local storage) for our question position.
        GUIQuestionNum.innerHTML = DataContent.num;
        GUIquestionText.value = DataContent.questionText;

        answer1.value = DataContent.answersBank.first;
        answer2.value = DataContent.answersBank.second;
        answer3.value = DataContent.answersBank.third;
        answer4.value = DataContent.answersBank.fourth;

        // Removing the checked radio button 
        radioButton1.checked = false;
        radioButton2.checked = false;
        radioButton3.checked = false;
        radioButton4.checked = false;
        

        // If the question we just got to does have saved values so we will set them on the values of "Data"(local storage)
    } else { 
        DataContent.questionText = questionListContent[DataContent.num - 1].questionText;
        DataContent.questionIMG = questionListContent[DataContent.num - 1].questionIMG;
        DataContent.correctAnswer = questionListContent[DataContent.num - 1].correctAnswer;   
        DataContent.answersBank = questionListContent[DataContent.num - 1].answersBank;   

        // Changing the display(GUI) according to the values in Data(local storage) for our question position.
        GUIQuestionNum.innerHTML = DataContent.num;
        GUIquestionText.value = DataContent.questionText;

        answer1.value = DataContent.answersBank.first;
        answer2.value = DataContent.answersBank.second;
        answer3.value = DataContent.answersBank.third;
        answer4.value = DataContent.answersBank.fourth;

        // Putting the radio point at the correct answer 
        switch (DataContent.correctAnswer) {
            case 1:
                radioButton1.checked = true;
                break;

            case 2:
                radioButton2.checked = true;
                break;

            case 3:
                radioButton3.checked = true;
                break;

            case 4:
                radioButton4.checked = true;
                break;
                                    
        };
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
    // questionListContent[DataContent.num - 1] --> now is the index of the displayed number same for DataContent
    DataContent.num -= 1;
    DataContent = questionListContent[DataContent.num - 1];

    // Changing the display(GUI) according to the values in Data(local storage) for our question position.
    GUIQuestionNum.innerHTML = DataContent.num;
    GUIquestionText.value = DataContent.questionText;
    answer1.value = DataContent.answersBank.first;
    answer2.value = DataContent.answersBank.second;
    answer3.value = DataContent.answersBank.third;
    answer4.value = DataContent.answersBank.fourth;
    
    // Putting the radio point at the correct answer 
    switch (DataContent.correctAnswer) {
        case 1:
            radioButton1.checked = true;
            break;

        case 2:
            radioButton2.checked = true;
            break;

        case 3:
            radioButton3.checked = true;
            break;

        case 4:
            radioButton4.checked = true;
            break;                        
    };
    // Saving to Data(Local storage)
    localStorage.setItem("Data", JSON.stringify(DataContent));
};
    
 // A function that saves the correct answer   
function correctFunction() {

    // Bringing up the local storage
    let DataContent = JSON.parse(localStorage.getItem('Data'));

    // Finding which radio button is being clicked
    if (radioButton1.checked) {
        DataContent.correctAnswer = 1;

    } else if (radioButton2.checked){
        DataContent.correctAnswer = 2;

    } else if (radioButton3.checked){
        DataContent.correctAnswer = 3;

    } else if (radioButton4.checked){
        DataContent.correctAnswer = 4;
    }
    // Saving to Data(Local storage)
    localStorage.setItem("Data", JSON.stringify(DataContent));  
};


function displayPicture(input) {
    console.log(input)
    if (input.files && input.files[0]) {
        let reader = new FileReader();

        reader.onload = function(e) {
            document.getElementById("the-picture").setAttribute('src', e.target.result);
        };
        
        reader.readAsDataURL(input.files[0]);
    };
};
