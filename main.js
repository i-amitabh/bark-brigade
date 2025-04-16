import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js';

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
            // this property will be used to show collision boxes
            this.debug = true;

            this.score = 0;

            this.background = new Background(this);
            this.player = new Player(this); 
            this.input = new InputHandler(this);

            // enemies
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 3000;
        }
        update(deltaTime) {
            this.player.update(this.input.keys, deltaTime);
            this.background.update();

            // add enemies on enemy interval
            if(this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            
            // update enemies
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);

            // draw enemies
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
        }
        addEnemy() {
            // we will add ground enemy only when things are moving and 50% chance
            if(this.speed > 0 && Math.random() < 0.5) {
                this.enemies.push(new GroundEnemy(this))
            } else if(this.speed > 0) {
                this.enemies.push(new ClimbingEnemy(this));
            }
            this.enemies.push(new FlyingEnemy(this));
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

