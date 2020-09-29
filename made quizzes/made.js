
// SELECTORS

let Finished_Quizzes = JSON.parse(localStorage.getItem("Finished_Quizzes"));
const greetingMassage = document.getElementById("greetMassage");
const MadeList = document.querySelector(".made-list");


// Event Listeners

document.addEventListener("DOMContentLoaded", greetUser);
MadeList.addEventListener('click', btnPress);

// Functions

// A function that will greet the user according to the local storage circumstances
function greetUser(){
    if (Finished_Quizzes.length < 1){
        greetingMassage.innerHTML = "אין שאלונים קיימים.";
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

// A function that will be activated when a button will be pressed 
function btnPress(event) {
    const target = event.target;
    
    // If the user presses a quiz tag in order to use that quiz
    if(target.classList.value === "quizTag"){
        window.location.href = "../user/user.html";
    }


    // If the user presses the del button
    if (target.classList.value === "delButton"){
        r = confirm("האם אתה בטוח שאתה רוצה למחוק את השאלון?");
        
        if (r){
            // Getting the name of the wanted quiz
            const parent = target.parentElement;
            const parentName = parent.children[0].innerText;
            
            // Removing the quiz from local storage
            
            // Resetting Finished_Quizzes in case of changes
            Finished_Quizzes = JSON.parse(localStorage.getItem("Finished_Quizzes"));
            
            for (let i = 0; i < Finished_Quizzes.length; i++) {
                
                if(Object.keys(Finished_Quizzes[i]).join("") === parentName) {

                    // Removing the selected quiz from the list variable
                    Finished_Quizzes.splice( i, 1)

                    // Setting the list variable to be the new Finished_Quizzes item in local storage
                    localStorage.setItem("Finished_Quizzes", JSON.stringify(Finished_Quizzes));
                }
            }
            

            // Remove from GUI 
            parent.remove();
        };
    }
};
