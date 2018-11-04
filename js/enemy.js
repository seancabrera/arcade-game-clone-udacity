/*
* Enemy character - character the player must avoid
*/
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

        // This "enemy" object is reused after it has been
        // played. Once it's to the right of the canvas,
        // set a random speed and location to the left of the
        // canvas so that it will be played on the screen again
        if(this.isRightOfCanvas()) {
            this.setRandomSpeedAndLocation();
        }
    }

    isRightOfCanvas() {
        return this.x > 500;
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /*
    * Sets a random location and speed for the enemy.
    */
    setRandomSpeedAndLocation() {
        this.speed = getRandomSpeed();
        this.y = getRandomYPosition();
        this.x = getRandomXPosition();
    }
}

/*
* Gets a random speed between 100 and 600
*/
function getRandomSpeed() {
    return Math.random() * 500 + 100;
}

/*
* Gets a random x position between -1100 and -100.
* The higher the negative value, the longer the delay
* before the enemy shows up on screen.
*/
function getRandomXPosition() {
    const random = Math.random();
    return (random * (-1000)) - 100;
}

/*
* Gets a random y position for the enemy. The possible
* values correspond to the rows of concrete in the game.
*/
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

/*
* Gets a random int. This function was taken from:
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
* on 11/4/2018
*/
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}