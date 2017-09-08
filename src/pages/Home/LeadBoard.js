import React from 'react';
import { createEventHandler, mapPropsStream } from 'recompose';
import R from 'ramda';
import firebase from 'firebase';
import glamorous from 'glamorous';
import { SOLUTO_BLUE } from '../../resources/colors';

const List = glamorous.ul({
  background: SOLUTO_BLUE,
  color: 'white',
  padding: '0.2em 0',
  margin: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  listStyleType: 'none',
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
  R.filter(([_, { name, score = 0 }]) => name && name !== '' && score > 0),
  R.sort(R.descend(([_, { score }]) => score)),
  R.map(([playerId, { name, score }]) => <Score key={playerId}>{name} {score}</Score>)
);

const LeadBoard = ({ scores }) => (
  <List>
    {
      renderScores(scores)
    }
  </List>
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
