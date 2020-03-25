const canvas = document.getElementById("gameCanvas");
const canvasContext = canvas.getContext("2d");
let ballX = 50;
let ballY;

function initialiseGame() {
  const framePerSecond = 30;
  setInterval(function() {
    moveBall();
    drawEverything();
  }, 1000 / framePerSecond);
}

function moveBall() {
  ballX += 10;
}

function drawEverything() {
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  // Player 1
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(10, 200, 10, 50);

  // Player 2
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(780, 200, 10, 50);

  canvasContext.fillStyle = "red";
  canvasContext.fillRect(ballX, 100, 10, 10);
}

initialiseGame();
