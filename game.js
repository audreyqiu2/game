// This script uses the p5 Javascript library to make a Snake game.


// Global variables
var snake;
var scl = 20;
var food;
var makeBtn = true;
var button;


function setup() {
  createCanvas(windowWidth, windowHeight);
  pickLocation();
  snake = new Snake();
  frameRate(10);

  if (makeBtn) {
    button = createButton('new game');
    button.position(windowWidth/2, windowHeight/1.5);
    button.mousePressed(function(){
      button.remove();
      setup();
    });
  }

  if (snake.alive) {
    button.hide();
  } else {
    button.show();
  }
}

function draw() {
  background(0);

  // While the snake is still alive, run the game
  if (snake.alive) {
    if (snake.eat(food)) {
      pickLocation();
    }
    snake.death();
    snake.update();
    snake.show();

    fill(200, 0, 100);
    rect(food.x, food.y, scl, scl);
  } else {
    // Game over
    button.show();
    gameOver();
    makeBtn = true;
  }

}

// Picks random location on the canvas for the next food
function pickLocation() {
  var cols = floor(windowWidth/scl);
  var rows = floor(windowHeight/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

// Handles behavior for when the player loses and the snake dies;
// prompts the user for another game
function gameOver() {
  fill(200, 0, 100);
  textSize(32);
  text("game over", windowWidth/2 - 32, windowHeight/2);
}


// Moves the snake while it's alive according to the arrow keys
function keyPressed() {
  if (snake.alive) {
    if (keyCode === UP_ARROW) {
      snake.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
      snake.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
      snake.dir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
      snake.dir(-1, 0);
    }
  }
}


// Class for the Snake object
function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 1;
  this.tail = [];
  this.alive = true;

  this.death = function() {
    for (let i = 0; i < this.tail.length; i++) {
      let pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total = 0;
        this.tail = [];
        this.alive = false;
        makeBtn = false;
      }
    }
  };

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  };

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  this.update = function() {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length-1; i++) {
        this.tail[i] = this.tail[i+1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);


    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;

    this.x = constrain(this.x, 0, windowWidth-scl);
    this.y = constrain(this.y, 0, windowHeight-scl);
  };

  this.show = function() {
    fill(255);

    for (let i = 0; i < this.total; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }

    rect(this.x, this.y, 20, 20);
  };
}
