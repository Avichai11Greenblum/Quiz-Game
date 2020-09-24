// SELECTORS

const Finished_Quizzes = JSON.parse(localStorage.getItem("Finished_Quizzes"));
const greetingMassage = document.getElementById("greetMassage");
const MadeList = document.querySelector(".made-list");


// Event Listeners

document.addEventListener("DOMContentLoaded", greetUser);


// Functions

// A function that will greet the user according to the local storage circumstances
function greetUser(){
    if (Finished_Quizzes === null){
        greetingMassage.innerHTML = "עדיין לא הכנת שאלונים";
    } else {
        greetingMassage.innerHTML = 'בחר שאלון:';
        
        Finished_Quizzes.forEach(ele => {
            const quizArea = document.createElement("li");
            quizArea.classList.add('quizArea');

            const quizTag = document.createElement("button");
            quizTag.classList.add('quizTag');
            quizTag.innerHTML = Object.keys(ele);
            quizArea.appendChild(quizTag);

            const delButton = document.createElement("button");
            delButton.classList.add("delButton");
            delButton.innerHTML = 'X';
            quizArea.appendChild(delButton);

            MadeList.appendChild(quizArea);
        });
    }
};
