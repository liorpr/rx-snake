import { createEventHandler, mapPropsStream, compose } from 'recompose';
import { connect } from 'react-redux';
import firebase from 'firebase';
import R from 'ramda';
import { Observable } from 'rxjs';
import withKeyDown from '../../hoc/withKeyDown';
import withSwipe from '../../hoc/withSwipe';
import withEvent from '../../hoc/withEvent';
import withFullScreen from '../../hoc/withFullScreen';
import Point from '../../utils/Point';
import GameState from '../../utils/GameState';
import KeyCodes from '../../utils/KeyCodes';
import '../../utils/initFirebase';
import Game from './Game';

const snakesRef = firebase.database().ref('game/snakes2');
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
      R.range(0, 5),
    ),
    score: 0,
  };
}

function detectCollision(nextPoint, snake) {
  return snake.some(x => nextPoint.equals(x));
}

const game = mapPropsStream(props$ => {
  const { handler: onKeyDown, stream: keyDown$ } = createEventHandler();
  const { handler: onBlur, stream: onBlur$ } = createEventHandler();

  const sharedProps$ = props$.publishReplay(1).refCount();

  function play({ snake, state, score }, [direction, { candy, gameSize: { width, height } }, pause]) {
    const result = () => ({ snake, state, score, candy, direction });
    if (state === GameState.ended || direction.length !== 2) {
      if (pause) onKeyDown(KeyCodes.enter);
      return result();
    }

    if (pause) {
      state = GameState.paused;
      return result();
    }

    let nextPoint = snake[0].move(direction).wrap(width, height);

    if (nextPoint.equals(candy)) {
      nextPoint = nextPoint.inflate();
      candy = Point.random(width, height);
      candyRef.set(R.pick(['x', 'y'], candy));
      score++;
    } else {
      snake = R.dropLast(1, snake);
    }

    if (detectCollision(nextPoint, snake)) {
      state = GameState.ended;
    } else {
      state = GameState.running;
    }

    snake = R.prepend(nextPoint, snake);

    return result();
  }

  const direction$ = keyDown$.map(toDirection)
    .filter(d => d.length === 2)
    .startWith([])
    .scan((prev, next) => {
      if ((prev[0] === next[0] || prev[1] === next[1])) return prev;
      return next;
    })
    .bufferTime(80)
    .map(R.dropRepeats)
    .mergeScan((prev, next) => {
      if (next.length === 0) return Observable.of(prev);
      return Observable.of(...next);
    });

  const pause$ = keyDown$.filter(key => key === KeyCodes.space)
    .merge(onBlur$.map(_ => 'blur'))
    .startWith(false)
    .scan((prev, next) => {
      if (next === 'blur') return true;
      if (next && document.webkitFullscreenEnabled && !document.webkitFullscreenElement) {
        document.documentElement.webkitRequestFullscreen();
        return prev;
      }
      return !prev;
    }, true);

  const play$ = sharedProps$.first().map(initSnake)
    .mergeMap(initialSnake => {
      const snakeRef = snakesRef.push();
      const current = snakeRef.key;

      snakeRef.onDisconnect().update({ state: GameState.ended });

      return direction$
        .withLatestFrom(sharedProps$, pause$, Array.of)
        .scan(play, initialSnake)
        .distinctUntilChanged(R.equals)
        .do(({ snake, score, state, direction }) => {
          if (state === GameState.loaded) return;
          snakeRef.update({
            snake: JSON.stringify(snake),
            score,
            state,
            direction,
            updated: ~~((new Date()).getTime() / 1000),
          });
        })
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
      onBlur,
      capture: R.values(KeyCodes),
    }));
});

export default compose(
  connect(state => state),
  game,
  withKeyDown,
  withSwipe,
  withEvent('blur', 'onBlur'),
  withFullScreen,
)(Game);
