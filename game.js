const canvas = document.getElementById("gameCanvas");
const canvasContext = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const startPositionY = canvasHeight / 2;
const startPositionX = canvasWidth / 2;

const playerWidth = 10;
const playerHeight = 50;
let playerOneY = 250;
let playerOneX = 10;
let playerTwoY = 250;
let playerTwoX = 780;

let ballX = 50;
let ballY = 50;
let ballXSpeed = 10;
let ballYSpeed = 5;

function calculateMousePosition(e) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;
  const mouseX = e.clientX - rect.left - root.scrollLeft;
  const mouseY = e.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

function initialiseGame() {
  const framePerSecond = 30;
  setInterval(function() {
    moveBall();
    computerMovement();
    drawEverything();
  }, 1000 / framePerSecond);

  canvas.addEventListener("mousemove", function(e) {
    let mousePos = calculateMousePosition(e);
    playerOneY = mousePos.y - playerHeight / 2;
  });
}

function computerMovement() {
  let playerCenterY = playerTwoY + playerHeight / 2;
  if (playerCenterY < ballY - 30) {
    playerTwoY += 7;
  } else if (playerCenterY > ballY + 30) {
    playerTwoY -= 7;
  }
}

function moveBall() {
  ballX += ballXSpeed;
  ballY += ballYSpeed;

  if (ballX < 0) {
    if (ballY > playerOneY && ballY < playerOneY + playerHeight) {
      ballXSpeed = -ballXSpeed;
    } else {
      resetBall();
    }
  }

  if (ballX > canvasWidth) {
    if (ballY > playerTwoY && ballY < playerTwoY + playerHeight) {
      ballXSpeed = -ballXSpeed;
    } else {
      resetBall();
    }
  }

  if (ballY > canvasHeight) {
    ballYSpeed = -ballYSpeed;
  }

  if (ballY < 0) {
    ballYSpeed = -ballYSpeed;
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
  drawAsset(playerOneX, playerOneY, playerWidth, playerHeight, "white");

  // Player 2
  drawAsset(playerTwoX, playerTwoY, playerWidth, playerHeight, "white");

  // Ball
  drawBall(ballX, ballY, 10, "red");
}

function resetBall() {
  ballX = startPositionX;
  ballY = startPositionY;
}

initialiseGame();
