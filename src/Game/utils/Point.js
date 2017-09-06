import uuid from 'uuid/v4';

function wrap(num, to) {
  num = num % to;
  if (num < 0) num += to;
  return num;
}

export default class Point {
  constructor(x, y, belly = false, uid = uuid()) {
    this.x = x;
    this.y = y;
    this.belly = belly;
    this.uuid = uid;
  }

  static random(width, height) {
    return new Point(~~(Math.random() * width), ~~(Math.random() * height));
  }

  static from({ x, y, belly, uuid }) {
    return new Point(x, y, belly, uuid);
  }

  move([x = 0, y = 0]) {
    return new Point(this.x + x, this.y + y);
  }

  wrap(width, height) {
    return new Point(wrap(this.x, width), wrap(this.y, height));
  }

  inflate() {
    return new Point(this.x, this.y, true);
  }

  equals(other) {
    return other && this.x === other.x && this.y === other.y;
  }
}
