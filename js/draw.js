function draw() {
  const {car} = game;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrass();
  drawBars();
  drawCar(car);
  drawScore();

  ctx.fill();
}

function drawBars() {
  const {grassWidth, roadWidth, barWidth, barWithEmptySpaceHeight, barHeight, barsShiftY} = game;
  const whiteBarsCount = Math.floor(canvas.height / barWithEmptySpaceHeight) + 2;

  ctx.fillStyle = 'white';

  const firstBarsLineX = (roadWidth / 3) + grassWidth - (barWidth / 2);
  const secondBarsLineX = (roadWidth / 3 * 2) + grassWidth - (barWidth / 2);

  for (let i = -1; i < whiteBarsCount; i++) {
    ctx.fillRect(firstBarsLineX, (i * barWithEmptySpaceHeight) + barsShiftY, barWidth, barHeight);
    ctx.fillRect(secondBarsLineX, (i * barWithEmptySpaceHeight) + barsShiftY, barWidth, barHeight);
  }

}

function drawGrass() {
  const {grassWidth} = game;
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, grassWidth, canvas.height);
  ctx.fillRect(canvas.width - grassWidth, 0, grassWidth, canvas.height);
}

function drawCar(car) {
  const {color, width, height, x, y} = car;
  ctx.fillStyle = color;
  ctx.fillRect(x - width / 2, y - height / 2, width, height);
  // wheels
  ctx.fillRect(x - width / 2 - 5, y - height / 2 + 5, 5, 20);
  ctx.fillRect(x - width / 2 - 5, y + height / 2 - 25, 5, 20);
  ctx.fillRect(x + width / 2, y - height / 2 + 5, 5, 20);
  ctx.fillRect(x + width / 2, y + height / 2 - 25, 5, 20);

  ctx.fillStyle = 'yellow';
  ctx.fillRect(x - width / 3 - 5, y - height / 2, 10, 5);
  ctx.fillRect(x + width / 3 - 5, y - height / 2, 10, 5);

  ctx.fillStyle = car.isSlowingDown ? 'red' : '#4d4d4d';
  ctx.fillRect(x - width / 3 - 5, y + height / 2 - 5, 10, 5);
  ctx.fillRect(x + width / 3 - 5, y + height / 2 - 5, 10, 5);

  ctx.fill();
}

function drawScore() {
  ctx.fillStyle = "#fff";
  ctx.font = "30px monospace";
  ctx.fillText(`${Math.floor(game.distance / 50)}`, 10, 50);
}
