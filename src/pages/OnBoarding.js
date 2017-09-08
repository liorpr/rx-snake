import React from 'react';
import firebase from 'firebase';
import R from 'ramda';
import glamorous, { Div } from 'glamorous';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { setName } from '../store/reducer';
import { SOLUTO_BLUE, SOLUTO_GRAY } from '../resources/colors';
import intro from '../resources/intro.gif';
import Logo from '../components/Logo';

const maxNameLength = 15;

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '3em 0',
  height: '100vmin',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  fontWeight: 'bold',
});

const Input = glamorous.input({
  fontSize: '4vmin',
  color: SOLUTO_BLUE,
  borderStyle: 'solid',
  borderColor: 'rgba(102, 102, 102, 0.4)',
  borderWidth: '0 0 0.08em 0',
  borderRadius: 0,
  textAlign: 'center',
  minWidth: '12em',
  ':focus': { outline: 0 },
  '::-webkit-input-placeholder': {
    fontStyle: 'italic',
    color: SOLUTO_BLUE,
    opacity: 0.4,
  },
});

const Button = glamorous.button({
  fontSize: '6vmin',
  fontWeight: 'bold',
  color: 'white',
  background: SOLUTO_BLUE,
  padding: '0.5em 1.5em',
  borderRadius: '2em',
  border: 'none',
  cursor: 'pointer',
  ':focus': { outline: 0 },
  ':disabled': {
    background: SOLUTO_GRAY,
    opacity: 0.4,
    cursor: 'default',
  },
});

const Img = glamorous.img({
  height: '40vmin',
  marginTop: '-10vmin',
  marginBottom: '-3vmin',
});

const OnBoarding = ({ name, playerId, setName, history }) => (
  <Container>
    <Logo/>
    <Img src={intro}/>
    <div>
      <Input placeholder="Your name goes here" value={name} onChange={e => setName(e.target.value)}/>
      <Div fontSize="0.3em" visibility={name.length > maxNameLength ? null : 'hidden'}>* Name must be max {maxNameLength} characters</Div>
    </div>
    <Button disabled={name === '' || name.trim().length > maxNameLength} onClick={() => {
      firebase.database().ref('game/players')
        .child(playerId)
        .child('name')
        .set(name.trim());

      history.push('/play');

      if (document.webkitFullscreenEnabled) {
        document.documentElement.webkitRequestFullscreen();
      }
    }}>Game on!</Button>
  </Container>
);

export default compose(
  connect(R.pick(['name', 'playerId']), { setName }),
  withRouter,
)(OnBoarding);
