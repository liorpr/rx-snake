import { createEventHandler, mapPropsStream, flattenProp, compose } from 'recompose';
import firebase from 'firebase';
import R from 'ramda';
import { Observable } from 'rxjs';
import Board from './Board';
import withKeyDown from "../hoc/withKeyDown";
import withSwipe from '../hoc/withSwipe';
import withFirebase from '../hoc/withFirebase';
import withWindowSize from '../hoc/withWindowSize';
import Point from './utils/Point';
import GameState from './utils/GameState';
import KeyCodes from './utils/KeyCodes';
import './utils/initFirebase';

const playersRef = firebase.database().ref('game/players');
const candyRef = firebase.database().ref('game/config/candy');

function toDirection(keyCode) {
  switch (keyCode) {
    case KeyCodes.arrowUp:
    case KeyCodes.swipeUp:
      return [0, -1];
    case KeyCodes.arrowDown:
    case KeyCodes.swipeDown:
      return [0, 1];
    case KeyCodes.arrowLeft:
    case KeyCodes.swipeLeft:
      return [-1, 0];
    case KeyCodes.arrowRight:
    case KeyCodes.swipeRight:
      return [1, 0];
    default:
      return [];
  }
}

function initGame({ width, height }) {
  return {
    state: GameState.loaded,
    snake: R.map(
      () => new Point(~~(width / 2), ~~(height / 2)),
      R.range(0, 5)
    ),
    score: 0,
  }
}

function detectCollision(snake) {
  return snake.slice(1).some(x => snake[0].equals(x));
}

function play({ snake, state, score }, [direction, candy, { width, height }, pause]) {
  const result = () => ({ snake, state, score, candy, direction });
  if (state === GameState.ended || direction.length !== 2) return result();

  if (pause) {
    state = GameState.paused;
    return result();
  }

  const nextPoint = snake[0].move(direction).wrap(width, height);
  snake = R.prepend(nextPoint, snake);
  state = GameState.running;

  if (nextPoint.equals(candy)) {
    snake = R.adjust(p => p.inflate(), 0, snake);
    candy = Point.random(width, height);
    candyRef.set(R.pick(['x', 'y'], candy));
    score++;
  } else {
    snake = R.dropLast(1, snake);
  }

  if (detectCollision(snake)) {
    state = GameState.ended;
  }

  return result();
}

function getPointSize(gameSize, windowSize) {
  const width = windowSize.width / gameSize.width;
  const height = windowSize.height / gameSize.height;
  const MAX_SIZE = 16;

  return Math.min(MAX_SIZE, ~~Math.min(width, height));
}

const game = mapPropsStream(props$ => {
  const { handler: onKeyDown, stream: keyDown$ } = createEventHandler();

  const sharedProps$ = props$.publishReplay(1).refCount();

  const candy$ = sharedProps$.pluck('candy')
    .distinctUntilChanged(R.equals);

  const gameSize$ = sharedProps$.pluck('size')
    .distinctUntilChanged(R.equals);

  const windowSize$ = sharedProps$.pluck('windowSize')
    .distinctUntilChanged(R.equals);

  const direction$ = keyDown$.map(toDirection)
    .filter(d => d.length === 2)
    .startWith([])
    .scan((prev, next) => {
      if ((prev[0] === next[0] || prev[1] === next[1])) return prev;
      return next;
    })
    .bufferTime(100)
    .map(R.dropRepeats)
    .mergeScan((prev, next) => {
      if (next.length === 0) return Observable.of(prev);
      return Observable.of(...next);
    });

  const pause$ = keyDown$.filter(key => key === KeyCodes.space)
    .startWith(1)
    .scan(pause => !pause, true);

  const play$ = gameSize$.first().map(initGame)
    .mergeMap(initialGame => {
      const playerRef = playersRef.push(initialGame);
      const current = playerRef.key;

      return direction$
        .withLatestFrom(candy$, gameSize$, pause$, Array.of)
        .scan(play, initialGame)
        .distinctUntilChanged(R.equals)
        .do(({ snake, score, state, direction }) =>
          playerRef.update({
            snake: snake.map(R.pick(['x', 'y', 'belly'])),
            score,
            state,
            direction,
            updated: ~~((new Date()).getTime() / 1000)
          })
        )
        .map(R.assoc('current', current))
        .finally(() => playerRef.child('state').set(GameState.ended));
    });

  const game$ = keyDown$.filter(key => key === KeyCodes.enter)
    .startWith(1)
    .switchMapTo(play$);

  return Observable.combineLatest(game$, gameSize$, windowSize$)
    .map(([game, gameSize, windowSize]) => ({
      ...game,
      ...gameSize,
      size: getPointSize(gameSize, windowSize),
      onKeyDown,
      onSwipe: onKeyDown,
      capture: Object.values(KeyCodes),
    }));
});

export default compose(
  withFirebase('game/config', 'config'),
  flattenProp('config'),
  withWindowSize,
  game,
  withKeyDown,
  withSwipe({display: 'flex', height: '100vh'}),
)(Board)
