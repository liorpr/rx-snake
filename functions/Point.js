function wrap(num, to) {
  num = num % to;
  if (num < 0) num+=to;
  return num;
}

class Point {
  constructor(x, y, belly = false) {
    this.x = x;
    this.y = y;
    this.belly = belly;
  }

  static random(width, height) {
    return new Point(~~(Math.random() * width), ~~(Math.random() * height));
  }

  static from({x,y, belly}) {
    return new Point(x, y, belly);
  }

  wrap(width, height) {
    return new Point(wrap(this.x, width), wrap(this.y, height));
  }

  withBelly() {
    return new Point(this.x, this.y, true);
  }

  equals(other) {
    return other && this.x === other.x && this.y === other.y;
  }
}

module.exports = Point;
