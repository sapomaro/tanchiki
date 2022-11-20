import type {Zone} from './Zone';
import type {Entity} from './Entity';

type LayerT = Record<string, {
  context: CanvasRenderingContext2D,
  entities: Array<Entity>,
}>;

export class View {
  width = 0;
  height = 0;
  pixelRatio = 8;
  layerZIndexCount = 0;
  layers: LayerT = {};

  constructor(zone: Zone) {
    this.width = zone.width;
    this.height = zone.height;
    this.createLayer('floor').style.background = '#000';
    this.createLayer('tanks');
    this.createLayer('projectiles');
    this.createLayer('ceiling');
  }
  convertToPixels(value: number) {
    return value * this.pixelRatio;
  }
  createLayer(id: string) {
    const layer = document.createElement('canvas');
    layer.id = id;
    layer.width = this.convertToPixels(this.width);
    layer.height = this.convertToPixels(this.height);
    layer.style.position = 'absolute';
    layer.style.zIndex = (this.layerZIndexCount++).toString();
    this.layers[id] = {
      context: layer.getContext('2d') as CanvasRenderingContext2D,
      entities: [],
    };
    document.body.appendChild(layer);
    return layer;
  }
  bindEntityToLayer(entity: Entity, layerId: keyof LayerT) {
    this.layers[layerId].entities.push(entity);
    entity.on('entityShouldUpdate', () => {
      this.eraseEntityFromLayer(entity, layerId);
    });
    entity.on('entityDidUpdate', () => {
      this.drawEntityOnLayer(entity, layerId);
    });
  }
  getEntityActualRect(entity: Entity) {
    return [
      this.convertToPixels(entity.posX),
      this.convertToPixels(entity.posY),
      this.convertToPixels(entity.width),
      this.convertToPixels(entity.height),
    ] as const;
  }
  drawEntityOnLayer(entity: Entity, layerId: keyof LayerT) {
    const context = this.layers[layerId].context;
    context.fillStyle = entity.color;
    context.fillRect(...this.getEntityActualRect(entity));
  }
  eraseEntityFromLayer(entity: Entity, layerId: keyof LayerT) {
    const context = this.layers[layerId].context;
    context.clearRect(...this.getEntityActualRect(entity));
  }
  redrawAllEntitiesOnLayer(layerId: keyof LayerT) {
    const {context, entities} = this.layers[layerId];
    context.clearRect(0, 0, this.convertToPixels(this.width), this.convertToPixels(this.height));
    for (const entity of entities) {
      this.drawEntityOnLayer(entity, layerId);
    }
  }
}
