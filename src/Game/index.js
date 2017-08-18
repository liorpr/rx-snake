import React from 'react';
import {createEventHandler, componentFromStream} from 'recompose';
import firebase from 'firebase';
import R from 'ramda';
import Rx from 'rxjs';
import Board from './Board';
import withKeyDown from "./withKeyDown";
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
      () => ({ x: width / 2, y: height / 2 }),
      R.range(0, 5)
    ),
    score: 0,
  }
}

const candy$ = new Rx.ReplaySubject(1);
candyRef.on('value', candy => candy$.next(candy.val()));

const size$ = new Rx.ReplaySubject(1);
sizeRef.on('value', size => size$.next(size.val()));

export default componentFromStream(() => {
  const { handler: onKeyDown, stream: keyDown$ } = createEventHandler();

  const direction$ = keyDown$.map(toDirection)
    .filter(d => d.length === 2);

  const start$ = keyDown$.filter(key => key === KeyCodes.enter)
    .startWith(1);

  return size$.first()
    .switchMapTo(start$)
    .withLatestFrom(size$, R.nthArg(1))
    .switchMap(size => {
      const onGame$ = new Rx.ReplaySubject(1);
      const onGame = x => onGame$.next(x.val());

      const playerRef = gameRef.child('players').push(initialState(size));
      playerRef.on('value', onGame);

      return Rx.Observable.combineLatest(
        Rx.Observable.interval(100).withLatestFrom(direction$, R.nthArg(1)).startWith([]),
        onGame$,
        )
        .scan(([prev], [next, ...rest]) => {
          if (prev[0] === next[0] || prev[1] === next[1]) return [prev, ...rest];
          return [next, ...rest];
        })
        .do(([[x, y], { snake, state }]) => {
          if (state === GameState.ended || x === undefined || y === undefined) return;
          const nextPoint = R.mergeWith(R.add, snake[0], { x, y });
          playerRef.child('next').set(nextPoint);
        })
        .pluck(1)
        .finally(() => playerRef.off('value', onGame));
    })
    .withLatestFrom(size$, candy$, (game, size, candy) => (
      <BoardWithKeyDown
        {...game}
        {...size}
        candy={candy}
        onKeyDown={onKeyDown}
        capture={Object.values(KeyCodes)}
      />
    ))
    .startWith(<h1>Loading...</h1>);
});
