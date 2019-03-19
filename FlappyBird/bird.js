class Bird {

    constructor(brain) {
        this.img = loadImage("images/fb2.png")
        this.y = height / 2;
        this.x = 140;

        this.gravity = 0.9;
        this.lift = -10;
        this.velocity = 0;
        this.score = 0;
        this.fitness;

        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(4, 4, 1);
        }
    }


    mutate() {
        this.brain.mutate(0.1);
    }

    show() {
        imageMode(CENTER);
        image(this.img, this.x, this.y);
        imageMode(CORNER);
    }

    update() {

        this.score++;
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

        let closest = null;
        let closestD = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let d = pipes[i].x - this.x;
            if (d < closestD && d > 0) {
                closest = pipes[i];
                closestD = d;
            }
        }

        let inputs = [];
        inputs[0] = this.y / height;
        inputs[1] = closest.top / height;
        inputs[2] = closest.bottom / height;
        inputs[3] = closest.x / width;


        let output = this.brain.predict(inputs);
        if (output[0] > 0.5) {
            this.rise();
        }
    }
}