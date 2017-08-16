import React from 'react';
import PropTypes from 'prop-types';
import Snake from './Snake';
import Dot from './Dot';
import Point from './utils/Point';
import GameState from './utils/GameState';

const size = 8;

const Message = ({text}) => (
  <div style={{
    top: '50%',
    position: 'relative',
  }}>{text}</div>
);

const Board = ({ snake, candy, state, width, height }) => (
  <div style={{
    width: width * size,
    height: height * size,
    backgroundColor: 'black',
    borderColor: 'white',
    color: 'white',
    borderWidth: 4,
    position: 'relative'
  }}>
    <Snake shape={snake} size={size} color="green" />
    <Dot point={candy} size={size} color="orange" />
    { state === GameState.loaded ? <Message text="Press any arrow to move"/> : null }
    { state === GameState.ended ? <Message text="GAME ENDED"/> : null }
  </div>
);

Board.propTypes = {
  snake: PropTypes.arrayOf(PropTypes.instanceOf(Point)).isRequired,
  candy: PropTypes.instanceOf(Point).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Board;
