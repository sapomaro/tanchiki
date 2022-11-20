import {Entity} from './Entity';

export class Terrain extends Entity {
  constructor(props: Pick<Entity, 'width' | 'height' | 'type'>) {
    super(props);
    this.type = props.type;
    switch (this.type) {
      case 'brickWall':
        this.crossable = false;
        this.color = 'brown';
        break;
      case 'trees':
        this.crossable = true;
        this.color = 'green';
        break;
      case 'water':
        this.crossable = false;
        this.color = 'blue';
        break;
    }
  }
}
