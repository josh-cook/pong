const canvas = document.getElementById("gameCanvas");
const canvasContext = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let ballX = 50;
let ballXSpeed = 10;

let playerOnePosition = 10;
let playerTwoPosition = 780;

function initialiseGame() {
  const framePerSecond = 30;
  setInterval(function() {
    moveBall();
    drawEverything();
  }, 1000 / framePerSecond);
}

function moveBall() {
  ballX += ballXSpeed;

  if (ballX > canvasWidth) {
    ballXSpeed = -ballXSpeed;
  }

  if (ballX < 0) {
    ballXSpeed = -ballXSpeed;
  }
}

function newAsset(leftX, topY, width, height, drawColour) {
  canvasContext.fillStyle = drawColour;
  canvasContext.fillRect(leftX, topY, width, height);
}

function drawEverything() {
  // Game Canvas
  newAsset(0, 0, canvasWidth, canvasHeight, "black");

  // Player 1
  newAsset(playerOnePosition, 200, 10, 50, "white");

  // Player 2
  newAsset(playerTwoPosition, 200, 10, 50, "white");

  // Ball
  newAsset(ballX, 100, 10, 10, "red");
}

initialiseGame();
