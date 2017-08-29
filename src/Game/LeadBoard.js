import React from 'react';
import {componentFromStream} from 'recompose';
import Rx from 'rxjs';
import R from 'ramda';
import firebase from 'firebase';
import '../utils/initFirebase';

const playersQuery = firebase.database().ref('game/players')
  .orderByChild('score')
  .limitToLast(10);

const topPlayers$ = new Rx.ReplaySubject(1);

playersQuery.on('value', x => topPlayers$.next(x.val()));

const mapScores = R.pipe(
  R.toPairs,
  R.map(R.applySpec({
    playerId: R.prop(0),
    score: R.path([1, 'score']),
  })),
  R.sort(R.descend(R.prop('score'))),
);

const Score = ({ playerId, score, highlight }) => (
  <div style={{background: highlight ? 'yellow' : undefined}}>playerId: {playerId}, score:{score}</div>
);

export default componentFromStream(props$ => {
  return props$.first().mergeMapTo(topPlayers$)
    .map(mapScores)
    .withLatestFrom(props$, (top, {current}) => (
      <div>
        {
          top.map(({ playerId, score }) => (
            <Score
              key={playerId}
              playerId={playerId}
              score={score}
              highlight={current === playerId}
            />
          ))
        }
      </div>
    ))
});

