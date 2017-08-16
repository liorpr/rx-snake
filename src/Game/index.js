import React from 'react';
import {mapPropsStream, createEventHandler, compose} from 'recompose';
import R from 'ramda';
import Rx from 'rxjs';
import Board from './Board';
import withKeyDown from "./withKeyDown";
import Point from './utils/Point';

const width=60, height=80;

const KeyCodes = {
  enter: 'Enter',
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
};

function toDirection(keyCode){
  switch(keyCode){
    case KeyCodes.up: return [0,-1];
    case KeyCodes.down: return [0,1];
    case KeyCodes.left: return [-1,0];
    case KeyCodes.right: return [1,0];
    default: return [];
  }
}

const initialSnake = R.repeat(new Point(30, 40), 5);

const moveTo = direction => R.pipe(
  R.dropLast(1),
  R.converge(R.prepend, [([point]) => point.move(direction).wrap(width, height), R.identity]),
);

const move = R.flip(R.converge(R.call, [moveTo, R.nthArg(1)]));

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
    .scan(move, initialSnake)
    .map(snake => ({
      snake,
      onKeyDown,
      capture: Object.values(KeyCodes),
      width,
      height,
      candy: new Point(5,5),
    }));
});

export default compose(
  game,
  withKeyDown
)(Board)
