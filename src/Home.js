import React from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import colors, { SOLUTO_BLUE } from './resources/colors';
import Board from './Board';
import Candy from './Candy';
import Players from './Players';
import LeadBoard from './LeadBoard';
import qrCode from './resources/qr-code.png'

const MainWrapper = glamorous.div({
  background: SOLUTO_BLUE,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  overflow: 'hidden',
  padding: '1em 0',
  boxSizing: 'border-box',
});

const GameWrapper = glamorous.div({
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 0.5em',
});

const Img = glamorous.img({
  width: '40vmin',
  marginLeft: '0.5em',
});

const Home = ({ size, candy }) => (
  <MainWrapper>
    <GameWrapper>
      <Board style={{ zoom: 0.8 }}>
        <Players size={size} colors={colors}/>
        <Candy/>
      </Board>
      <Img src={qrCode}/>
    </GameWrapper>
    <LeadBoard/>
  </MainWrapper>
);

export default connect(state => state)(Home);
