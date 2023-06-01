function checkCollisionPlayerWithCars() {
  return false;
  return game.cars.some(car => {
    return (game.car.x + (game.car.width / 2) > car.x - (car.width / 2)
        && game.car.x - (game.car.width / 2) < car.x + (car.width / 2)
        && game.car.y + (game.car.height / 2) > car.y - (car.height / 2)
        && game.car.y - (game.car.height / 2) < car.y + (car.height / 2));
  });
}

function checkCollisionPlayerWithCanisters() {
  if (game.car.lane === 2) {
    return false;
  }
  return game.canisters.some(canister => {
    return (game.car.y + (game.car.height / 2) > canister.y - (canister.height / 2)
        && game.car.y - (game.car.height / 2) < canister.y + (canister.height / 2));
  });
}
