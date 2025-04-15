export class Player {
    constructor(game) {
        this.game = game;
        // height and width of the player image
        this.width = 100;
        this.height = 91.3;
        // position of the player on the canvas (these coordinates are starting from the top left corner of the canvas)
        this.x = 100;
        this.y = this.game.height - (this.height * 2);
        this.image = player;
        this.speed = 0;
        this.maxSpeed = 5;
        this.vy = 0;
        this.weight = 1;
    }
    update(input) {

        // controls horizontal (x-direction) movement
        if (input.includes('ArrowLeft')) {
            this.speed = -this.maxSpeed;
        }
        else if (input.includes('ArrowRight')) {
            this.speed = this.maxSpeed;
        }
        else {
            this.speed = 0;
        }
        this.x += this.speed;
        // condition to prevent the player from moving out of the canvas
        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x > this.game.width - (this.width * 2)) {
            this.x = this.game.width - (this.width * 2);
        }

        // controls vertical (y-direction) movement
        if (input.includes('ArrowUp') && this.onGround()) {
            this.vy -= 30;
        }
        else if (input.includes('ArrowDown')) {
            this.vy += 30;
        }

        
        if(this.y < 0) {
            this.y = 0;
        } else {
            this.y += this.vy;
        }

        // when the player is not on the ground, the gravity is applied
        if (!this.onGround()) {
            this.vy += this.weight;
        }
        else {
            this.vy = 0;
        }
    }
    draw(context) {
        // 1st parameter is the image
        // 2nd, 3rd parameter is the starting point of the image on the sprite sheet
        // 4th, 5th parameter is the width and height of the image on the sprite sheet
        // 6th, 7th parameter is the position of the image on the canvas
        // 8th, 9th parameter is the width and height of the image on the canvas
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width * 2, this.height * 2);
    }
    onGround() {
        return this.y >= this.game.height - (this.height * 2);
    }
        
}

