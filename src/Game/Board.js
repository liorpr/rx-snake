import React from 'react';
import PropTypes from 'prop-types';
import Snake from './Snake';
import Dot from './Dot';
import Point from './utils/Point';

const size = 8;

const Board = ({ snake, candy, width, height }) => (
  <div style={{
    width: width * size,
    height: height * size,
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 4,
    position: 'relative'
  }}>
    <Snake shape={snake} size={size} color="green" />
    <Dot point={candy} size={size} color="orange" />
  </div>
);

Board.propTypes = {
  snake: PropTypes.arrayOf(PropTypes.instanceOf(Point)).isRequired,
  candy: PropTypes.instanceOf(Point).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Board;
