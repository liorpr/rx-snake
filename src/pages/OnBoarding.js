import React from 'react';
import firebase from 'firebase';
import glamorous, { Div } from 'glamorous';
import { withRouter } from 'react-router';
import { compose, mapProps, withState, lifecycle } from 'recompose';
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

const OnBoarding = ({ name, setName, startGame }) => (
  <Container>
    <a href="https://www.solutotlv.com/" target="_blank" rel="noopener noreferrer"><Logo/></a>
    <Img src={intro}/>
    <div>
      <Input placeholder="Your name goes here" value={name} onChange={e => setName(e.target.value)}/>
      <Div fontSize="0.3em" visibility={name.length > maxNameLength ? null : 'hidden'}>
        * Name must be max {maxNameLength} characters
      </Div>
    </div>
    <Button disabled={name === '' || name.trim().length > maxNameLength} onClick={startGame}>
      Game on!
    </Button>
  </Container>
);

export default compose(
  withRouter,
  withState('name', 'setName', ''),
  lifecycle({
    componentWillMount() {
      this.props.setName(localStorage.getItem('name') || '');
    },
  }),
  mapProps(({ history, ...props, name }) => ({
    ...props,
    startGame() {
      name = name.trim();
      const players = firebase.database().ref('game/players');

      if (global.playerId) {
        players.child(global.playerId)
          .child('name')
          .set(name);
      } else {
        global.playerId = players.push({ name }).key;
        localStorage.setItem('playerId', global.playerId);
      }

      localStorage.setItem('name', name);
      history.push('/play');

      if (document.webkitFullscreenEnabled) {
        document.documentElement.webkitRequestFullscreen();
      }
    },
  })),
)(OnBoarding);
