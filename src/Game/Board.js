import React from 'react';
import PropTypes from 'prop-types';
import { mapProps } from 'recompose';
import Snake from './Snake';
import Candy from './Candy';
import GameState from './utils/GameState';
import pointShape from './pointShape';
import './Board.css';

const Message = ({ text }) => (
  <div style={{
    top: '50%',
    position: 'relative',
  }}>{text}</div>
);

const addSize = mapProps(({ ...props, width, height }) => {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return { ...props, size: Math.min(16, ~~Math.min(w / width, h / height)) };
});

const Board = ({ snake, candy, state, width, height, score, current, direction, size }) => (
  <div className="App">
    <div className="Board" style={{
      width: width * size,
      height: height * size,
    }}>
      <h2 style={{ opacity: 0.2 }}>Score: {score}</h2>
      <Snake shape={snake} size={size} direction={direction}/>
      <Candy point={candy} size={size}/>
      {state === GameState.loaded ? <Message text="Press any arrow to move"/> : null}
      {state === GameState.ended ? <Message text="GAME ENDED"/> : null}
    </div>
  </div>
);

Board.propTypes = {
  snake: PropTypes.arrayOf(pointShape).isRequired,
  candy: pointShape.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default addSize(Board);
