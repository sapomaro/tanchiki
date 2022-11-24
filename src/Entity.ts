import {EventBus} from './EventBus';

export type DirectionT = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type RectT = Pick<Entity, 'posX' | 'posY' | 'width' | 'height'>;

export class Entity extends (EventBus.Model) {
  posX = 0;
  posY = 0;
  width = 0;
  height = 0;
  direction: DirectionT = 'UP';
  type: 'tank' | 'brickWall' | 'conreteWall' | 'trees' | 'water' | 'ice';
  alignedToGrid = true;
  movable = false;
  crossable = false;
  lastRect: RectT;
  nextRect: RectT;
  color = 'grey';
  constructor(props: Partial<Entity>) {
    super();
    Object.assign(this, props);
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
    this.lastRect = {...this.getRect(), ...{posX, posY}};
    this.setState({posX, posY});
  }
}
