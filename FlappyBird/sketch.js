const TOTAL = 400;
let birds = [];
let savedBirds = [];
let pipes = [];
let score = 0;
let bg;
let counter = 0;
let highscore = 0;
let generation = 0;

function setup() {

  createCanvas(700, 700);
  background(66, 232, 244);
  bg = loadImage("images/bg.png");

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }

  pipes.push(new Pipe());

}

function draw() {
  background(bg);

  for (let i = pipes.length - 1; i >= 1; i--) {

    pipes[i].show();
    pipes[i].update();

    for (let j = birds.length - 1; j >= 0; j--) {
      if (pipes[i].intersection(birds[j])) {
        savedBirds.push(birds.splice(j, 1)[0]);
      }

      //   if (!pipe.getPass()) {
      //     if (pipe.hasPassed(bird)) {
      //       ++score;
      //       pipe.passedOnce();
      //     }
      //   }

    }
    if (pipes[i].x < -pipes[i].pwidth) {
      pipes.splice(i, 1);
    }
  }

  for (let bird of birds) {
    bird.think(pipes);
    bird.show();
    bird.update();
  }

  if (birds.length == 0) {
    frameCount = 0;
    counter = 0;
    nextGeneration();
    pipes = [];
    pipes.push(new Pipe());

  }

  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
  }
  counter++;



  textSize(40);
  fill(255);
  text("Score: " + counter / 75, width - 250, 40);
  text("Generation: " + generation, 0, 40);


}