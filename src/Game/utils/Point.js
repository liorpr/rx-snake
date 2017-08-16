export default class Point {
  constructor(x, y, size = 1) {
    this.x = x;
    this.y = y;
    this.size = size;
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

  inflate(size = 1.5) {
    return new Point(this.x, this.y, this.size * size);
  }

  equals(other) {
    return other && this.x === other.x && this.y === other.y;
  }
}
