
// SELECTORS

const homeButton = document.querySelector(".back-home");

const quizNameGUI = document.querySelector(".quiz-name");
const questionNumGUI = document.querySelector(".questionNum");

const GUIImage = document.getElementById("the-picture");
const GUIText = document.querySelector(".text");

const answersDiv = document.querySelector(".answers"); 
const answer1 = document.querySelector(".answer1");
const answer2 = document.querySelector(".answer2");
const answer3 = document.querySelector(".answer3");
const answer4 = document.querySelector(".answer4");

// Global variables

// Bringing up local storage as variables
const quiz_name = localStorage.getItem("QuizName");
const questionList = JSON.parse(localStorage.getItem("questionList"));
let global_index = 0;
let counter = 0;

// EVENT LISTENERS

homeButton.addEventListener("click", goHome);
document.addEventListener("DOMContentLoaded", setQuiz);
answersDiv.addEventListener("click", answerClick);

// FUNCTIONS

// A function for going back a page and cleaning the localStorage
function goHome(e) {
    e.preventDefault();
    
    //clearing local and moving back to home screen
    localStorage.removeItem("QuizName");
    localStorage.removeItem("Data");
    localStorage.removeItem("questionList");

    window.location.href = "../Home page/Home.html";
}

// A function that will set the quiz info to the user's screen plus the first question
function setQuiz() {
    
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

// A function that will determine if the right answer was clicked and will respond appropriately
function answerClick(e) {
    e.preventDefault(); // --> prevent button from refreshing page

    // Bringing up local storage as variables
    const questionList = JSON.parse(localStorage.getItem("questionList"));
    
    // receiving user's choice 
    let userPick;
    switch(e.target.classList.value) {

        case "answer1":
            userPick = 1;
            break;

        case "answer2":
            userPick = 2;
            break;

        case "answer3":
            userPick = 3;
            break;

        case "answer4":
            userPick = 4;
            break;
    };

    // If the user choose right
    if (questionList[0][global_index].correctAnswer === userPick) {    
        e.target.classList.toggle("green");
        
        const buttons = [answer1, answer2, answer3, answer4]
        buttons.forEach(button => button.disabled = !0)

        setTimeout(() => {
            counter++;
            e.target.classList.toggle("green");
            buttons.forEach(button => button.disabled = !1)
        }, 2000)
        
    
    // If the user chose wrong
    } else {
        e.target.classList.toggle("red");

        let x = "answer" + questionList[0][global_index].correctAnswer;
        console.log(x)
        eval(x).classList.toggle("green");

        const buttons = [answer1, answer2, answer3, answer4]
        buttons.forEach(button => button.disabled = !0)
        
        setTimeout(() => {
            e.target.classList.toggle("red");
            eval(x).classList.toggle("green");
            buttons.forEach(button => button.disabled = !1)
        }, 2000)
    };
};
