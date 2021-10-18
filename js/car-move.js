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
