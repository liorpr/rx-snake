export default function getPointSize(gameSize, windowSize) {
  const width = windowSize.width / gameSize.width;
  const height = windowSize.height / gameSize.height;

  return ~~Math.min(width, height);
}
