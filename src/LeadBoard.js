import React from 'react';
import { createEventHandler, mapPropsStream } from 'recompose';
import R from 'ramda';
import firebase from 'firebase';
import glamorous from 'glamorous';
import { SOLUTO_BLUE } from "./resources/colors";

const Wrapper = glamorous.div({
  background: SOLUTO_BLUE,
  color: 'white',
});

const Score = ({ name, score }) => (
  <div>{name}: {score}</div>
);

const renderScores = R.pipe(
  R.toPairs,
  R.sort(R.descend(([_, { score}]) => score)),
  R.map(([playerId, playerData]) => <Score key={playerId} {...playerData}/>)
);

const LeadBoard = ({ scores }) => (
  <Wrapper>
    {
      renderScores(scores)
    }
  </Wrapper>
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
