let birds = [];
let pipes = [];
let score = 0;
let bg;

function setup() {

  createCanvas(700, 700);
  background(66, 232, 244);
  bg = loadImage("images/bg.png");
  bird = new Bird();
  pipe = new Pipe();
  pipes.push(new Pipe());


}

function draw() {
  background(bg);

  //background(66, 232, 244);

  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
  }

  for (let pipe of pipes) {
    pipe.show();
    pipe.intersection(bird);
    if (!pipe.getPass()) {
      if (pipe.hasPassed(bird)) {
        ++score;
        pipe.passedOnce();
      }
    }
    pipe.update();
  }

  textSize(40);
  fill(255);
  text("Score: " + score, width - 180, 40);

  // bird.think(pipes);
  bird.show();
  bird.update();

  for (let i = pipes.length - 1; i > -1; i--) {

    if (pipes[i].x < -pipes[i].pwidth) {
      pipes.splice(i, 1);
    }

  }
}