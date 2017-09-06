import React from 'react';
import { createEventHandler, mapPropsStream } from 'recompose';
import R from 'ramda';
import firebase from 'firebase';
import glamorous from 'glamorous';
import { SOLUTO_BLUE } from "./resources/colors";

const Wrapper = glamorous.ul({
  background: SOLUTO_BLUE,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  padding: '0.2em 0',
  listStyleType: 'none',
  width: '100%',
});

const Score = glamorous.li({
  listStyleType: 'none',
  ':not(:first-of-type):before': {
    content: '"|"',
    margin: '0 0.3em',
  }
});

const renderScores = R.pipe(
  R.toPairs,
  R.sort(R.descend(([_, { score }]) => score)),
  R.map(([playerId, { name, score }]) => <Score key={playerId}>{name} {score}</Score>)
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
    .limitToLast(5);

  scoresQuery.on('value', onTopScores);

  return onTopScores$
    .map(x => x.val())
    .startWith({})
    .map(scores => ({ scores }))
    .finally(() => scoresQuery.off('value', onTopScores));
})(LeadBoard);
