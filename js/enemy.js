// Enemies our player must avoid
class Enemy {
    constructor() {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';

        this.setRandomSpeedAndLocation();
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x + (dt*this.speed);

        if(this.isRightOfCanvas()) {
            this.setRandomSpeedAndLocation();
        }

        if(this.isCollidingWithPlayer()) {
            player.movePlayerToStart();
        }
    }

    isRightOfCanvas() {
        return this.x > 500;
    }

    isCollidingWithPlayer() {
        return this.x < player.x + 65  &&
            this.x + 65  > player.x &&
            this.y < player.y + 65 &&
            this.y + 65 > player.y;
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    setRandomSpeedAndLocation() {
        this.speed = getRandomSpeed();
        this.y = getRandomYPosition();
        this.x = getRandomXPosition();
    }
}

function getRandomSpeed() {
    return Math.random() * 500 + 100;
}

function getRandomXPosition() {
    const random = Math.random();
    return (random * (-1000)) - 100;
}

function getRandomYPosition() {
    const randomNum = getRandomInt(3);
    if(randomNum === 0) {
        return 63;
    } else if(randomNum === 1) {
        return 146;
    } else if(randomNum === 2) {
        return 229;
    }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}