import React from 'react';
import {mapPropsStream, createEventHandler, compose} from 'recompose';
import R from 'ramda';
import Rx from 'rxjs';
import Board from './Board';
import withKeyDown from "./withKeyDown";
import Point from './utils/Point';

const width = 80, height = 60;

const KeyCodes = {
  enter: 'Enter',
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

const spawnCandy = () => Point.random(width, height);
const initialSnake = R.repeat(new Point(width / 2, height / 2), 5);

function move({ snake, candy }, direction) {
  if (direction.length !== 2) return { snake, candy };

  const nextPoint = snake[0].move(direction).wrap(width, height);
  snake = R.prepend(nextPoint, snake);

  if (nextPoint.equals(candy)) {
    snake = R.adjust(p => p.inflate(), 0, snake);
    candy = spawnCandy();
  } else {
    snake = R.dropLast(1, snake);
  }

  return { snake, candy };
}

const game = mapPropsStream(() => {
  const { handler: onKeyDown, stream: keyDown$ } = createEventHandler();

  const direction$ = keyDown$.map(toDirection)
    .filter(d => d.length === 2)
    .scan((prev, next) => {
      if (prev[0] === next[0] || prev[1] === next[1]) return prev;
      return next;
    })
    .distinctUntilChanged(R.equals)
    .startWith([]);

  return Rx.Observable.interval(100)
    .withLatestFrom(direction$, (_, direction) => direction)
    .scan(move, { snake: initialSnake, candy: spawnCandy() })
    .map(snake => ({
      ...snake,
      onKeyDown,
      capture: Object.values(KeyCodes),
      width,
      height,
    }));
});

export default compose(
  game,
  withKeyDown
)(Board)
