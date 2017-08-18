import uuid from 'uuid/v4';

function wrap(num, to) {
  num = num % to;
  if (num < 0) num+=to;
  return num;
}

export default class Point {
  constructor(x, y, size = 1) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.uuid = uuid();
  }

  static random(width, height) {
    return new Point(~~(Math.random() * width), ~~(Math.random() * height));
  }

  static from({x,y, size}) {
    return new Point(x, y, size);
  }

  move([x = 0, y = 0]) {
    return new Point(this.x + x, this.y + y);
  }

  wrap(width, height) {
    return new Point(wrap(this.x, width), wrap(this.y, height));
  }

  inflate(size = 1.5) {
    return new Point(this.x, this.y, this.size * size);
  }

  equals(other) {
    return other && this.x === other.x && this.y === other.y;
  }
}
