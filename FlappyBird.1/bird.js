class Bird {

    constructor() {
        this.img = loadImage("images/fb2.png")
        this.y = height / 2;
        this.x = 140;

        this.gravity = 0.9;
        this.lift = -10;
        this.velocity = 0;
        this.brain = new NeuralNetwork(4, 4, 1);
    }



    show() {
        imageMode(CENTER);
        image(this.img, this.x, this.y);
        imageMode(CORNER);
    }

    update() {

        this.y += this.velocity;
        this.velocity += this.gravity;

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        } else if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        }

    }

    rise() {
        this.velocity = this.lift;
    }


    think(pipes) {
        let inputs = [];
        inputs[0] = this.y / height;
        inputs[1] = pipes[0].top / height;
        inputs[2] = pipes[0].bottom / height;
        inputs[3] = pipes[0].x / width;

        let output = this.brain.predict(inputs);
        if (output > 0.5) {
            this.rise();
        }
    }
}