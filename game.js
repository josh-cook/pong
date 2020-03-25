const canvas = document.getElementById("gameCanvas");
const canvasContext = canvas.getContext("2d");

function initialiseGame() {
  console.log("Hello world");
  console.log(canvas);
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

initialiseGame();
