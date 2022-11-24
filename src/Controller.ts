import {EventBus} from './EventBus';

export type ControllerTypeT = Array<'wasd' | 'arrows'>;

export class Controller extends (EventBus.Model)  {
  type: ControllerTypeT;
  pressedKeys: Partial<Record<keyof Controller['keyBindings'], boolean>> = {};
  keyBindings = {
    KeyW: 'UP',
    KeyA: 'LEFT',
    KeyS: 'DOWN',
    KeyD: 'RIGHT',
    ArrowUp: 'UP',
    ArrowLeft: 'LEFT',
    ArrowDown: 'DOWN',
    ArrowRight: 'RIGHT',
  };
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
  keyPressed(code: keyof Controller['keyBindings']) {
    this.pressedKeys[code] = true;
    this.emit('move', this.keyBindings[code]);
  }
  keyReleased(code: keyof Controller['keyBindings']) {
    delete this.pressedKeys[code];
    if (!Object.keys(this.pressedKeys).length) {
      this.emit('stop', 'STOP');
    }
  }
  registerEventsForWasd() {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.repeat) {
        return false;
      }
      switch(event.code) {
        case 'KeyW':
        case 'KeyA':
        case 'KeyS':
        case 'KeyD':
          this.keyPressed(event.code);
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
          this.keyReleased(event.code);
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
      switch(event.code) {
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowDown':
        case 'ArrowRight':
          this.keyPressed(event.code);
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
          this.keyReleased(event.code);
          break;
      }
    });
  }
}
