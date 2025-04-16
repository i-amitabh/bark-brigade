import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    // canvas.width = 500;
    // canvas.height = 500;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 150;
            this.speed = 0;
            this.maxSpeed = 5;
            this.background = new Background(this);
            this.player = new Player(this); 
            this.input = new InputHandler();
        }
        update(deltaTime) {
            this.player.update(this.input.keys, deltaTime);
            this.background.update();
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp) {
        // timeStamp is the current time
        // lastTime is the time of the previous frame
        // deltaTime is the time between the current and previous frame
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});

