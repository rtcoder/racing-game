window.onload = function () {
  enableTouches = isTouchDevice();

  if (enableTouches) {
    initTouchEvents();
    document.querySelector('controls-info').setAttribute('type', 'touch');
  } else {
    initKeyboardEvents();
    document.querySelector('controls-info').setAttribute('type', 'keyboard');
  }
  initEvents();
  resize();
};

function startGame() {
  if (game.isStarted) {
    return;
  }
  game.isStarted = true;

  game.car = {...CAR_ORIGINAL};
  game.cars = [];
  game.canisters = [];
  game.distance = 0;
  startButton.style.display = 'none';
  document.querySelector('controls-info').style.display = 'none';
  loop();
}

function update() {
  game.distance += game.car.speed;
  game.kilometers = (game.distance / 5000).toFixed(1);

  if (game.kilometers > game.lastKilometersStep + 2 && game.car.speed < game.car.maxSpeed) {
    game.car.minSpeed += 2;
    if (game.car.speed < game.car.minSpeed) {
      game.car.speed = game.car.minSpeed;
    }
    game.lastKilometersStep += 2;
  }

  game.barsShiftY += game.car.speed;
  game.car.fuel -= 0.01 * game.car.speed;
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

  if (game.canisters.length < 10) {
    generateCanisters();
  }

  moveCars();
  moveCanisters();
}

function moveCars() {
  game.cars = game.cars.map(car => {
    car.y += game.car.speed - 2;
    return car;
  }).filter(car => car.y < canvas.height + car.height);
}

function moveCanisters() {
  game.canisters = game.canisters.map(canister => {
    canister.y += game.car.speed;
    return canister;
  }).filter(canister => canister.y < canvas.height + canister.height);
}

function generateCars() {
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

function generateCanisters() {
  for (let i = 0; i < 100; i++) {
    const lastCanister = game.canisters ? game.canisters[game.canisters.length - 1] : null;
    const distance = getRandomInt(500, 1000);
    // const distance = getRandomInt(3500, 5000);
    game.canisters.push({
      y: (lastCanister?.y || 0) - distance,
      width: 100,
      height: 150
    });
  }
}

function getCenterOfTrafficLane(laneNumber) {
  const laneWidth = game.roadWidth / 3;
  return (laneWidth * laneNumber) + game.grassWidth - (laneWidth / 2);
}

function loop() {
  if (!game.isStarted) {
    return;
  }

  update();
  draw();
  game.cars.forEach(drawCar);

  if (checkCollisionPlayerWithCars() || game.car.fuel <= 0) {
    game.isStarted = false;
    cancelAnimationFrame(animationFrameId);
    startButton.style.display = 'block';
    return;
  }

  if (checkCollisionPlayerWithCanisters()) {
    game.car.fuel += 70;

    if (game.car.fuel > 100) {
      game.car.fuel = 100;
    }
  }

  animationFrameId = requestAnimationFrame(loop);
}
