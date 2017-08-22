import React from 'react';
import PropTypes from 'prop-types';
import { mapProps, compose, branch } from 'recompose';
import pointShape from './pointShape';
import withLocation from './hoc/withLocation';
import snakeHead from './resources/snake_head.png';
import snakeBody from './resources/snake_body.png';
import snakeBelly from './resources/snake_belly.png';

const Part = ({ src, style }) => <img src={src} style={style} alt="" />;

const showHead = mapProps(({style, direction: [x,y], ...props}) => ({
  ...props,
  style: {
    ...style,
    transform: `rotate(${x === -1 ? 180 : y * 90}deg)`
  },
  src: snakeHead,
}));

const showBelly = mapProps(props => ({...props, src: snakeBelly }));
const showBody = mapProps(props => ({...props, src: snakeBody }));

const SnakePart = compose(
 withLocation,
 branch(({index}) => index === 0, showHead, branch(({point: {belly}}) => belly, showBelly, showBody)),
)(Part);


const Snake = ({ shape, ...props }) => (
  <div>
    {
      shape.map((point, index) => <SnakePart key={point.uuid} {...props} point={point} index={index} />)
    }
  </div>
);

Snake.propTypes = {
  shape: PropTypes.arrayOf(pointShape).isRequired,
  direction: PropTypes.arrayOf(PropTypes.number).isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

export default Snake;
