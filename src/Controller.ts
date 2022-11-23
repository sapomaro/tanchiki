import {EventBus} from './EventBus';

export type ControllerTypeT = Array<'wasd' | 'arrows'>;

export class Controller extends (EventBus.Model)  {
  type: ControllerTypeT;
  tickTimeMs: 1000;
  tickProcess: ReturnType<typeof setInterval> | null = null;
  isKeyPressed = false;
  pressedKeys: Partial<Record<keyof Controller['keyBindings'], boolean>> = {};
  pressedKeysCount: 0;
  keyBindings = {
    KeyW: this.moveUp.bind(this),
    KeyA: this.moveLeft.bind(this),
    KeyS: this.moveDown.bind(this),
    KeyD: this.moveRight.bind(this),
    ArrowUp: this.moveUp.bind(this),
    ArrowLeft: this.moveLeft.bind(this),
    ArrowDown: this.moveDown.bind(this),
    ArrowRight: this.moveRight.bind(this),
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
    this.startTickProcess();
  }
  keyBindingExists(key: string): key is keyof Controller['keyBindings'] {
    if (key in this.keyBindings) {
      return true;
    }
    return false;
  }
  startTickProcess() {
    this.stopTickProcess();
    this.tickProcess = setInterval(() => {
      if (this.isKeyPressed) {
        const keys = Object.keys(this.pressedKeys);
        const currentKey = keys[this.pressedKeysCount];
        if (!this.keyBindingExists(currentKey)) {
          return;
        }
        this.keyBindings[currentKey]();
        if (++this.pressedKeysCount >= keys.length) {
          this.pressedKeysCount = 0;
        }
      }
    }, 100);
  }
  stopTickProcess() {
    if (this.tickProcess) {
      clearInterval(this.tickProcess);
    }
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
        case 'KeyA':
        case 'KeyS':
        case 'KeyD':
          this.isKeyPressed = true;
          this.pressedKeys[event.code] = true;
          this.pressedKeysCount = 0;
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
          //this.moveStop();
          delete this.pressedKeys[event.code];
          if (!Object.keys(this.pressedKeys).length) {
            this.isKeyPressed = false;
          }
          this.pressedKeysCount = 0;
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
          this.isKeyPressed = true;
          this.pressedKeys[event.code] = true;
          this.pressedKeysCount = 0;
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
          //this.moveStop();
          delete this.pressedKeys[event.code];
          if (!Object.keys(this.pressedKeys).length) {
            this.isKeyPressed = false;
          }
          this.pressedKeysCount = 0;
          break;
      }
    });
  }
}
