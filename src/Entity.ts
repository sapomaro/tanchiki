import {EventBus} from './EventBus';
import type {PosStateT} from './Zone';

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
  spawned = false;
  movable = false;
  flying = false;
  crossable = false;
  hittable = true;
  lastRect: RectT;
  nextRect: RectT;
  color = 'grey';
  shouldBeDestroyed = false;

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
    this.nextRect = {...this.lastRect};
    const posState: PosStateT = {hasCollision: false};
    this.emit('entityWillHaveNewPos', posState);
    if (!posState.hasCollision) {
      this.setState({posX, posY});
      this.spawned = true;
    }
  }
  despawn() {
    this.emit('entityShouldBeDestroyed');
    this.spawned = false;
  }
}
