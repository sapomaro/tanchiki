type EntityT = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export class Game {
  zone = {
    width: 52,
    height: 52,
    pixelRatio: 10,
    map: [],
  };
  dynamic2D: CanvasRenderingContext2D | null;
  init() {
    this.createCanvas();
    this.drawEntity({
      x: 16, y: 4,
      width: 4, height: 4,
    });
  }
  convertToPixels(value: number) {
    return value * this.zone.pixelRatio;
  }
  createCanvas() {
    const canvasStatic = document.createElement('canvas');
    canvasStatic.className = 'game-canvas_static';
    canvasStatic.width = this.convertToPixels(this.zone.width);
    canvasStatic.height = this.convertToPixels(this.zone.height);
    canvasStatic.style.position = 'relative';
    canvasStatic.style.zIndex = '1';
    canvasStatic.style.background = '#000';
    const canvasDynamic = document.createElement('canvas');
    canvasDynamic.className = 'game-canvas_dynamic';
    canvasDynamic.width = canvasStatic.width;
    canvasDynamic.height = canvasStatic.height;
    canvasDynamic.style.position = 'absolute';
    canvasDynamic.style.zIndex = '2';
    document.body.appendChild(canvasDynamic);
    document.body.appendChild(canvasStatic);
    this.dynamic2D = canvasDynamic.getContext('2d');
  }
  drawEntity({x, y, width, height}: EntityT) {
    if (!this.dynamic2D) {
      throw new Error('no canvas');
    }
    const coords = [
      this.convertToPixels(x),
      this.convertToPixels(y),
      this.convertToPixels(width),
      this.convertToPixels(height),
    ] as const;
    this.dynamic2D.fillStyle = 'grey';
    this.dynamic2D.fillRect(...coords);
  }
}
