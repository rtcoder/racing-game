const CAR_ORIGINAL = {
  x: 150,
  y: 0,
  width: 70,
  height: 100,
  lane: 2,
  nextPosition: 150,
  speed: 5,
  color: '#09a',
  isSlowingDown: false,
  turnSignals: {
    right: false,
    left: false
  },
  fuel: 100,
  maxSpeed: 3000,
  minSpeed: 1
};

const MAX_CANVAS_WIDTH=500;

const game = {
  distance: 0,
  lastKilometersStep: 0,
  kilometers: 0,
  isStarted: false,
  touchstartX: 0,
  touchstartY: 0,
  touchendX: 0,
  touchendY: 0,
  car: CAR_ORIGINAL,
  cars: [],
  canisters: [],
  carsSpeed: 0.5,
  roadWidth: 200,
  grassWidth: 40,
  barWithEmptySpaceHeight: 50,
  barWidth: 6,
  barHeight: 25,
  barsShiftY: 0,
};

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasSpeedometer = document.getElementById('canvas-speedometer');
const ctxSpeedometer = canvasSpeedometer.getContext('2d');
let enableTouches = false;
let animationFrameId = null;
const startButton = document.getElementById('start');


