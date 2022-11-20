import {EventBus} from './EventBus';

export class Entity extends (EventBus.Model) {
  posX = 0;
  posY = 0;
  width = 0;
  height = 0;
  direction = 0;
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
    ++this.posX;
    this.emit('componentDidUpdate');
  }
  rotate() {

  }
  render() {

  }
}
