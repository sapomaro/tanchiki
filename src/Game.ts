import {Zone} from './Zone';
import {View} from './View';
import {Controller} from './Controller';
import {Tank} from './Tank';
import {Projectile} from './Projectile';
import {Terrain} from './Terrain';
import type {Entity, DirectionT} from './Entity';

export class Game {
  zone: Zone;
  view: View;
  controllerWasd: Controller;
  controllerArrows: Controller;
  loopProcess: ReturnType<typeof setInterval> | null = null;
  loopTimeMs = 20;
  dynamicEntities: Set<Tank | Projectile> = new Set();

  startLoop() {
    this.stopLoop();
    this.loopProcess = setInterval(() => {
      for (const entity of this.dynamicEntities) {
        entity.act();
        if (entity.shouldBeDestroyed) {
          this.destroyEntity(entity);
        }
      }
    }, this.loopTimeMs);
  }
  stopLoop() {
    if (this.loopProcess) {
      clearInterval(this.loopProcess);
    }
  }
  createTank(props: Pick<Entity, 'posX' | 'posY'> & Partial<Tank>) {
    const entity = new Tank(props);
    this.dynamicEntities.add(entity);
    this.view.bindEntityToLayer(entity, 'tanks');
    this.zone.registerEntity(entity);
    entity.spawn(props);
    return entity;
  }
  createProjectile(projectile: Projectile) {
    this.dynamicEntities.add(projectile);
    this.view.bindEntityToLayer(projectile, 'projectiles');
    this.zone.registerEntity(projectile);
    projectile.spawn({posX: projectile.posX, posY: projectile.posY});
  }
  createTerrain(props: Pick<Entity, 'type' | 'width' | 'height' | 'posX' | 'posY'>) {
    const entity = new Terrain(props);
    if (props.type === 'trees') {
      this.view.bindEntityToLayer(entity, 'ceiling');
    } else {
      this.view.bindEntityToLayer(entity, 'floor');
    }
    this.zone.registerEntity(entity);
    entity.spawn(props);
    return entity;
  }
  destroyEntity(entity: Tank | Projectile) {
    entity.despawn();
    this.dynamicEntities.delete(entity);
  }
  init() {
    this.zone = new Zone({width: 52, height: 52});
    this.view = new View(this.zone);
    this.controllerWasd = new Controller(['wasd']);
    this.controllerArrows = new Controller(['arrows']);
    this.startLoop();

    const tank1 = this.createTank({posX: 4, posY: 4, moveSpeed: 4});
    const tank2 = this.createTank({posX: 12, posY: 12, color: 'lime'});

    this.createTerrain({type: 'brickWall', width: 4, height: 32, posX: 20, posY: 16});
    this.createTerrain({type: 'trees', width: 16, height: 8, posX: 28, posY: 16});
    this.createTerrain({type: 'water', width: 16, height: 4, posX: 28, posY: 32});

    this.controllerWasd.on('move', (direction: DirectionT) => {
      tank1.move(direction);
    });
    this.controllerWasd.on('stop', () => {
      tank1.stop();
    });
    this.controllerWasd.on('shoot', () => {
      this.createProjectile(tank1.shoot());
    });
    this.controllerArrows.on('move', (direction: DirectionT) => {
      tank2.move(direction);
    });
    this.controllerArrows.on('stop', () => {
      tank2.stop();
    });
    this.controllerArrows.on('shoot', () => {
      this.createProjectile(tank2.shoot());
    });
  }

}
