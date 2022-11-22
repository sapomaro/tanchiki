import {EventBus} from './EventBus';

export type ControllerTypeT = Array<'wasd' | 'arrows'>;

export class Controller extends (EventBus.Model)  {
  type: ControllerTypeT;
  constructor(type: ControllerTypeT) {
    super();
    this.type = type;
    if (type.includes('wasd')) {
      this.registerEventsForWasd();
    }
    if (type.includes('arrows')) {
      this.registerEventsForArrows();
    }
  }
  throttle() {

  }
  moveUp() {
    this.emit('move', 'UP');
  }
  moveDown() {
    this.emit('move', 'DOWN');
  }
  moveLeft() {
    this.emit('move', 'LEFT');
  }
  moveRight() {
    this.emit('move', 'RIGHT');
  }
  moveStop() {
    this.emit('stop', 'STOP');
  }
  registerEventsForWasd() {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.repeat) {
        return false;
      }
      switch(event.code) {
        case 'KeyW':
          this.moveUp();
          break;
        case 'KeyA':
          this.moveLeft();
          break;
        case 'KeyS':
          this.moveDown();
          break;
        case 'KeyD':
          this.moveRight();
          break;
      }
    });
    window.addEventListener('keyup', (event: KeyboardEvent) => {
      event.preventDefault();
      switch(event.code) {
        case 'KeyW':
        case 'KeyA':
        case 'KeyS':
        case 'KeyD':
          this.moveStop();
          break;
      }
    });
  }
  registerEventsForArrows() {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.repeat) {
        return false;
      }
      switch(event.key) {
        case 'ArrowUp':
          this.moveUp();
          break;
        case 'ArrowLeft':
          this.moveLeft();
          break;
        case 'ArrowDown':
          this.moveDown();
          break;
        case 'ArrowRight':
          this.moveRight();
          break;
      }
    });
    window.addEventListener('keyup', (event: KeyboardEvent) => {
      event.preventDefault();
      switch(event.code) {
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowDown':
        case 'ArrowRight':
          this.moveStop();
          break;
      }
    });
  }
}
