import {Zone} from './Zone';
import {View} from './View';
import {KeyboardController} from './KeyboardController';
import {Entity, DirectionT} from './Entity';

export class Game {
  zone: Zone;
  view: View;
  controllerWasd: KeyboardController;
  controllerArrows: KeyboardController;

  init() {
    this.zone = new Zone({width: 52, height: 52});
    this.view = new View(this.zone);
    this.controllerWasd = new KeyboardController(['wasd']);
    this.controllerArrows = new KeyboardController(['arrows']);

    const tank1 = new Entity({width: 4, height: 4});
    const tank2 = new Entity({width: 4, height: 4});
    this.view.bindEntityToLayer(tank1, 'tanks');
    this.view.bindEntityToLayer(tank2, 'tanks');
    this.zone.registerEntity(tank1);
    this.zone.registerEntity(tank2);

    tank1.spawn({posX: 4, posY: 4});
    tank2.spawn({posX: 16, posY: 16});

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
