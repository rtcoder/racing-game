function checkCollisionPlayerWithCars() {
  return game.cars.some(car => {
    return (game.car.x + (game.car.width / 2) > car.x - (car.width / 2)
        && game.car.x - (game.car.width / 2) < car.x + (car.width / 2)
        && game.car.y + (game.car.height / 2) > car.y - (car.height / 2)
        && game.car.y - (game.car.height / 2) < car.y + (car.height / 2));
  });
}

function getCollidingCanisterIndex() {
  if (game.car.lane === 2) {
    return -1;
  }
  return game.canisters.findIndex(canister => {
    return (game.car.y + (game.car.height / 2) > canister.y - (canister.height / 2)
        && game.car.y - (game.car.height / 2) < canister.y + (canister.height / 2));
  });
}

function checkCollisionPlayerWithCanisters() {
  return getCollidingCanisterIndex() !== -1;
}
