import { mapProps } from 'recompose';

export default mapProps(({ style, ...props, point: { x, y }, size }) => ({
  ...props,
  style: {
    width: size,
    height: size,
    left: x * size,
    top: y * size,
    position: 'absolute',
    ...style,
  }
}));
