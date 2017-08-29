import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Board from '../Board';
import Snake from '../Snake';
import Candy from '../Candy';
import Players from '../Players';
import GameState from './utils/GameState';
import pointShape from './utils/pointShape';
import { COLORS } from "../resources/colors";

const Message = glamorous.div({
  top: '50%',
  position: 'relative',
  fontSize: '6vh',
});

const Score = glamorous.div({
  opacity: 0.2,
  position: 'absolute',
  bottom: 0,
  right: 0,
  margin: '0.4em',
  fontSize: '3em',
});

const Game = ({ snake, state, score, current, direction, size }) => (
  <Board>
    <Score>{score}</Score>
    <Players current={current} size={size} colors={COLORS}/>
    <Snake shape={snake} size={size} direction={direction}/>
    <Candy />
    {state === GameState.loaded ? <Message>Swipe or Press any arrow to move</Message> : null}
    {state === GameState.ended ? <Message>GAME ENDED</Message> : null}
  </Board>
);

Game.propTypes = {
  snake: PropTypes.arrayOf(pointShape).isRequired,
};

export default Game;