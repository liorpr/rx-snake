import { handleActions } from 'redux-actions';
import getPointSize from '../utils/getPointSize';

const SET_GAME_SIZE = 'SET_GAME_SIZE';
const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE';
const SET_CANDY = 'SET_CANDY';

const getWindowSize = () => ({
  width: Math.min(document.documentElement.clientWidth, window.innerWidth || Infinity),
  height: Math.min(document.documentElement.clientHeight, window.innerHeight || Infinity),
});

export function getInitialState() {
  const gameSize = { width: 48, height: 27 };
  const windowSize = getWindowSize();

  return {
    gameSize,
    windowSize,
    candy: { x: -1, y: -1 },
    ...getSize(gameSize, windowSize),
    name: localStorage.getItem('name') || '',
  }
}

const set = type => payload => ({ type, payload });

export const setWindowSize = () => ({ type: SET_WINDOW_SIZE, payload: getWindowSize() });
export const setGameSize = set(SET_GAME_SIZE);
export const setCandy = set(SET_CANDY);

function getSize(gameSize, windowSize) {
  const size = getPointSize(gameSize, windowSize);
  return {
    size,
    width: gameSize.width * size,
    height: gameSize.height * size,
  };
}

function handleWindowSize(state, { payload: windowSize }) {
  return {
    ...state,
    windowSize,
    ...getSize(state.gameSize, windowSize),
  };
}

function handleGameSize(state, { payload: gameSize }) {
  return {
    ...state,
    gameSize,
    ...getSize(gameSize, state.windowSize),
  };
}

export default handleActions({
  [SET_WINDOW_SIZE]: handleWindowSize,
  [SET_GAME_SIZE]: handleGameSize,
  [SET_CANDY]: (state, { payload }) => ({ ...state, candy: payload }),
}, {});
