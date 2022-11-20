import {Zone} from './Zone';
import {View} from './View';
import {KeyboardController} from './KeyboardController';
import {Tank} from './Tank';
import {Terrain} from './Terrain';
import type {Entity, DirectionT} from './Entity';

export class Game {
  zone: Zone;
  view: View;
  controllerWasd: KeyboardController;
  controllerArrows: KeyboardController;

  createEntity(props: Pick<Entity, 'type' | 'width' | 'height' | 'posX' | 'posY'>) {
    let entity;
    if (props.type === 'tank') {
      entity = new Tank(props);
      this.view.bindEntityToLayer(entity, 'tanks');
    } else {
      entity = new Terrain(props);
      if (props.type === 'trees') {
        this.view.bindEntityToLayer(entity, 'ceiling');
      } else {
        this.view.bindEntityToLayer(entity, 'floor');
      }
    }
    this.zone.registerEntity(entity);
    entity.spawn(props);
    return entity;
  }
  init() {
    this.zone = new Zone({width: 52, height: 52});
    this.view = new View(this.zone);
    this.controllerWasd = new KeyboardController(['wasd']);
    this.controllerArrows = new KeyboardController(['arrows']);

    const tank1 = this.createEntity({type: 'tank', posX: 4, posY: 4, width: 4, height: 4});
    const tank2 = this.createEntity({type: 'tank', posX: 12, posY: 12, width: 4, height: 4});

    this.createEntity({type: 'brickWall', width: 4, height: 32, posX: 20, posY: 16});
    this.createEntity({type: 'trees', width: 16, height: 8, posX: 28, posY: 16});
    this.createEntity({type: 'water', width: 16, height: 4, posX: 28, posY: 32});

    this.controllerWasd.on('move', (direction: DirectionT) => {
      tank1.turn(direction);
      tank1.move();
    });
    this.controllerArrows.on('move', (direction: DirectionT) => {
      tank2.turn(direction);
      tank2.move();
    });
  }

}
