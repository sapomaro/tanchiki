import {EventBus} from './EventBus';

type KeyboardControllerTypeT = Array<'wasd' | 'arrows'>;

export class KeyboardController extends (EventBus.Model)  {
  type: KeyboardControllerTypeT;
  constructor(type: KeyboardControllerTypeT) {
    super();
    this.type = type;
    if (type.includes('wasd')) {
      window.addEventListener('keydown', (event: KeyboardEvent) => {
        switch(event.key) {
          case 'w':
            this.emit('move', 'UP');
            break;
          case 'a':
            this.emit('move', 'LEFT');
            break;
          case 's':
            this.emit('move', 'DOWN');
            break;
          case 'd':
            this.emit('move', 'RIGHT');
            break;
        }
      });
    }
    if (type.includes('arrows')) {
      window.addEventListener('keydown', (event: KeyboardEvent) => {
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
