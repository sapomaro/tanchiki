import {Entity} from './Entity';

export class Tank extends Entity {
  constructor(props: Pick<Entity, 'width' | 'height'>) {
    super(props);
    this.movable = true;
    this.color = 'yellow';
  }
}
