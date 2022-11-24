import {DynamicEntity} from './DynamicEntity';

export type MoveStateT = {hasCollision: boolean};

export class Tank extends DynamicEntity {
  constructor(props: Pick<DynamicEntity, 'width' | 'height'>) {
    super(props);
    this.color = 'yellow';
  }
}
