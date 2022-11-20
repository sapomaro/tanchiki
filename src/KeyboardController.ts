import {EventBus} from './EventBus';

type KeyboardControllerTypeT = Array<'wasd' | 'arrows'>;

export class KeyboardController extends (EventBus.Model)  {
  type: KeyboardControllerTypeT;
  constructor(type: KeyboardControllerTypeT) {
    super();
    this.type = type;
    if (type.includes('wasd')) {
      window.addEventListener('keydown', (event: KeyboardEvent) => {
        event.preventDefault();
        switch(event.code) {
          case 'KeyW':
            this.emit('move', 'UP');
            break;
          case 'KeyA':
            this.emit('move', 'LEFT');
            break;
          case 'KeyS':
            this.emit('move', 'DOWN');
            break;
          case 'KeyD':
            this.emit('move', 'RIGHT');
            break;
        }
      });
    }
    if (type.includes('arrows')) {
      window.addEventListener('keydown', (event: KeyboardEvent) => {
        event.preventDefault();
        switch(event.key) {
          case 'ArrowUp':
            this.emit('move', 'UP');
            break;
          case 'ArrowLeft':
            this.emit('move', 'LEFT');
            break;
          case 'ArrowDown':
            this.emit('move', 'DOWN');
            break;
          case 'ArrowRight':
            this.emit('move', 'RIGHT');
            break;
        }
      });
    }
  }
}
