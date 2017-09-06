import React from 'react';
import firebase from 'firebase';
import glamorous, { Div } from 'glamorous';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { setName } from "./store/reducer";
import { SOLUTO_BLUE } from "./resources/colors";
import intro from './resources/intro.gif';
import Logo from './Logo';

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
  ':focus': { outline: 0 },
  '::-webkit-input-placeholder': {
    fontStyle: 'italic',
    color: SOLUTO_BLUE,
    opacity: 0.4,
  }
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
    background: '#666666',
    opacity: 0.4,
    cursor: 'default',
  },
});

const Img = glamorous.img({
  height: '40vmin',
  marginTop: '-10vmin',
  marginBottom: '-3vmin',
});

const OnBoarding = ({ name, playerId, setName, push }) => (
  <Container>
    <Logo/>
    <Img src={intro}/>
    <div>
      <Input placeholder="Your good name here" value={name} onChange={e => setName(e.target.value)}/>
      <Div fontSize="0.3em" visibility={name.length > 12 ? null : 'hidden'}>* Name must be max 12 characters</Div>
    </div>
    <Button disabled={name === '' || name.trim().length > 12} onClick={() => {
      firebase.database().ref('game/players')
        .child(playerId)
        .child('name')
        .set(name.trim());

      push('/play');
    }}>Game on!</Button>
  </Container>
);

export default connect(state => state, { setName, push })(OnBoarding);
