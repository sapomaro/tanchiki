import {EventBus} from './EventBus';

export type DirectionT = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type RectT = Pick<Entity, 'posX' | 'posY' | 'width' | 'height'>;
export type MoveStateT = {hasCollision: boolean};

export class Entity extends (EventBus.Model) {
  posX = 0;
  posY = 0;
  width = 0;
  height = 0;
  movePace = 2;
  direction: DirectionT = 'UP';
  type: 'tank' | 'brickWall' | 'conreteWall' | 'trees' | 'water' | 'ice';
  movable = false;
  crossable = false;
  nextRect: RectT;
  color = 'grey';
  constructor({width, height}: Pick<Entity, 'width' | 'height'>) {
    super();
    this.width = width;
    this.height = height;
  }
  setState(newState: Partial<Entity>) {
    this.emit('entityShouldUpdate');
    Object.assign(this, newState);
    this.emit('entityDidUpdate');
  }
  getRect() {
    return {posX: this.posX, posY: this.posY, width: this.width, height: this.height};
  }
  spawn({posX, posY}: Pick<Entity, 'posX' | 'posY'>) {
    this.setState({posX, posY});
  }
  startMove() {
    this.nextRect = {...this.getRect(), ...(() => {
      switch(this.direction) {
        case 'UP':
          return {posY: this.posY - this.movePace};
        case 'DOWN':
          return {posY: this.posY + this.movePace};
        case 'LEFT':
          return {posX: this.posX - this.movePace};
        case 'RIGHT':
          return {posX: this.posX + this.movePace};
      }
    })()};
    return this.nextRect;
  }
  finishMove() {
    this.setState(this.nextRect);
    return this.nextRect;
  }
  move() {
    this.startMove();
    const moveState: MoveStateT = {hasCollision: false};
    this.emit('entityShouldMove', moveState);
    if (!moveState.hasCollision) {
      this.finishMove();
    }
  }
  turn(newDirection: DirectionT) {
    if (this.direction !== newDirection) {
      this.setState({direction: newDirection});
    }
  }
}
