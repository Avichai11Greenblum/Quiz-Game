// SELECTORS

const score = document.getElementById("score");
const comment = document.getElementById("comment");

// EVENT LISTENERS

document.addEventListener("DOMContentLoaded", setInfo());

// FUNCTIONS

function setInfo() {
    // Receiving the score and number of question from localStorage
    const finishInfo = localStorage.getItem("congrats");
    score.innerHTML = `${finishInfo[0]}/${finishInfo[2]}`
    
    
    if( parseInt(finishInfo[0]) / parseInt(finishInfo[2]) < 0.5 ) {
        comment.innerHTML = "לא נורא, תמיד אפשר ללמוד עוד על הנושא :)";
    
    }  else if ( parseInt(finishInfo[0]) / parseInt(finishInfo[2]) > 0.5 && parseInt(finishInfo[0]) / parseInt(finishInfo[2]) < 0.75) {
        comment.innerHTML = "ציון סבבה אבל יש עדיין מקום לשיפור";
    
    } else if ( parseInt(finishInfo[0]) / parseInt(finishInfo[2]) > 0.75) {
        comment.innerHTML = "הופה!! יש לנו פה אלוף! כל הכבוד על ציון!";
    }

    localStorage.removeItem("congrats")
};