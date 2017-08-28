export default function getPointSize(gameSize, windowSize) {
  const width = windowSize.width / gameSize.width;
  const height = windowSize.height / gameSize.height;
  const MAX_SIZE = 16;

  return Math.min(MAX_SIZE, ~~Math.min(width, height));
}
