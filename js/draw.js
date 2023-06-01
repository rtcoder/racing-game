function draw() {
  const {car} = game;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrass();
  game.canisters.forEach(drawGasStations);
  drawRoad();
  drawBars();
  drawCar(car);
  ctx.fill();
  ctxSpeedometer.clearRect(0, 0, canvasSpeedometer.width, canvasSpeedometer.height);
  drawScore();
  drawSpeed();
  drawFuel();
}

function drawRoad() {
  const {grassWidth, roadWidth} = game;

  ctx.fillStyle = '#191919';

  ctx.fillRect(grassWidth, 0, roadWidth, canvas.height);
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

function drawGasStations(canister) {
  const {width, height, y} = canister;
  ctx.fillStyle = '#f30';
  const top = y - height / 2;
  ctx.fillRect((game.grassWidth / 2) - width / 2, top, width, height);
  ctx.fillRect((canvas.width - game.grassWidth / 2) - width / 2, top, width, height);

  ctx.font = '45px monospace';
  ctx.fillStyle = '#000';
  ctx.fillText("G", (game.grassWidth / 2) - 10, top + 40);
  ctx.fillText("A", (game.grassWidth / 2) - 10, top + 80);
  ctx.fillText("S", (game.grassWidth / 2) - 10, top + 120);

  ctx.fillText("G", (canvas.width - game.grassWidth / 2) - 10, top + 40);
  ctx.fillText("A", (canvas.width - game.grassWidth / 2) - 10, top + 80);
  ctx.fillText("S", (canvas.width - game.grassWidth / 2) - 10, top + 120);
  ctx.fill();
}

function drawScore() {
  ctxSpeedometer.fillStyle = "#fff";
  ctxSpeedometer.font = "20px monospace";
  ctxSpeedometer.fillText(`${game.kilometers}km`, 10, 30);
}

function drawSpeed() {
  ctxSpeedometer.fillStyle = "#fff";
  ctxSpeedometer.font = "20px monospace";
  ctxSpeedometer.fillText(`${game.car.speed * 9}km/h`, 100, 30);
}

function drawFuel() {
  ctxSpeedometer.fillStyle = '#4d4d4d';
  const barX = canvasSpeedometer.width - 150;
  ctxSpeedometer.fillRect(barX, 15, 120, 20);
  if (game.car.fuel <= 0) {
    return;
  }
  const blockWidth = 10;
  const spacing = 2;
  ctxSpeedometer.fillStyle = '#f40';
  let i;
  for (i = 0; i < Math.floor(game.car.fuel / 10); i++) {
    ctxSpeedometer.fillRect(barX + (i * (blockWidth + spacing)), 15, blockWidth, 20);
  }
  const rest = Math.floor(game.car.fuel % 10);
  if (rest !== 0) {
    ctxSpeedometer.fillRect(barX + (i * (blockWidth + spacing)), 15, blockWidth, 20);
  }

}
