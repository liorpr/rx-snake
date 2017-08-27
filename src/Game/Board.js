import React from 'react';
import PropTypes from 'prop-types';
import Snake from './Snake';
import Candy from './Candy';
import Players from './Players';
import GameState from './utils/GameState';
import pointShape from './utils/pointShape';
import './Board.css';

const Message = ({ text }) => (
  <div style={{
    top: '50%',
    position: 'relative',
  }}>{text}</div>
);

const Board = ({ snake, candy, state, width, height, score, current, direction, size }) => (
  <div className="App">
    <div className="Board" style={{
      width: width * size,
      height: height * size,
    }}>
      <h2 style={{ opacity: 0.2 }}>Score: {score}</h2>
      <Players current={current} size={size} />
      <Snake shape={snake} size={size} direction={direction}/>
      <Candy point={candy} size={size}/>
      {state === GameState.loaded ? <Message text="Swipe or Press any arrow to move"/> : null}
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

export default Board;
