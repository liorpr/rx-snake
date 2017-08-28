import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Snake from '../Snake';
import Candy from './Candy';
import Players from './Players';
import GameState from './utils/GameState';
import pointShape from './utils/pointShape';
import { SOLUTO_BLUE } from "../resources/colors";

const Message = glamorous.div({
  top: '50%',
  position: 'relative',
});

const Score = glamorous.div({
  opacity: 0.2,
  position: 'absolute',
  bottom: 0,
  right: 0,
  margin: '0.4em',
  fontSize: '3em',
});

const Container = glamorous.div(({ width, height, size }) => ({
  width: width * size,
  height: height * size,
  background: 'white',
  border: `4px solid ${SOLUTO_BLUE}`,
  margin: 'auto',
  position: 'relative'
}));

const Board = ({ snake, candy, state, width, height, score, current, direction, size }) => (
  <Container {...{ width, height, size }}>
    <Score>{score}</Score>
    <Players current={current} size={size}/>
    <Snake shape={snake} size={size} direction={direction}/>
    <Candy point={candy} size={size}/>
    {state === GameState.loaded ? <Message>Swipe or Press any arrow to move</Message> : null}
    {state === GameState.ended ? <Message>GAME ENDED</Message> : null}
  </Container>
);

Board.propTypes = {
  snake: PropTypes.arrayOf(pointShape).isRequired,
  candy: pointShape.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Board;
