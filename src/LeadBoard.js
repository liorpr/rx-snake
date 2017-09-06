import React from 'react';
import { createEventHandler, mapPropsStream } from 'recompose';
import R from 'ramda';
import firebase from 'firebase';
import glamorous from 'glamorous';
import { SOLUTO_BLUE } from "./resources/colors";

const Wrapper = glamorous.div({
  background: SOLUTO_BLUE,
  color: 'white',
  padding: '0.2em 0',
  width: '100%',
});

const Container = glamorous.div({
  margin: 'auto',
  display: 'flex',
  position: 'relative',
  width: 'fit-content',
});

const Title = glamorous.div({
  position: 'absolute',
  top: 'calc(0.8vmin - 100%)',
  opacity: 0.6,
  color: SOLUTO_BLUE,
});

const List = glamorous.ul({
  display: 'flex',
  alignItems: 'center',
  listStyleType: 'none',
  margin: 0,
  padding: 0,
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
    <Container>
      <Title>Who's Hot?</Title>
      <List>
        {
          renderScores(scores)
        }
      </List>
    </Container>
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
