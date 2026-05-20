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
  drawHudPanel();
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
  const left = x - width / 2;
  const top = y - height / 2;
  const right = x + width / 2;
  const bottom = y + height / 2;
  const isPlayer = car === game.car;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.ellipse(x + 3, y + height / 2 - 5, width / 2, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#151515';
  ctx.fillRect(left - 6, top + 13, 8, 18);
  ctx.fillRect(left - 6, bottom - 31, 8, 18);
  ctx.fillRect(right - 2, top + 13, 8, 18);
  ctx.fillRect(right - 2, bottom - 31, 8, 18);

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, top);
  ctx.lineTo(right - 10, top + 12);
  ctx.lineTo(right, y + 6);
  ctx.lineTo(right - 7, bottom - 8);
  ctx.lineTo(x, bottom);
  ctx.lineTo(left + 7, bottom - 8);
  ctx.lineTo(left, y + 6);
  ctx.lineTo(left + 10, top + 12);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = isPlayer ? '#116a78' : '#d9d9d9';
  ctx.fillRect(left + 8, top + 28, width - 16, height - 50);

  ctx.fillStyle = '#10262d';
  ctx.beginPath();
  ctx.moveTo(left + 14, top + 22);
  ctx.lineTo(right - 14, top + 22);
  ctx.lineTo(right - 20, top + 38);
  ctx.lineTo(left + 20, top + 38);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#071116';
  ctx.beginPath();
  ctx.moveTo(left + 20, bottom - 18);
  ctx.lineTo(right - 20, bottom - 18);
  ctx.lineTo(right - 15, bottom - 34);
  ctx.lineTo(left + 15, bottom - 34);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.fillRect(left + 18, top + 25, 8, 4);
  ctx.fillRect(right - 28, top + 25, 8, 4);

  ctx.fillStyle = 'yellow';
  ctx.fillRect(left + 14, top + 2, 12, 5);
  ctx.fillRect(right - 26, top + 2, 12, 5);

  if (car.turnSignals?.left) {
    ctx.fillStyle = '#ffc400';
    ctx.fillRect(left - 1, top + 8, 7, 11);
    ctx.fillRect(left - 1, bottom - 19, 7, 11);
  }

  if (car.turnSignals?.right) {
    ctx.fillStyle = '#ffc400';
    ctx.fillRect(right - 6, top + 8, 7, 11);
    ctx.fillRect(right - 6, bottom - 19, 7, 11);
  }

  ctx.fillStyle = car.isSlowingDown ? 'red' : '#4d4d4d';
  ctx.fillRect(left + 14, bottom - 6, 12, 5);
  ctx.fillRect(right - 26, bottom - 6, 12, 5);

  ctx.strokeStyle = isPlayer ? '#52e4ff' : '#f6f6f6';
  ctx.lineWidth = 2;
  ctx.strokeRect(left + 8, top + 28, width - 16, height - 50);

  ctx.fill();
}

function drawGasStations(canister) {
  const {width, height, y} = canister;
  const top = y - height / 2;
  drawFuelStation(game.grassWidth / 2, top, width, height);
  drawFuelStation(canvas.width - game.grassWidth / 2, top, width, height);
  ctx.fill();
}

function drawFuelStation(centerX, top, width, height) {
  const pumpWidth = Math.min(width * 0.42, game.grassWidth * 0.6);
  const pumpHeight = height * 0.62;
  const x = centerX - pumpWidth / 2;
  const y = top + height * 0.16;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(x - 4, y + pumpHeight - 2, pumpWidth + 8, 8);

  ctx.fillStyle = '#d51f12';
  ctx.fillRect(x, y, pumpWidth, pumpHeight);

  ctx.fillStyle = '#ffb000';
  ctx.fillRect(x + 5, y + 6, pumpWidth - 10, 15);

  ctx.fillStyle = '#211915';
  ctx.fillRect(x + 8, y + 28, pumpWidth - 16, 22);

  ctx.fillStyle = '#fff2ba';
  ctx.font = '700 14px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('FUEL', centerX, y + 68);
  ctx.textAlign = 'start';

  ctx.strokeStyle = '#111';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + pumpWidth, y + 18);
  ctx.quadraticCurveTo(x + pumpWidth + 14, y + 23, x + pumpWidth + 9, y + 48);
  ctx.stroke();

  ctx.fillStyle = '#111';
  ctx.fillRect(x + pumpWidth + 5, y + 44, 9, 18);
}

function drawScore() {
  drawHudMetric('DIST', `${game.kilometers}km`, 14);
}

function drawSpeed() {
  drawHudMetric('SPEED', `${Math.round(game.car.speed * 9)}`, 118);
}

function drawFuel() {
  const barX = canvasSpeedometer.width - 142;
  const barY = 18;
  const blockWidth = 10;
  const spacing = 2;
  ctxSpeedometer.fillStyle = 'rgba(255, 255, 255, 0.16)';
  ctxSpeedometer.fillRect(barX, barY, 120, 16);

  ctxSpeedometer.fillStyle = '#9aa3ad';
  ctxSpeedometer.font = '700 9px monospace';
  ctxSpeedometer.fillText('FUEL', barX, 13);

  const fuelBlocks = Math.ceil(Math.max(game.car.fuel, 0) / 10);
  ctxSpeedometer.fillStyle = game.car.fuel < 25 ? '#f04438' : '#ff6b2c';
  for (let i = 0; i < fuelBlocks; i++) {
    ctxSpeedometer.fillRect(barX + (i * (blockWidth + spacing)), barY, blockWidth, 16);
  }
}

function drawHudPanel() {
  const margin = 8;
  ctxSpeedometer.fillStyle = 'rgba(10, 13, 17, 0.82)';
  ctxSpeedometer.fillRect(margin, 6, canvasSpeedometer.width - (margin * 2), 38);

  ctxSpeedometer.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctxSpeedometer.lineWidth = 1;
  ctxSpeedometer.strokeRect(margin + 0.5, 6.5, canvasSpeedometer.width - (margin * 2) - 1, 37);
}

function drawHudMetric(label, value, x) {
  ctxSpeedometer.fillStyle = '#9aa3ad';
  ctxSpeedometer.font = '700 9px monospace';
  ctxSpeedometer.fillText(label, x, 16);

  ctxSpeedometer.fillStyle = '#fff';
  ctxSpeedometer.font = '800 20px monospace';
  ctxSpeedometer.fillText(value, x, 35);
}
