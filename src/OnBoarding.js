import React from 'react';
import firebase from 'firebase';
import glamorous from 'glamorous';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { setName } from "./store/reducer";
import { SOLUTO_BLUE } from "./resources/colors";

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '20vh 0',
  height: '100vh',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  fontSize: '6vh',
  fontWeight: 'bold',
});

const Input = glamorous.input({
  fontSize: '6vh',
  color: SOLUTO_BLUE,
  borderStyle: 'solid',
  borderColor: SOLUTO_BLUE,
  borderWidth: '0 0 0.4vh 0',
  ':focus': { outline: 0 },
});

const Button = glamorous.button({
  fontSize: '6vh',
  color: 'white',
  background: SOLUTO_BLUE,
  padding: '2vh 15vh',
  borderRadius: '8vh',
  border: 'none',
  cursor: 'pointer',
  ':focus': { outline: 0 },
});

const OnBoarding = ({ name, playerId, setName, push }) => (
  <Container>
    <label>What is your good name?</label>
    <Input value={name} onChange={e => setName(e.target.value)}/>
    <Button onClick={() => {
      firebase.database().ref('game/players')
        .child(playerId)
        .child('name')
        .set(name);

      push('/play');
    }}>Game on!</Button>
  </Container>
);

export default connect(state => state, { setName, push })(OnBoarding);
