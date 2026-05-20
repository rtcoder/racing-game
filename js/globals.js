export const CAR_ORIGINAL = {
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

export const MAX_CANVAS_WIDTH = 500;
export const BASE_FRAME_MS = 1000 / 60;

export const game = {
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

export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');
export const canvasSpeedometer = document.getElementById('canvas-speedometer');
export const ctxSpeedometer = canvasSpeedometer.getContext('2d');
export let animationFrameId = null;
export const startButton = document.getElementById('start');
export const gameTitle = document.getElementById('game-title');
export const gameMessage = document.getElementById('game-message');

export function setAnimationFrameId(id) {
  animationFrameId = id;
}

export function createCar() {
  return {
    ...CAR_ORIGINAL,
    turnSignals: {...CAR_ORIGINAL.turnSignals}
  };
}
