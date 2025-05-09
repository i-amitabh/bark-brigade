import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js';
import { UI } from './UI.js';

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
            this.groundMargin = 113;
            this.speed = 0;
            this.maxSpeed = 5;
            // this property will be used to show collision boxes
            this.debug = false;

            this.score = 0;
            this.fontColor = "black";

            this.background = new Background(this);
            this.player = new Player(this); 
            this.input = new InputHandler(this);
            this.ui = new UI(this);

            // enemies
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 3000;

            // particles
            this.particles = [];

            // we are setting the initial state here in the main.js file instead of in the player.js file
            // because we want to make sure that the player is initialized before we set the initial state
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
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

            // update particles
            this.particles.forEach(particle => {
                particle.update();
                if(particle.markedForDeletion) this.particles.splice(this.particles.indexOf(particle), 1);
            });
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);

            // draw enemies
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });

            // draw particles
            this.particles.forEach(particle => {
                particle.draw(context);
            });

            // draw ui
            this.ui.draw(context);
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

