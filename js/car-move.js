import {game} from './globals.js?v=8';

export function goToLeft() {
  let {lane} = game.car;
  lane--;
  if (lane < 1) {
    return;
  }
  game.car.lane = lane;
  game.car.nextPosition = getCenterOfTrafficLane(lane);
}

export function goToRight() {
  let {lane} = game.car;
  lane++;
  if (lane > 3) {
    return;
  }
  game.car.lane = lane;
  game.car.nextPosition = getCenterOfTrafficLane(lane);
}

export function faster() {
  let {speed} = game.car;
  speed += 3;
  if (speed > game.car.maxSpeed) {
    speed = game.car.maxSpeed;
  }
  game.car.speed = speed;
}

export function slower() {
  let {speed} = game.car;
  speed -= 5;
  if (speed < game.car.minSpeed) {
    speed = game.car.minSpeed;
  }
  game.car.speed = speed;
}

export function getCenterOfTrafficLane(laneNumber) {
  const laneWidth = game.roadWidth / 3;
  return (laneWidth * laneNumber) + game.grassWidth - (laneWidth / 2);
}
