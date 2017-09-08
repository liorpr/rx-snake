import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Board from '../../components/Board';
import Snake from '../../components/Snake/index';
import Candy from '../../components/Candy';
import Players from '../../components/Players';
import GameState from '../../utils/GameState';
import pointShape from '../../utils/pointShape';
import { SOLUTO_BLUE, COLORS } from '../../resources/colors';

const Wrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: SOLUTO_BLUE,
});

const Message = glamorous.div({
  top: '50%',
  position: 'relative',
});

Message.displayName = 'Message';

const Score = glamorous.div({
  opacity: 0.2,
  position: 'absolute',
  bottom: 0,
  left: 0,
  margin: '0.1em 0.4em',
  fontSize: '12vmin',
  fontWeight: 'bold',
});

Score.displayName = 'Score';

const SwipeMessage = glamorous.div({
  opacity: 0.2,
  position: 'absolute',
  width: '100%',
  padding: '0.5em 0',
  bottom: 0,
});

const Game = ({ snake, state, score, current, direction, size, isFullScreen }) => (
  <Wrapper>
    <Board>
      {document.webkitFullscreenEnabled && !isFullScreen ? <SwipeMessage>Double tap to enter full screen mode</SwipeMessage> : null}
      <Score>{score}</Score>
      <Players current={current} size={size} colors={COLORS}/>
      <Snake shape={snake} size={size} direction={direction}/>
      <Candy/>
      {state === GameState.loaded ? <Message>Swipe or press any arrow to move</Message> : null}
      {state === GameState.ended ? <Message>GAME ENDED<br/>Double tap or press Enter to start again</Message> : null}
      {state === GameState.paused ? <Message>PAUSED</Message> : null}
    </Board>
  </Wrapper>
);

Game.propTypes = {
  snake: PropTypes.arrayOf(pointShape).isRequired,
};

export default Game;
