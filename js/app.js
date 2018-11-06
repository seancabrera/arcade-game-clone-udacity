'use strict';

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const player = new Player();
let timer = 60;
let timerInterval;
let score = 0;

initGame();

function initGame() {
    createEnemies();

    // Increase the score when the player reaches the water.
    // Use a callback - score logic belongs here and not
    // in the Player class
    player.addPlayerScoredCallback(increaseScore);

    openStartGamePrompt();
}

function createEnemies() {
    // Create 8 enemies. This makes the game challenging
    // but still playable.
    for(var i=0; i<8; i++) {
        allEnemies.push(new Enemy());
    }
}

function increaseScore() {
    score++;
    document.querySelector('.score').innerText = score;
    flashScore();
}

function flashScore() {
    const scoreElement = document.querySelector('.score');
    scoreElement.classList.add('animated', 'flash');
    setTimeout(() => {
        scoreElement.classList.remove('animated', 'flash');
    }, 1000);
}

function openStartGamePrompt() {
    swal({
        title: 'Ready?',
        text: 'Click Play to begin',
        button: 'Play',
        closeOnClickOutside: false,
    })
    .then(startGame);
}

function startGame() {
    initializeCharactersForStartOfGame();
    initializeScore();
    startTimer();
}

function initializeCharactersForStartOfGame() {
    allEnemies.forEach(enemy => {
        enemy.setEnabled(true);
        enemy.setRandomSpeedAndLocation();
    });

    player.setEnabled(true);
    player.movePlayerToStart();
}

function initializeScore() {
    score = 0;
    document.querySelector('.score').innerText = score;
}

function startTimer() {
    timer = 60;
    document.querySelector('.timer').innerText = timer;
    timerInterval = setInterval(decreaseTimer, 1000);
}

function decreaseTimer() {
    timer--;
    document.querySelector('.timer').innerText = timer;

    if(timer === 0) {
        endGame();
    }
}

function endGame() {
    stopTimer();

    // Stop the characters from moving
    allEnemies.forEach(enemy => enemy.setEnabled(false));
    player.setEnabled(false);

    showGameOverPrompt();
}

function stopTimer() {
    clearInterval(timerInterval);
}

function showGameOverPrompt() {
    swal({
        title: 'Game Over!',
        text: 'Your score: ' + score,
        button: 'Play Again',
        closeOnClickOutside: false,
    })
    .then(startGame);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
