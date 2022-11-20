import {EventBus} from './EventBus';

export type DirectionT = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export class Entity extends (EventBus.Model) {
  posX = 0;
  posY = 0;
  width = 0;
  height = 0;
  direction: DirectionT = 'UP';
  constructor({width, height}: Pick<Entity, 'width' | 'height'>) {
    super();
    this.width = width;
    this.height = height;
  }
  spawn({posX, posY}: Pick<Entity, 'posX' | 'posY'>) {
    this.posX = posX;
    this.posY = posY;
    this.emit('componentDidUpdate');
  }
  move() {
    this.emit('componentShouldUpdate');
    switch(this.direction) {
      case 'UP':
        --this.posY;
        break;
      case 'DOWN':
        ++this.posY;
        break;
      case 'LEFT':
        --this.posX;
        break;
      case 'RIGHT':
        ++this.posX;
        break;
    }
    this.emit('componentDidUpdate');
  }
  turn(direction: DirectionT) {
    this.direction = direction;
  }
}
