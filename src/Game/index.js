import React from 'react';
import {mapPropsStream, createEventHandler, compose} from 'recompose';
import firebase from 'firebase';
import R from 'ramda';
import Rx from 'rxjs';
import Board from './Board';
import withKeyDown from "./withKeyDown";
import Point from './utils/Point';
import GameState from './utils/GameState';
import './utils/initFirebase';

const candyRef = firebase.database().ref('game/candy');
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

function initialState() {
  return {
    state: GameState.loaded,
    snake: R.repeat(new Point(width / 2, height / 2), 5),
    score: 0,
  }
}

function detectCollision(snake) {
  return snake.slice(1).some(x => snake[0].equals(x));
}

function play({ snake, state, score }, [direction, candy]) {
  if (state === GameState.ended || direction.length !== 2) return { snake, candy, state, score };

  const nextPoint = snake[0].move(direction).wrap(width, height);
  snake = R.prepend(nextPoint, snake);
  state = GameState.running;

  if (nextPoint.equals(candy)) {
    snake = R.adjust(p => p.inflate(), 0, snake);
    candy = spawnCandy();
    candyRef.set(candy);
    score++;
  } else {
    snake = R.dropLast(1, snake);
  }

  if (detectCollision(snake)) {
    state = GameState.ended;
  }

  return { snake, candy, state, score };
}

const candy$ = new Rx.ReplaySubject(1);
candyRef.on('value', candy => candy$.next(Point.from(candy.val())));

const game = mapPropsStream(() => {
  const { handler: onKeyDown, stream: keyDown$ } = createEventHandler();

  const start$ = keyDown$.filter(key => key === KeyCodes.enter)
    .startWith(1);

  const direction$ = keyDown$.map(toDirection)
    .filter(d => d.length === 2)
    .startWith([]);

  return start$.switchMap(() => Rx.Observable.interval(100)
      .withLatestFrom(direction$, (_, direction) => direction)
      .scan((prev, next) => {
        if (prev[0] === next[0] || prev[1] === next[1]) return prev;
        return next;
      })
      .withLatestFrom(candy$, (direction, candy) => [direction, candy])
      .scan(play, initialState())
    )
    .map(game => ({
      ...game,
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
