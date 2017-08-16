export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static random(width, height) {
    return new Point(~~(Math.random() * width), ~~(Math.random() * height));
  }

  move([x = 0, y = 0]) {
    return new Point(this.x + x, this.y + y);
  }

  wrap(width, height) {
    return new Point((this.x + width) % width, (this.y + height) % height);
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
}
