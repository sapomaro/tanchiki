import {View} from './View';
import {Entity} from './Entity';

export class Game {
  view: View;
  /*zone = {
    width: 52,
    height: 52,
    map: [],
  };*/
  init() {
    this.view = new View({width: 52, height: 52});
    const tank = new Entity({width: 4, height: 4});
    this.view.bindEntityToLayer(tank, 'tanks')
    tank.spawn({posX: 4, posY: 4});
    setTimeout(() => { tank.move(); }, 1000);
  }

}
