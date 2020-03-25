const canvas = document.getElementById("gameCanvas");
const canvasContext = canvas.getContext("2d");

function initialiseGame() {
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = "white";
  canvasContext.fillRect(200, 200, 50, 25);

  canvasContext.fillStyle = "white";
  canvasContext.fillRect(400, 300, 10, 30);
}

initialiseGame();
