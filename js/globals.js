const game = {
  touchstartX: 0,
  touchstartY: 0,
  touchendX: 0,
  touchendY: 0,
  car: {
    x: 50,
    y: 0,
    width: 70,
    height: 100,
    lane: 2,
    nextPosition: 50,
    speed: 2,
    color: '#09a',
    isSlowingDown:false
  },
  cars: [],
  carsSpeed: 0.5,
  roadWidth: 200,
  grassWidth: 30,
  barWithEmptySpaceHeight: 50,
  barWidth: 6,
  barHeight:25,
  barsShiftY: 0,
};

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let enableTouches = false;
