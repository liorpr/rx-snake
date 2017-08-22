import React from 'react';
import PropTypes from 'prop-types';
import Snake from './Snake';
import Candy from './Candy';
import GameState from './utils/GameState';
import pointShape from './pointShape';
import LeadBoard from './LeadBoard';
import './Board.css';

const size = 16;

const Message = ({text}) => (
  <div style={{
    top: '50%',
    position: 'relative',
  }}>{text}</div>
);

const Board = ({ snake, candy, state, width, height, score, current, direction }) => (
  <div className="App">
    <h2>Score: {score}</h2>
    <div className="Board" style={{
      width: width * size,
      height: height * size,
    }}>
      <Snake shape={snake} size={size} direction={direction} />
      <Candy point={candy} size={size} />
      { state === GameState.loaded ? <Message text="Press any arrow to move"/> : null }
      { state === GameState.ended ? <Message text="GAME ENDED"/> : null }
    </div>
    <LeadBoard current={current}/>
  </div>
);

Board.propTypes = {
  snake: PropTypes.arrayOf(pointShape).isRequired,
  candy: pointShape.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Board;
