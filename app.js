
let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");


// Start the game
document.addEventListener("keypress", function () {

    if (started == false) {

        console.log("game is started");

        started = true;

        levelUp();
    }
});


// Computer flash
function gameFlash(btn) {

    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}


// User flash
function userFlash(btn) {

    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}


// Increase level
function levelUp() {

    // Reset user's sequence
    userSeq = [];

    level++;

    h2.innerText = `Level ${level}`;

    // Generate random index
    let randIdx = Math.floor(Math.random() * btns.length);

    // Get random color
    let randColor = btns[randIdx];

    // Find the button
    let randBtn = document.querySelector(`.${randColor}`);

    // Add color to game sequence
    gameSeq.push(randColor);

    console.log(gameSeq);

    // Flash the button
    gameFlash(randBtn);
}


// Check user's answer
function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length == gameSeq.length) {

            setTimeout(levelUp, 1000);
        }

    } else {

        // Calculate score
        let score = level - 1;

        // Update highest score
        if (score > highScore) {
            highScore = score;
        }

        // Show score and highest score
      h2.innerHTML =
    `<span class="game-over-msg">
        Game Over!<br>
        Your Score is <b>${score}</b><br>
        Highest Score is <b>${highScore}</b>
    </span>`;

        // Red screen flash
        document.querySelector("body").style.backgroundColor = "red";

        // Return to original background
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor =  " #141e30";
        }, 150);

        // Reset after 5 seconds
        setTimeout(reset, 5000);
    }
}


// When user clicks a button
function btnPress() {

    let btn = this;

    // Flash the clicked button
    userFlash(btn);

    // Get clicked button's ID
    let userColor = btn.getAttribute("id");

    // Add user's color to sequence
    userSeq.push(userColor);

    // Check the latest answer
    checkAns(userSeq.length - 1);
}


// Select all buttons
let allBtns = document.querySelectorAll(".btn");


// Add click event to every button
for (let btn of allBtns) {

    btn.addEventListener("click", btnPress);
}


// Reset game
function reset() {

    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

    // highScore is NOT reset
    // so the highest score is preserved
h2.innerHTML = `<span class="start-msg">Press any key to start the game</span>`;
}