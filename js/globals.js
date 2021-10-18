const CAR_ORIGINAL = {
  x: 50,
  y: 0,
  width: 70,
  height: 100,
  lane: 2,
  nextPosition: 50,
  speed: 8,
  color: '#09a',
  isSlowingDown: false
};
const game = {
  score: 0,
  isStarted: false,
  touchstartX: 0,
  touchstartY: 0,
  touchendX: 0,
  touchendY: 0,
  car: CAR_ORIGINAL,
  cars: [],
  carsSpeed: 0.5,
  roadWidth: 200,
  grassWidth: 30,
  barWithEmptySpaceHeight: 50,
  barWidth: 6,
  barHeight: 25,
  barsShiftY: 0,
};

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let enableTouches = false;
let animationFrameId = null;
const startButton = document.getElementById('start');
