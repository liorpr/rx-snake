import { mapProps } from 'recompose';

export default mapProps(({ style, ...props, point: { x, y }, size }) => ({
  ...props,
  style: {
    width: size,
    height: size,
    left: 0,
    top: 0,
    position: 'absolute',
    transform: `translate(${x * size}px, ${y * size}px)`,
    ...style,
  }
}));
