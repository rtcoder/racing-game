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
  resetGameState();
  startButton.style.display = 'none';
  gameMessage.style.display = 'none';
  document.querySelector('controls-info').style.display = 'none';
  animationFrameId = requestAnimationFrame(loop);
}

function resetGameState() {
  game.isStarted = true;
  game.gameOverReason = '';
  game.car = createCar();
  game.cars = [];
  game.canisters = [];
  game.distance = 0;
  game.lastKilometersStep = 0;
  game.kilometers = 0;
  game.barsShiftY = 0;
  game.lastFrameTime = null;
  resize();
}

function update(delta) {
  game.distance += game.car.speed * delta;
  game.kilometers = (game.distance / 5000).toFixed(1);

  if (game.kilometers > game.lastKilometersStep + 2 && game.car.speed < game.car.maxSpeed) {
    game.car.minSpeed += 1;
    if (game.car.speed < game.car.minSpeed) {
      game.car.speed = game.car.minSpeed;
    }
    game.lastKilometersStep += 2;
  }

  game.barsShiftY += game.car.speed * delta;
  game.car.fuel -= 0.006 * game.car.speed * delta;
  game.barsShiftY %= 50;

  const step = 15 * delta;

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

  if (game.canisters.length < 6) {
    generateCanisters();
  }

  moveCars(delta);
  moveCanisters(delta);
}

function moveCars(delta) {
  game.cars = game.cars.map(car => {
    car.y += Math.max(game.car.speed - 2, 1) * delta;
    return car;
  }).filter(car => car.y < canvas.height + car.height);
}

function moveCanisters(delta) {
  game.canisters = game.canisters.map(canister => {
    canister.y += game.car.speed * delta;
    return canister;
  }).filter(canister => canister.y < canvas.height + canister.height);
}

function generateCars() {
  while (game.cars.length < 12) {
    const lastCar = game.cars ? game.cars[game.cars.length - 1] : null;
    const lane = getRandomInt(1, 3);
    const distance = getRandomInt(420, 650);
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
  while (game.canisters.length < 6) {
    const lastCanister = game.canisters ? game.canisters[game.canisters.length - 1] : null;
    const distance = getRandomInt(1800, 2600);
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

function endGame(reason) {
  game.isStarted = false;
  game.gameOverReason = reason;
  cancelAnimationFrame(animationFrameId);
  gameMessage.innerText = `${reason}\n${game.kilometers}km`;
  gameMessage.style.display = 'block';
  startButton.innerText = 'Restart';
  startButton.style.display = 'block';
}

function loop(timestamp) {
  if (!game.isStarted) {
    return;
  }

  if (game.lastFrameTime === null) {
    game.lastFrameTime = timestamp;
  }

  const delta = Math.min((timestamp - game.lastFrameTime) / BASE_FRAME_MS, 2);
  game.lastFrameTime = timestamp;

  update(delta);
  draw();
  game.cars.forEach(drawCar);

  if (checkCollisionPlayerWithCars()) {
    endGame('Crash');
    return;
  }

  if (game.car.fuel <= 0) {
    endGame('Out of fuel');
    return;
  }

  const canisterIndex = getCollidingCanisterIndex();
  if (canisterIndex !== -1) {
    game.canisters.splice(canisterIndex, 1);
    game.car.fuel += 70;

    if (game.car.fuel > 100) {
      game.car.fuel = 100;
    }
  }

  animationFrameId = requestAnimationFrame(loop);
}
