// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite ='images/char-boy.png';
        this.movePlayerToStart();
    }

    handleInput(input) {
        const HORIZONTAL_MOVE_DISTANCE = 101;
        const VERTICAL_MOVE_DISTANCE = 83;
        const MIN_PLAYER_X = 0;
        const MIN_PLAYER_Y = 0;
        const MAX_PLAYER_X = 404;
        const MAX_PLAYER_Y = 390;

        if(input === 'left' && this.x > MIN_PLAYER_X) {
            this.x = this.x - HORIZONTAL_MOVE_DISTANCE;
        } else if(input === 'right' && this.x < MAX_PLAYER_X) {
            this.x = this.x + HORIZONTAL_MOVE_DISTANCE;
        } else if(input === 'up' && this.y > MIN_PLAYER_Y) {
            this.y = this.y - VERTICAL_MOVE_DISTANCE;
            if(this.y <= MIN_PLAYER_Y) {
                setTimeout(this.movePlayerToStart.bind(this), 250);
            }
        } else if(input === 'down' && this.y < MAX_PLAYER_Y) {
            this.y = this.y + VERTICAL_MOVE_DISTANCE;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update() {
        // the game engine requires an update method, but it
        // doesn't need to do anything
    }

    movePlayerToStart() {
        const INITIAL_PLAYER_X = 202;
        const INITIAL_PLAYER_Y = 390;
        this.x = INITIAL_PLAYER_X;
        this.y = INITIAL_PLAYER_Y;
    }
}