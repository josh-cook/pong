const canvas = document.getElementById("gameCanvas");
const canvasContext = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const startPositionX = canvasWidth / 2;
const startPositionY = canvasHeight / 2;
const playerOneScoreField = document.getElementById(
  "score-container--player-one"
);
const playerTwoScoreField = document.getElementById(
  "score-container--player-two"
);

const playerWidth = 10;
const playerHeight = 100;
let playerOneY = 250;
let playerOneX = 10;
let playerTwoY = 250;
let playerTwoX = 780;

const gameOverScore = 3;
let playerOneScore = 0;
let playerTwoScore = 0;

let ballX = 50;
let ballY = 50;
let ballXSpeed = 10;
let ballYSpeed = 5;

let showWinScreen = false;

function initialiseGame() {
  const framePerSecond = 30;

  setInterval(function() {
    drawEverything();
    moveAll();
  }, 1000 / framePerSecond);

  canvas.addEventListener("mousemove", function(e) {
    const mousePos = calculateMousePosition(e);
    playerOneY = mousePos.y - playerHeight / 2;
  });

  canvas.addEventListener("mousedown", mouseClickHandler());
}

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

function mouseClickHandler(e) {
  if (showWinScreen) {
    playerOneScore = 0;
    playerTwoScore = 0;
    showWinScreen = false;
  }
}

function computerMovement() {
  const playerCenterY = playerTwoY + playerHeight / 2;
  if (playerCenterY < ballY - 30) {
    playerTwoY += 10;
  } else if (playerCenterY > ballY + 30) {
    playerTwoY -= 10;
  }
}

function moveAll() {
  if (showWinScreen) {
    return;
  }

  computerMovement();
  ballX += ballXSpeed;
  ballY += ballYSpeed;

  if (ballX < 0) {
    if (ballY > playerOneY && ballY < playerOneY + playerHeight) {
      ballXSpeed = -ballXSpeed;
      let deltaY = ballY - (playerOneY + playerHeight / 2);
      ballYSpeed = deltaY * 0.35;
    } else {
      playerTwoScore += 1;
      playerTwoScoreField.innerHTML = `SCORE: ${playerTwoScore}`;
      resetBall();
    }
  }

  if (ballX > canvasWidth) {
    if (ballY > playerTwoY && ballY < playerTwoY + playerHeight) {
      ballXSpeed = -ballXSpeed;
      let deltaY = ballY - (playerTwoY + playerHeight / 2);
      ballYSpeed = deltaY * 0.35;
    } else {
      playerOneScore += 1;
      playerOneScoreField.innerHTML = `SCORE: ${playerOneScore}`;
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

function drawNet() {
  for (let i = 0; i < canvasHeight; i += 40) {
    drawAsset(canvasWidth / 2 - 1, i, 2, 20, "white");
  }
}

function drawBall(centreX, centreY, radius, drawColour) {
  canvasContext.fillStyle = drawColour;
  canvasContext.beginPath();
  canvasContext.arc(centreX, centreY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function drawEverything() {
  if (showWinScreen) {
    if (playerOneScore >= gameOverScore) {
      canvasContext.fillText("PLAYER 1 WON", 350, 200);
    } else {
      canvasContext.fillText("Player 2 WON", 350, 200);
    }
    canvasContext.fillText("Click to continue", 350, 500);
    return;
  }

  // Game Canvas
  drawAsset(0, 0, canvasWidth, canvasHeight, "black");

  drawNet();

  // Player 1
  drawAsset(playerOneX, playerOneY, playerWidth, playerHeight, "white");

  // Player 2
  drawAsset(playerTwoX, playerTwoY, playerWidth, playerHeight, "white");

  // Ball
  drawBall(ballX, ballY, 10, "red");
}

function resetBall() {
  if (playerOneScore >= gameOverScore || playerTwoScore >= gameOverScore) {
    showWinScreen = true;
  }

  ballXSpeed = -ballXSpeed;
  ballX = startPositionX;
  ballY = startPositionY;
}

initialiseGame();
