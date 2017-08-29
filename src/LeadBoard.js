import React from 'react';
import { createEventHandler, mapPropsStream } from 'recompose';
import firebase from 'firebase';
import './utils/initFirebase';

const Score = ({ name, score }) => (
  <div>name: {name}, score:{score}</div>
);

const LeadBoard = ({ scores }) => (
  <div>
    {
      Object.entries(scores).map(([playerId, playerData]) => <Score key={playerId} {...playerData}/>)
    }
  </div>
);

export default mapPropsStream(() => {
  const { handler: onTopScores, stream: onTopScores$ } = createEventHandler();

  const scoresQuery = firebase.database().ref('game/players')
    .orderByChild('score')
    .limitToLast(10);

  scoresQuery.on('value', onTopScores);

  return onTopScores$
    .map(x => x.val())
    .startWith({})
    .map(scores => ({ scores }))
    .finally(() => scoresQuery.off('value', onTopScores));
})(LeadBoard);
