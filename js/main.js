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
  startGame();
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

function isTouchDevice() {
  return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
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
    car.y += game.car.speed;
    return car;
  }).filter(car => {
    return car.y < canvas.height + car.height;
  });
}

function moveCanisters() {
  game.canisters = game.canisters.map(canister => {
    canister.y += game.car.speed;
    return canister;
  }).filter(canister => {
    return canister.y < canvas.height + canister.height;
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
    const lane = getRandomInt(1, 3);
    const distance = getRandomInt(3500, 5000);
    const newCanister = {
      lane,
      x: getCenterOfTrafficLane(lane),
      y: (lastCanister?.y || 0) - distance,
      //bigger size for collision checking - added some buffon
      width: 100,
      height: 150,
      color: '#f30'
    };
    if (checkCollisionCarsWithCanister(newCanister)) {
      newCanister.lane = (newCanister.lane + 1) % 3;
    }
    // revert original size
    newCanister.width = 30;
    newCanister.height = 30;
    game.canisters.push(newCanister);
  }
}

function getCenterOfTrafficLane(laneNumber) {
  const laneWidth = game.roadWidth / 3;
  return (laneWidth * laneNumber) + game.grassWidth - (laneWidth / 2);
}


function checkCollisionPlayerWithCars() {
  return game.cars.some(car => {
    return (game.car.x + (game.car.width / 2) > car.x - (car.width / 2)
        && game.car.x - (game.car.width / 2) < car.x + (car.width / 2)
        && game.car.y + (game.car.height / 2) > car.y - (car.height / 2)
        && game.car.y - (game.car.height / 2) < car.y + (car.height / 2));
  });
}

function checkCollisionPlayerWithCanisters() {
  return game.canisters.some(canister => {
    return (game.car.x + (game.car.width / 2) > canister.x - (canister.width / 2)
        && game.car.x - (game.car.width / 2) < canister.x + (canister.width / 2)
        && game.car.y + (game.car.height / 2) > canister.y - (canister.height / 2)
        && game.car.y - (game.car.height / 2) < canister.y + (canister.height / 2));
  });
}

function checkCollisionCarsWithCanister(canister) {
  return game.cars.some(car => {
    return (canister.x + (canister.width / 2) > car.x - (car.width / 2)
        && canister.x - (canister.width / 2) < car.x + (car.width / 2)
        && canister.y + (canister.height / 2) > car.y - (car.height / 2)
        && canister.y - (canister.height / 2) < car.y + (car.height / 2));
  });
}

function loop() {
  if (!game.isStarted) {
    return;
  }
  update();
  draw();
  game.cars.forEach(drawCar);
  game.canisters.forEach(drawCanister);
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
    game.canisters.shift();
  }
  animationFrameId = requestAnimationFrame(loop);
}
