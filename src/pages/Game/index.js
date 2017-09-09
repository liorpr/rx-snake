import React from 'react';
import { withStateHandlers, compose } from 'recompose';
import glamorous from 'glamorous';
import Board from '../../components/Board';
import GameState from '../../utils/GameState';
import withFullScreen from '../../hoc/withFullScreen';
import { SOLUTO_BLUE, COLORS } from '../../resources/colors';
import CurrentPlayer from './CurrentPlayer';

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
  zIndex: 2,
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

const Game = ({ state, score, current, isFullScreen, ...props }) => (
  <Wrapper id="game">
    <Board current={current} colors={COLORS}>
      {document.webkitFullscreenEnabled && !isFullScreen ?
        <SwipeMessage>Double tap to enter full screen mode</SwipeMessage> : null}
      <Score>{score}</Score>
      <CurrentPlayer {...props}/>
      {state === GameState.loaded ? <Message>Swipe or press any arrow to move</Message> : null}
      {state === GameState.ended ? <Message>GAME ENDED<br/>Double tap or press Enter to start again</Message> : null}
      {state === GameState.paused ? <Message>PAUSED</Message> : null}
    </Board>
  </Wrapper>
);

let initialState = {
  state: GameState.loaded,
  score: 0,
};
export default compose(
  withFullScreen,
  withStateHandlers(
    initialState,
    {
      setScore: state => score => ({ ...state, score }),
      setState: state => gameState => ({ ...state, state: gameState }),
      setCurrent: () => current => ({ ...initialState, current }),
    },
  ),
)(Game);
