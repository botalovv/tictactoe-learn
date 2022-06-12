var canvas = document.getElementById("tictac");

var ctx = canvas.getContext("2d");

// ctx.fillStyle = "rgb(200,0,0)";
// ctx.fillRect (10, 10, 55, 50);

// ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
// ctx.fillRect (30, 30, 55, 50);

let gameField = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let ceil = (x, y) => gameField[x][y];

let activeFieldX = -1;
let activeFieldY = -1;

let activePlayer = 1;

let playerColors = ["rgb(255,255,255)", "rgb(255,0,0)", "rgb(0,255,0)"];

let playerDrawFunctions = [
  (x, y) => {
    drawStroke(x, y);

    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(x * 200, y * 200, 199, 199);
  },
  (x, y) => {
    drawStroke(x, y);

    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x * 200 + 50, y * 200 + 50);
    ctx.lineTo(x * 200 + 150, y * 200 + 150);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x * 200 + 150, y * 200 + 50);
    ctx.lineTo(x * 200 + 50, y * 200 + 150);
    ctx.stroke();
  },
  (x, y) => {
    drawStroke(x, y);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x * 200 + 100, y * 200 + 100, 70, 0, 2 * Math.PI, false);
    ctx.stroke();
  },
];

function CheckWinner() {
  for (let x = 0; x < 3; x++) {
    if (
      ceil(x, 0) == ceil(x, 1) &&
      ceil(x, 0) == ceil(x, 2) &&
      ceil(x, 0) != 0
    ) {
      return ceil(x, 0);
    }
  }

  for (let y = 0; y < 3; y++) {
    if (
      ceil(0, y) == ceil(1, y) &&
      ceil(0, y) == ceil(2, y) &&
      ceil(0, y) != 0
    ) {
      return ceil(0, y);
    }
  }

  if (ceil(0, 0) == ceil(1, 1) && ceil(0, 0) == ceil(2, 2) && ceil(1, 1) != 0) {
    return ceil(1, 1);
  }

  if (ceil(0, 2) == ceil(1, 1) && ceil(0, 2) == ceil(2, 0) && ceil(1, 1) != 0) {
    return ceil(1, 1);
  }

  return -1;
}

function drawStroke(x, y) {
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.strokeRect(x * 200, y * 200, 200, 200);
}

function drawCell(x, y, style) {
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.strokeRect(x * 200, y * 200, 200, 200);
  ctx.fillStyle = style;
  ctx.fillRect(x * 200, y * 200, 199, 199);
}

function drawField() {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      playerDrawFunctions[gameField[x][y]](x, y);
    }
  }

  if (gameField[activeFieldX][activeFieldY] != 0) {
    return;
  }
  playerDrawFunctions[activePlayer](activeFieldX, activeFieldY);

  //   console.log(gameField, activeFieldX, activeFieldY, activePlayer);
}

function GetCellPosition(e) {
  var x = Math.trunc(e.pageX / 200);
  var y = Math.trunc(e.pageY / 200);

  return [x, y];
}

function MouseMoveEvent(e) {
  var [x, y] = GetCellPosition(e);

  if (x > 2 || y > 2) {
    return;
  }

  activeFieldX = x;
  activeFieldY = y;

  drawField();
}

function MouseOutEvent(e) {
  activeFieldX = -1;
  activeFieldY = -1;

  drawField();
}

function MouseClickEvent(e) {
  var [x, y] = GetCellPosition(e);

  if (x > 2 || y > 2) {
    return;
  }

  if (gameField[x][y] != 0) {
    return;
  }

  gameField[x][y] = activePlayer;

  if (activePlayer == 1) {
    activePlayer = 2;
  } else {
    activePlayer = 1;
  }

  drawField();

  let winner = CheckWinner();
  if (winner != -1) {
    alert(`win : ${winner}`);
  }
}

window.onload = function () {
  canvas.addEventListener("mousemove", MouseMoveEvent);
  canvas.addEventListener("mousemove", MouseMoveEvent);
  canvas.addEventListener("click", MouseClickEvent);
};
