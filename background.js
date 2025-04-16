class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    update() {
        if (this.x < -this.width) {
            // if the layer is off the screen, reset its position to the right side of the screen
            this.x = 0;
        } else {
            // we need to multiply the speed by the speed modifier to get the actual speed of the layer
            this.x -= this.game.speed * this.speedModifier;
        }
    }
    draw(context) {
        // draw the image twice to create a parallax effect
        // the second image is offset by the width of the image to create a seamless transition
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height;
        this.layer1image = layer1;
        this.layer2image = layer2;
        this.layer3image = layer3;
        this.layer4image = layer4;
        this.layer5image = layer5;
        this.layers = [
            new Layer(this.game, this.width, this.height, 0, this.layer1image),
            new Layer(this.game, this.width, this.height, 0.2, this.layer2image),
            new Layer(this.game, this.width, this.height, 0.4, this.layer3image),
            new Layer(this.game, this.width, this.height, 0.8, this.layer4image),
            new Layer(this.game, this.width, this.height, 1, this.layer5image)
        ]
    }

    update() {
        this.layers.forEach(layer => {
            layer.update();
        });
    }
    draw(context) {
        this.layers.forEach(layer => {
            layer.draw(context);
        });
    }
    
    
}