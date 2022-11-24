import {Entity, DirectionT} from './Entity';
export type MoveStateT = {hasCollision: boolean};

export class DynamicEntity extends Entity {
  moveLength = 2;
  moveSpeed = 2;
  moveStages = 8;
  turnStages = 2;
  moveProgress = 0;
  moving = false;
  canMove = true;
  currentDirection: DirectionT;

  constructor(props: Pick<Entity, 'width' | 'height'>) {
    super(props);
    this.movable = true;
    this.color = 'yellow';
  }
  getMoveStages() {
    return this.moveStages - this.moveSpeed;
  }
  getNextMove(fullMove = false) {
    let moveLength = 0;
    if (fullMove) {
      moveLength = this.moveLength;
    } else {
      moveLength = this.moveLength / this.getMoveStages();
    }
    switch(this.direction) {
      case 'UP':
        return {posY: this.posY - moveLength};
      case 'DOWN':
        return {posY: this.posY + moveLength};
      case 'LEFT':
        return {posX: this.posX - moveLength};
      case 'RIGHT':
        return {posX: this.posX + moveLength};
    }
  }
  prepareToMove() {
    this.lastRect = this.getRect();
    this.nextRect = {...this.lastRect, ...this.getNextMove(true)};
    const moveState: MoveStateT = {hasCollision: false};
    this.emit('entityWillMove', moveState);
    if (!moveState.hasCollision) {
      this.canMove = true;
    } else {
      this.canMove = false;
    }
  }
  move() {
    if (!this.moving && !this.moveProgress) {
      return;
    }
    if (this.moveProgress === 0) {
      if (this.direction !== this.currentDirection) {
        this.turn(this.currentDirection);
        this.moveProgress += this.turnStages;
        this.canMove = false;
      } else {
        this.prepareToMove();
      }
    }
    const fullCycle = (++this.moveProgress >= this.getMoveStages());
    if (fullCycle) {
      this.moveProgress = 0;
      this.alignedToGrid = true;
      if (this.canMove) {
        this.setState(this.nextRect);
      }
    } else {
      this.alignedToGrid = false;
      if (this.canMove) {
        this.setState(this.getNextMove());
      }
    }

  }
  go(direction: DirectionT) {
    this.moving = true;
    this.currentDirection = direction;
  }
  stop() {
    this.moving = false;
  }
  turn(newDirection: DirectionT) {
    if (this.direction !== newDirection) {
      this.setState({direction: newDirection});
    }
  }
}
