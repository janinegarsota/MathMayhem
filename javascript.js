var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");
const exitBtnHome = document.getElementById("exitBtnHome");
const exitBtnGame = document.getElementById("exitBtnGame");
const instructionScreen = document.getElementById("instructionScreen");

document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById("bgMusic");
    document.body.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log("Autoplay blocked", e));
        }
    }, { once: true });
});

// instructions page
document.getElementById("goToInstructions").onclick = () => {
    homeScreen.style.display = "none";
    instructionScreen.style.display = "block";
};

// Exit button from home
exitBtnHome.addEventListener("click", () => {
    window.close(); 
    alert("Thanks for playing!");
});

returnBtnHome.addEventListener("click", () => {
    instructionScreen.style.display = "none";
    homeScreen.style.display = "block";
});

// Exit button from game
exitBtnGame.addEventListener("click", () => {
    gameScreen.style.display = "none";
    homeScreen.style.display = "block";
    resetGameState();
});

//if we click on start/reset
document.getElementById("startGameBtn").onclick = function () {
    

    if (instructionScreen.style.display === "block") {
        instructionScreen.style.display = "none";
        gameScreen.style.display = "block";

        if (!playing) {
            playing = true;
            startGame();
        }
    } else {
        if (playing) {
            location.reload(); 
        } else {
            playing = true;
            startGame();
        }
    }
};

function resetGameState() {
    playing = false;
    clearInterval(action); 
    score = 0;
    timeremaining = 0;

    // Reset button and UI
    document.getElementById("startGameBtn").innerHTML = "Start Game";
    hide("timeremaining");
    hide("correct");
    hide("wrong");
    hide("gameover");
    document.getElementById("scorevalue").innerHTML = "0";
    document.getElementById("timeremainingvalue").innerHTML = "0";
}

// Start Game Logic
function startGame() {
    

    score = 0;
    document.getElementById("scorevalue").innerHTML = score;

    show("timeremaining");
    timeremaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;

    hide("gameover");

    document.getElementById("startGameBtn").innerHTML = "Reset Game";

    startCountdown();
    generateQA();
}

//clicking on an answer box
const choices = document.querySelectorAll('.box');

choices.forEach(choice => {
    choice.addEventListener('click', function () {
      const selectedAnswer = parseInt(this.textContent);
      const isCorrect = selectedAnswer === correctAnswer;
  
      choices.forEach(c => c.classList.remove('correct-answer', 'wrong-answer'));
  
      if (isCorrect) {
        this.classList.add('correct-answer');
        document.getElementById('correctSound').play();
        document.getElementById('correct').style.display = 'block';
  
        setTimeout(() => {
          document.getElementById('correct').style.display = 'none';
          choices.forEach(c => c.classList.remove('correct-answer', 'wrong-answer'));
          score++;
          document.getElementById("scorevalue").textContent = score;
          generateQA(); 
        }, 1000);
      } else {
        this.classList.add('wrong-answer');
        document.getElementById('wrongSound').play();
        document.getElementById('wrong').style.display = 'block';
  
        setTimeout(() => {
          document.getElementById('wrong').style.display = 'none';
          choices.forEach(c => c.classList.remove('correct-answer', 'wrong-answer'));
        }, 1000);
      }
    });
  });
  



//start counter
function startCountdown() {
    action = setInterval(() => {
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").textContent = timeremaining;

        if (timeremaining === 0) {
            clearInterval(action);
            endGame();
        }
    }, 1000);
}


// stop counter
function stopCountdown(){
    clearInterval(action);
}

function hide(Id){
    document.getElementById(Id).style.display = "none";
}

function show(Id){
    document.getElementById(Id).style.display = "block";
}

//generate a new question and multiple answers
function generateQA(){
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    var operator = Math.random() > 0.5 ? '+' : '-';

    if(operator === '+' || x >= y) {
        correctAnswer = operator === '+' ? x + y : x - y;
        document.getElementById("question").innerHTML = x + " " + operator + " " + y;
    } else {
        correctAnswer = y - x;
        document.getElementById("question").innerHTML = y + " - " + x;
    }

    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

    var answers = [correctAnswer];
    for(var i = 1; i < 5; i++){
        if(i != correctPosition){
            var wrongAnswer;
            do {
                var a = 1 + Math.round(9 * Math.random());
                var b = 1 + Math.round(9 * Math.random());
                wrongAnswer = Math.random() > 0.5 ? a + b : Math.abs(a - b);
            } while(answers.indexOf(wrongAnswer) > -1);

            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {
    // Game Over
    function endGame() {
        document.getElementById("gameScreen").style.display = "none";
        document.getElementById("gameOverScreen").style.display = "block";
        document.getElementById("finalScoreDisplay").textContent =
            document.getElementById("scorevalue").textContent;
    }

    // Restart Game
    document.getElementById("restartBtn").addEventListener("click", function () {
        document.getElementById("gameOverScreen").style.display = "none";
        document.getElementById("instructionScreen").style.display = "block";
    });

    // Exit to Home
    document.getElementById("exitToHomeBtn").addEventListener("click", function () {
        document.getElementById("gameOverScreen").style.display = "none";
        document.getElementById("homeScreen").style.display = "block";
    });

    // Settings screen
    document.getElementById("settingsBtn").addEventListener("click", function () {
        document.getElementById("homeScreen").style.display = "none";
        document.getElementById("settingsScreen").style.display = "block";
    });

    document.getElementById("returnFromSettings").addEventListener("click", function () {
        document.getElementById("settingsScreen").style.display = "none";
        document.getElementById("homeScreen").style.display = "block";
    });

    // Volume slider
    const volumeSlider = document.getElementById("volumeSlider");
    const bgMusic = document.getElementById("bgMusic");
    const correctSound = document.getElementById("correctSound");
    const wrongSound = document.getElementById("wrongSound");

    volumeSlider.addEventListener("input", function () {
        bgMusic.volume = volumeSlider.value;
    });

    window.endGame = endGame;
});

const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreDisplay = document.getElementById("finalScoreDisplay");
const restartBtn = document.getElementById("restartBtn");
const exitToHomeBtn = document.getElementById("exitToHomeBtn");

// When game ends
function endGame() {
    playing = false;
    clearInterval(action);
    gameScreen.style.display = "none";
    finalScoreDisplay.textContent = score;
    gameOverScreen.style.display = "block";
}

// Restart leads to instruction screen
restartBtn.onclick = () => {
    gameOverScreen.style.display = "none";
    instructionScreen.style.display = "block";
    resetGameState(); 
};

// Exit to Home screen
exitToHomeBtn.onclick = () => {
    gameOverScreen.style.display = "none";
    homeScreen.style.display = "block";
    resetGameState();
};
