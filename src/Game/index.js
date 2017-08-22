import React from 'react';
import {createEventHandler, componentFromStream} from 'recompose';
import firebase from 'firebase';
import R from 'ramda';
import Rx from 'rxjs';
import Board from './Board';
import withKeyDown from "./hoc/withKeyDown";
import Point from './utils/Point';
import GameState from './utils/GameState';
import './utils/initFirebase';

const gameRef = firebase.database().ref('game');
const candyRef = gameRef.child('candy');
const sizeRef = gameRef.child('size');

const BoardWithKeyDown = withKeyDown(Board);

const KeyCodes = {
  enter: 'Enter',
  space: 'Space',
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
};

function toDirection(keyCode) {
  switch (keyCode) {
    case KeyCodes.up:
      return [0, -1];
    case KeyCodes.down:
      return [0, 1];
    case KeyCodes.left:
      return [-1, 0];
    case KeyCodes.right:
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

const candy$ = new Rx.ReplaySubject(1);
candyRef.on('value', candy => candy$.next(Point.from(candy.val())));

const size$ = new Rx.ReplaySubject(1);
sizeRef.on('value', size => size$.next(size.val()));

export default componentFromStream(() => {
  const { handler: onKeyDown, stream: keyDown$ } = createEventHandler();

  const direction$ = keyDown$.map(toDirection)
    .filter(d => d.length === 2)
    .startWith([])
    .scan((prev, next) => {
      if ((prev[0] === next[0] || prev[1] === next[1])) return prev;
      return next;
    })
    .bufferTime(100)
    .mergeScan((prev, next) => {
      if (next.length === 0) return Rx.Observable.of(prev);
      return Rx.Observable.of(...next);
    });

  const start$ = keyDown$.filter(key => key === KeyCodes.enter)
    .startWith(1);

  const pause$ = keyDown$.filter(key => key === KeyCodes.space)
    .startWith(1)
    .scan(pause => !pause, true);

  return size$.first().mergeMapTo(start$)
    .switchMap(() =>
      size$.first().map(initGame).mergeMap(initialGame => {
        const playerRef = gameRef.child('players').push(initialGame);
        const current = playerRef.key;

        return direction$
          .withLatestFrom(candy$, size$, pause$, Array.of)
          .scan(play, initialGame)
          .distinctUntilChanged(R.equals)
          .do(({ snake, score, state }) =>
            playerRef.update({ snake: snake.map(R.pick(['x', 'y', 'belly'])), score, state })
          )
          .map(R.assoc('current', current))
          .finally(() => playerRef.child('state').set(GameState.ended));
      })
    )
    .withLatestFrom(size$, (game, size) => (
      <BoardWithKeyDown
        {...game}
        {...size}
        onKeyDown={onKeyDown}
        capture={Object.values(KeyCodes)}/>
    ))
    .startWith(<h1>Loading...</h1>)
});
