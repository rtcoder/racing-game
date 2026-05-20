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
  maxSpeed: 26,
  minSpeed: 1
};

const MAX_CANVAS_WIDTH = 500;
const BASE_FRAME_MS = 1000 / 60;

const game = {
  distance: 0,
  lastKilometersStep: 0,
  kilometers: 0,
  isStarted: false,
  gameOverReason: '',
  lastFrameTime: null,
  touchstartX: 0,
  touchstartY: 0,
  touchendX: 0,
  touchendY: 0,
  car: createCar(),
  cars: [],
  canisters: [],
  trafficWaveIndex: 0,
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
const gameMessage = document.getElementById('game-message');

function createCar() {
  return {
    ...CAR_ORIGINAL,
    turnSignals: {...CAR_ORIGINAL.turnSignals}
  };
}
