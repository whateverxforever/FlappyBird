class Pipe {

    constructor() {

        this.spacing = random(80, height / 2);
        this.pwidth = 80;
        this.x = width;
        this.speed = 6;
        this.yoff = random(this.spacing, height - this.spacing);
        this.top = this.yoff - this.spacing / 2;
        this.bottom = height - (this.top + this.spacing);
        this.shade = false;
        this.passed = false;

    }

    intersection(bird) {
        if (bird.x > this.x && bird.x < (this.x + this.pwidth)) {
            if (bird.y < this.top || bird.y > (this.top + this.spacing)) {
                this.shade = true;
                return;
            }
        }
        this.shade = false;
        return;
    }

    hasPassed(bird) {
        if (bird.x > (this.x + this.pwidth)) {
            return true;
        }
        return false;
    }

    show() {
        strokeWeight(5);
        if (this.shade == false) {
            fill(18, 181, 28);
        } else {
            fill(255, 0, 0);
            noLoop();
        }

        rect(this.x, 0, this.pwidth, this.top);
        rect(this.x, height - this.bottom, this.pwidth, this.bottom);
    }

    update() {
        this.x -= this.speed;
        if (this.speed > 12) {
            this.speed = 12;
        } else {
            this.speed += frameCount * 0.0001;
        }
    }

    passedOnce() {
        this.passed = true;
    }

    getPass() {
        if (this.passed) {
            return true;
        } else {
            return false;
        }
    }
}