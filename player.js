import { Falling, Jumping, Running, Sitting } from "./playerStates.js";

export class Player {
    constructor(game) {
        this.game = game;
        // height and width of the player image
        this.width = 100;
        this.height = 91.3;
        // position of the player on the canvas (these coordinates are starting from the top left corner of the canvas)
        this.x = 100;
        this.y = this.game.height - (this.height * 2) - this.game.groundMargin;
        this.image = player;
        
        // speed is the speed of the player in the x-direction
        this.speed = 0;
        this.maxSpeed = 5;

        // velocity is the speed of the player in the y-direction
        this.vy = 0;
        this.weight = 1;

        // frameX and frameY are the coordinates of the player image on the sprite sheet
        this.frameX = 0;
        this.frameY = 0;

        // maxFrame is the maximum number of frames in the sprite sheet
        this.maxFrame = 5;

        // fps is the frames per second
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;

        // states are the different states the player can be in
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    }
    update(input, deltaTime) {
        // get input from the game class and pass it to the player state class
        this.currentState.handleInput(input);
        
        // controls horizontal (x-direction) movement
        this.x += this.speed;
        if (input.includes('ArrowLeft')) {
            this.speed = -this.maxSpeed;
        }
        else if (input.includes('ArrowRight')) {
            this.speed = this.maxSpeed;
        }
        else {
            this.speed = 0;
        }
        // condition to prevent the player from moving out of the canvas
        if (this.x < 0) {
            this.x = 0;
        }

        if (this.x > this.game.width - (this.width * 2)) {
            this.x = this.game.width - (this.width * 2);
        }

        // controls vertical (y-direction) movement
        this.y += this.vy;

        // when the player is not on the ground, the gravity is applied
        if (!this.onGround()) {
            this.vy += this.weight;
        }
        else {
            this.vy = 0;
        }

        // sprite animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            }
            else {
                this.frameX = 0;
            }
        }
        else {
            this.frameTimer += deltaTime;
        }
    }
    draw(context) {
        // 1st parameter is the image
        // 2nd, 3rd parameter is the starting point of the image on the sprite sheet
        // 4th, 5th parameter is the width and height of the image on the sprite sheet
        // 6th, 7th parameter is the position of the image on the canvas
        // 8th, 9th parameter is the width and height of the image on the canvas
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width * 2, this.height * 2);
    }
    onGround() {
        return this.y >= (this.game.height - (this.height * 2) - this.game.groundMargin);
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}

