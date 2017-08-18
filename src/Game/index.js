import React from 'react';
import {createEventHandler, componentFromStream} from 'recompose';
import firebase from 'firebase';
import R from 'ramda';
import Rx from 'rxjs';
import Board from './Board';
import withKeyDown from "./withKeyDown";
import Point from './utils/Point';
import GameState from './utils/GameState';
import './utils/initFirebase';

const gameRef = firebase.database().ref('game');
const candyRef = gameRef.child('candy');
const sizeRef = gameRef.child('size');

const BoardWithKeyDown = withKeyDown(Board);

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

function initialState({ width, height }) {
  return {
    state: GameState.loaded,
    snake: R.map(
      () =>  new Point(width / 2, height / 2),
      R.range(0, 5)
    ),
    score: 0,
  }
}

function detectCollision(snake) {
  return snake.slice(1).some(x => snake[0].equals(x));
}

function play({ snake, state, score, playerRef }, [direction, candy, { width, height }]) {
  if (state === GameState.ended || direction.length !== 2) return { snake, candy, state, score, playerRef };

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

  if (score > 0) {
    playerRef = playerRef || gameRef.child('players').push();
    playerRef.update({ snake: snake.map(R.pick(['x', 'y', 'size'])), score, state })
  }

  return { snake, candy, state, score, playerRef };
}

const candy$ = new Rx.ReplaySubject(1);
candyRef.on('value', candy => candy$.next(Point.from(candy.val())));

const size$ = new Rx.ReplaySubject(1);
sizeRef.on('value', size => size$.next(size.val()));

export default componentFromStream(() => {
  const { handler: onKeyDown, stream: keyDown$ } = createEventHandler();

  const direction$ = keyDown$.map(toDirection)
    .filter(d => d.length === 2)
    .startWith([]);

  return size$.first().mergeMapTo(keyDown$.filter(key => key === KeyCodes.enter).startWith(1))
    .withLatestFrom(size$, (_, size) => initialState(size))
    .switchMap(initialState => Rx.Observable.interval(100)
      .withLatestFrom(direction$, (_, direction) => direction)
      .scan((prev, next) => {
        if (prev[0] === next[0] || prev[1] === next[1]) return prev;
        return next;
      })
      .withLatestFrom(candy$, size$, Array.of)
      .scan(play, initialState)
    )
    .withLatestFrom(size$, Array.of)
    .map(([game, size]) => ({
      ...game,
      ...size,
      onKeyDown,
      capture: Object.values(KeyCodes),
    }))
    .startWith({})
    .map(props => {
      if ('snake' in props) {
        return <BoardWithKeyDown {...props}/>;
      }
      return <h1>Loading...</h1>;
    })
});
