let pointList = [[0, 0], [-1, 0]];
let food = [0, 0];
let r = 10;
let dire = "ArrowRight";
let startTime = 0;
let goTime = 0;
let gameOn = 1;
let 分數 = 0;
let start = 0;
function setup() {
  createCanvas(400, 400);
  makefood();

}

function draw() {
  background(220);
  web();
  snake();
  if (gameOn == 1) {
    testText();
    showFood();
    if (start == 1) {
      timeControl(500);
    }
    else {
      fill(100);
      textSize(35);
      text("Click Screem to Start", 36, 260);
    }
  }

}
function web() {
  for (let j = 0; j < 21; j++) {
    for (let i = 0; i < 21; i++) {
      noFill();
      stroke(150);
      rect(i * 2 * r, j * 2 * r, 2 * r, 2 * r);
    }
  }
}

function snake() {
  for (let i of pointList) {
    fill(100);
    rect(200 + i[0] * 2 * r, 200 + i[1] * 2 * r, 2 * r, 2 * r);
  }
}
function snakeMove(direction = dire) {
  for (let i = pointList.length - 1; i > 0; i--) {
    pointList[i][0] = pointList[i - 1][0];
    pointList[i][1] = pointList[i - 1][1];
  }
  if (direction == "ArrowRight") {
    pointList[0][0] += 1;
  }
  else if (direction == "ArrowLeft") {
    pointList[0][0] += -1;
  }
  else if (direction == "ArrowUp") {
    pointList[0][1] += -1;
  }
  else if (direction == "ArrowDown") {
    pointList[0][1] += 1;
  }

}
function grow() {
  pointList.push([pointList[pointList.length - 1][0], pointList[pointList.length - 1][1]]);
}
function timeControl(milliscened) {
  if (goTime - startTime < milliscened) {
    goTime = millis();
  }
  else {
    dieRule();
    gameOver();
    if (gameOn != 0) {
      snakeMove();
      eatFoodOrNot();
      startTime = millis();
      goTime = millis();
    }

  }
}
function keyPressed() {
  if (key == "g") {
    grow();
  }
  else if (keyCode > 36 && keyCode < 41) {
    dire = key;
  }
}
function gameOver() {
  if (gameOn == 0) {
    while (pointList.length != 0) {
      pointList.pop()
    }
    fill(101, 51, 77);
    textSize(60);
    text("Game Over", 45, 240);
    textSize(35);
    text("Get Point: " + 分數, 48, 280);
  }


}
function dieRule() {
  if (pointList.length != 0) {
    for (let i = 1; i < pointList.length - 1; i++) {
      if (pointList[i][0] == pointList[0][0] && pointList[i][1] == pointList[0][1]) {
        gameOn = 0;
      }
    }
    if (pointList[0][0] > 9 || pointList[0][0] < -10 || pointList[0][1] < -10 || pointList[0][1] > 9) {
      gameOn = 0;
    }
  }
}
function makefood() {
  food[0] = int(random(-10, 9));
  food[1] = int(random(-10, 9));
  while (pointList.indexOf([food[0], food[1]]) != -1) {
    foodx = random(-10, 0);
    foody = random(-10, 0);
  }
}
function showFood() {
  fill(240);
  rect(200 + food[0] * 2 * r, 200 + food[1] * 2 * r, 2 * r, 2 * r);
}
function eatFoodOrNot() {
  if (pointList[0][0] == food[0] && pointList[0][1] == food[1]) {
    分數 += 1;
    grow();
    makefood();
  }
}
function testText() {
  textSize(12);
  text("snakeX = " + pointList[0][0], 20, 20);
  text("snakeY = " + pointList[0][1], 20, 40);
  text("FoodX = " + food[0], 20, 60);
  text("FoodY = " + food[1], 20, 80);
  text("GameOn = " + gameOn, 20, 100);

}
function mousePressed() {
  start = 1;
}

