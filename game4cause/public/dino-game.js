let canvas = document.getElementById("dino-game");
let ctx = canvas.getContext("2d");

let dino = {
  x: 50,
  y: canvas.height - 30,
  width: 20,
  height: 30,
  speedY: 0,
  gravity: 0.8,
  jumpStrength: -12,
  isJumping: false,
};

let obstacles = [];
let gameSpeed = 3;
let isGameOver = false;

function drawDino() {
  ctx.fillStyle = "#6B8E23"; // Dino color
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    ctx.fillStyle = "#FF6347"; // Obstacle color
    ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
    obstacles[i].x -= gameSpeed;
    if (obstacles[i].x + obstacles[i].width < 0) obstacles.splice(i, 1);
  }
}

function createObstacle() {
  let height = Math.floor(Math.random() * 30) + 20;
  let gap = Math.floor(Math.random() * 40) + 50;
  obstacles.push({
    x: canvas.width,
    y: canvas.height - height,
    width: 20,
    height: height,
  });
  setTimeout(createObstacle, Math.random() * 2000 + 1500);
}

function jump() {
  if (!dino.isJumping) {
    dino.isJumping = true;
    dino.speedY = dino.jumpStrength;
  }
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dino.y += dino.speedY;
  if (dino.y > canvas.height - dino.height) {
    dino.y = canvas.height - dino.height;
    dino.isJumping = false;
    dino.speedY = 0;
  } else {
    dino.speedY += dino.gravity;
  }

  drawDino();
  drawObstacles();

  if (isGameOver) {
    ctx.fillStyle = "#FF6347";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
    return;
  }

  // Collision detection
  for (let i = 0; i < obstacles.length; i++) {
    if (
      dino.x + dino.width > obstacles[i].x &&
      dino.x < obstacles[i].x + obstacles[i].width &&
      dino.y + dino.height > obstacles[i].y
    ) {
      isGameOver = true;
    }
  }

  requestAnimationFrame(updateGame);
}

document.addEventListener("keydown", jump);

createObstacle();
updateGame();
