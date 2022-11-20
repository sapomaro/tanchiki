import {EventBus} from './EventBus';

export class KeyboardController extends (EventBus.Model)  {
  constructor() {
    super();
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      switch(event.key) {
        case 'w':
        case 'ArrowUp':
          this.emit('move', 'UP');
          break;
        case 'a':
          case 'ArrowLeft':
          this.emit('move', 'LEFT');
          break;
        case 's':
        case 'ArrowDown':
          this.emit('move', 'DOWN');
          break;
        case 'd':
        case 'ArrowRight':
          this.emit('move', 'RIGHT');
          break;
      }
    });
  }
}
