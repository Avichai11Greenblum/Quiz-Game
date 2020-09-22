// SELECTORS

const Finished_Quizzes = JSON.parse(localStorage.getItem("Finished_Quizzes"));
const greetingMassage = document.getElementById("greetMassage");
const MadeList = document.querySelector(".made-list");



// Event Listeners

document.addEventListener("DOMContentLoaded", greetUser);


// Functions

// A function that will greet the user according to the circumstances
function greetUser(){
    if (Finished_Quizzes === null){
        greetingMassage.innerHTML = "עדיין לא הכנת שאלונים";
    } else {
        greetingMassage.innerHTML = 'בחר שאלון:';

        Finished_Quizzes.forEach(ele => {
            
            const quizArea = document.createElement("div");
            quizArea.classList.add('quizArea-item');

            const quizTag = document.createElement("button");
            quizTag.classList.add('quizTag');
            quizTag.innerHTML = ele;
            quizArea.appendChild(quizTag);

            const delButton = document.createElement("button");
            delButton.classList.add("delButton");
            quizArea.appendChild(delButton);
        });
    }
};