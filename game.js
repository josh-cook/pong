const canvas = document.getElementById("gameCanvas");
const canvasContext = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const startPosition = canvasHeight / 2;

let playerOnePosition = 10;
let playerTwoPosition = 780;

let ballX = 50;
let ballXSpeed = 10;

function initialiseGame() {
  const framePerSecond = 30;
  setInterval(function() {
    moveBall();
    drawEverything();
  }, 1000 / framePerSecond);
}

function moveBall() {
  ballX += ballXSpeed;

  if (ballX > playerOnePosition) {
    ballXSpeed = -ballXSpeed;
  }

  if (ballX < playerTwoPosition) {
    ballXSpeed = -ballXSpeed;
  }
}

function drawAsset(leftX, topY, width, height, drawColour) {
  canvasContext.fillStyle = drawColour;
  canvasContext.fillRect(leftX, topY, width, height);
}

function drawBall(centreX, centreY, radius, drawColour) {
  canvasContext.fillStyle = drawColour;
  canvasContext.beginPath();
  canvasContext.arc(centreX, centreY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function drawEverything() {
  // Game Canvas
  drawAsset(0, 0, canvasWidth, canvasHeight, "black");

  // Player 1
  drawAsset(playerOnePosition, startPosition, 10, 50, "white");

  // Player 2
  drawAsset(playerTwoPosition, startPosition, 10, 50, "white");

  // Ball
  drawBall(ballX, startPosition + 15, 10, "red");
}

initialiseGame();
