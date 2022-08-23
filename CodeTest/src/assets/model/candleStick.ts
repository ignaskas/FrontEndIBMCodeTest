export class candleStick{
  X: Date;
  Y: number[];

  constructor(x: number | any, y: number[] | any) {
    this.X = new Date(x);
    this.Y = y;
  }
}
