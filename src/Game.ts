import {View} from './View';
import {KeyboardController} from './KeyboardController';
import {Entity, DirectionT} from './Entity';

export class Game {
  view: View;
  controller: KeyboardController;
  /*zone = {
    width: 52,
    height: 52,
    map: [],
  };*/
  init() {
    this.view = new View({width: 52, height: 52});
    this.controller = new KeyboardController();

    const tank = new Entity({width: 4, height: 4});
    this.view.bindEntityToLayer(tank, 'tanks');
    tank.spawn({posX: 4, posY: 4});

    this.controller.on('move', (direction: DirectionT) => {
      tank.turn(direction);
      tank.move();
    });
  }

}
