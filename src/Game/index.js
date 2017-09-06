import { createEventHandler, mapPropsStream, lifecycle, compose } from 'recompose';
import { connect } from 'react-redux';
import firebase from 'firebase';
import R from 'ramda';
import { Observable } from 'rxjs';
import Game from './Game';
import withKeyDown from "../hoc/withKeyDown";
import withSwipe from '../hoc/withSwipe';
import Point from './utils/Point';
import GameState from './utils/GameState';
import KeyCodes from './utils/KeyCodes';
import '../utils/initFirebase';

const snakesRef = firebase.database().ref('game/snakes');
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

function initSnake({ playerId, gameSize: { width, height } }) {
  return {
    playerId,
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

function play({ snake, state, score }, [direction, { candy, gameSize: { width, height } }, pause]) {
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

const game = mapPropsStream(props$ => {
  const { handler: onKeyDown, stream: keyDown$ } = createEventHandler();

  const sharedProps$ = props$.publishReplay(1).refCount();

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

  const play$ = sharedProps$.first().map(initSnake)
    .mergeMap(initialSnake => {
      const snakeRef = snakesRef.push(initialSnake);
      const current = snakeRef.key;

      return direction$
        .withLatestFrom(sharedProps$, pause$, Array.of)
        .scan(play, initialSnake)
        .distinctUntilChanged(R.equals)
        .do(({ snake, score, state, direction }) =>
          snakeRef.update({
            snake,
            score,
            state,
            direction,
            updated: ~~((new Date()).getTime() / 1000)
          })
        )
        .map(R.assoc('current', current))
        .finally(() => snakeRef.child('state').set(GameState.ended));
    });

  const game$ = keyDown$
    .filter(key => key === KeyCodes.enter || key === KeyCodes.numpadEnter)
    .startWith(1)
    .switchMapTo(play$);

  return Observable.combineLatest(sharedProps$, game$)
    .map(([props, game]) => ({
      ...props,
      ...game,
      onKeyDown,
      onSwipe: onKeyDown,
      capture: R.values(KeyCodes),
    }));
});

export default compose(
  connect(state => state),
  game,
  withKeyDown,
  withSwipe,
  lifecycle({
    componentDidMount() {
      window.scrollTo(0, document.body.scrollHeight);
    }
  })
)(Game)
