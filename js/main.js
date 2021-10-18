window.onload = function () {
  enableTouches = isTouchDevice();

  if (enableTouches) {
    initTouchEvents();
  } else {
    initKeyboardEvents();
  }
  initEvents();
  resize();
  loop();
};

function isTouchDevice() {
  return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
}

function update() {
  game.barsShiftY += game.car.speed;
  game.barsShiftY %= 50;
  const step = 15;
  if (game.car.x !== game.car.nextPosition) {
    if (game.car.x < game.car.nextPosition) {
      game.car.x += step;
    } else {
      game.car.x -= step;
    }
    if (Math.abs(game.car.nextPosition - game.car.x) < step) {
      game.car.x = game.car.nextPosition;
    }
  }

  if (game.cars.length < 10) {
    generateCars();
  }
  moveCars();
  game.cars = game.cars.filter(car => {
    return car.y < canvas.height + car.height;
  });
}

function moveCars() {
  game.cars = game.cars.map(car => {
    car.y += game.car.speed;
    return car;
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCars() {
  console.log('generate');
  for (let i = 0; i < 100; i++) {
    const lastCar = game.cars ? game.cars[game.cars.length - 1] : null;
    const lane = getRandomInt(1, 3);
    const distance = getRandomInt(350, 550);
    game.cars.push({
      lane,
      x: getCenterOfTrafficLane(lane),
      y: (lastCar?.y || 0) - distance,
      width: 70,
      height: 100,
      color: '#fff'
    });
  }
}

function goToLeft() {
  let {lane} = game.car;
  lane--;
  if (lane < 1) {
    return;
  }
  game.car.lane = lane;
  game.car.nextPosition = getCenterOfTrafficLane(lane);
}

function goToRight() {
  let {lane} = game.car;
  lane++;
  if (lane > 3) {
    return;
  }
  game.car.lane = lane;
  game.car.nextPosition = getCenterOfTrafficLane(lane);
}

function faster() {
  let {speed} = game.car;
  speed += 3;
  if (speed > 15) {
    return;
  }
  game.car.speed = speed;
}

function slower() {
  let {speed} = game.car;
  speed -= 3;
  if (speed < 1) {
    return;
  }
  game.car.speed = speed;
}

function getCenterOfTrafficLane(laneNumber) {
  const laneWidth = game.roadWidth / 3;
  return (laneWidth * laneNumber) + game.grassWidth - (laneWidth / 2);
}

function draw() {
  const {grassWidth, roadWidth, barWidth, barWithEmptySpaceHeight, barHeight, barsShiftY, car} = game;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, grassWidth, canvas.height);
  ctx.fillRect(canvas.width - grassWidth, 0, grassWidth, canvas.height);

  const whiteBarsCount = Math.floor(canvas.height / barWithEmptySpaceHeight) + 2;

  ctx.fillStyle = 'white';

  const firstBarsLineX = (roadWidth / 3) + grassWidth - (barWidth / 2);
  const secondBarsLineX = (roadWidth / 3 * 2) + grassWidth - (barWidth / 2);

  for (let i = -1; i < whiteBarsCount; i++) {
    ctx.fillRect(firstBarsLineX, (i * barWithEmptySpaceHeight) + barsShiftY, barWidth, barHeight);
    ctx.fillRect(secondBarsLineX, (i * barWithEmptySpaceHeight) + barsShiftY, barWidth, barHeight);
  }

  drawCar(car);

  ctx.fill();
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

function checkCollision() {
  return game.cars.some(car => {
    return (game.car.x + (game.car.width / 2) > car.x - (car.width / 2)
        && game.car.x - (game.car.width / 2) < car.x + (car.width / 2)
        && game.car.y + (game.car.height / 2) > car.y - (car.height / 2)
        && game.car.y - (game.car.height / 2) < car.y + (car.height / 2));
  });
}

function loop() {
  update();
  draw();
  game.cars.forEach(drawCar);
  if(checkCollision()){
    alert('GAME OVER')
  }
  requestAnimationFrame(loop);
}
