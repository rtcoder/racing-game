function initTouchEvents() {
  window.addEventListener('touchstart', function (event) {
    const {clientX, clientY} = event.touches[0];
    game.touchstartX = clientX;
    game.touchstartY = clientY;
  }, false);

  window.addEventListener('touchend', function (event) {
    const {clientX, clientY} = event.changedTouches[0];
    game.touchendX = clientX;
    game.touchendY = clientY;
    const {touchstartX, touchstartY, touchendX, touchendY} = game;
    if (Math.abs(touchendY - touchstartY) < Math.abs(touchendX - touchstartX)) {
      if (touchendX < touchstartX) {
        goToLeft();
      }
      if (touchendX > touchstartX) {
        goToRight();
      }
    } else {
      if (touchendY < touchstartY) {
        faster();
      }
      if (touchendY > touchstartY) {
        slower();

        game.car.isSlowingDown = true;
        setTimeout(() => {
          game.car.isSlowingDown = false;
        }, 500);
      }
    }
  }, false);
}

function initKeyboardEvents() {
  window.addEventListener('keydown', e => {
    e.preventDefault();
    switch (e.code) {
      case 'ArrowLeft':
      case 'KeyA':
        goToLeft();
        break;
      case 'ArrowRight':
      case 'KeyD':
        goToRight();
        break;
      case 'ArrowUp':
      case 'KeyW':
        faster();
        break;
      case 'KeyS':
      case 'ArrowDown':
        game.car.isSlowingDown = true;
        slower();
        break;
    }
  });
  window.addEventListener('keyup', e => {
    e.preventDefault();
    switch (e.code) {
      case 'KeyS':
      case 'ArrowDown':
        game.car.isSlowingDown = false;
        break;
    }
  });
}

function initEvents() {
  window.addEventListener("resize", resize);
  window.addEventListener("contextmenu", e => e.preventDefault());
}

function resize() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth > 400 ? 400 : window.innerWidth;

  game.grassWidth = canvas.width / 10;
  game.roadWidth = canvas.width / 10 * 8;
  game.car.y = canvas.height - game.car.height;
  game.car.x = getCenterOfTrafficLane(game.car.lane);
  game.car.nextPosition = getCenterOfTrafficLane(game.car.lane);
}
