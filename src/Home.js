import React from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import colors from './resources/colors';
import Board from './Board';
import Candy from './Candy';
import Players from './Players';
import LeadBoard from './LeadBoard';
import qrCode from './resources/qr-code.png'

const MainWrapper = glamorous.div({
  background: '#666',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  overflow: 'hidden',
  boxSizing: 'border-box',
});

const GameWrapper = glamorous.div({
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  padding: '0 2vmin',
});

const SideBar = glamorous.div({
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  padding: '4vmin 0 0 0',
  marginLeft: '2vmin',
});

const MeetupInfo = glamorous.div({
  fontSize: '4vmin',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '6vmin',
});

const Img = glamorous.img({
  width: '35vmin',
  margin: '2vmin 0',
});

const Home = ({ size, candy }) => (
  <MainWrapper>
    <GameWrapper>
      <Board style={{ zoom: 0.76 }}>
        <Players size={size} colors={colors}/>
        <Candy/>
      </Board>
      <SideBar>
        <span><strong>Soluto</strong> Snake</span>
        <Img src={qrCode}/>
        <span>Scan to play!</span>
        <MeetupInfo>
          <span>Join our Rx meetup</span>
          <span><strong>@2/10/2017</strong></span>
          <span>and see how this</span>
          <span>game was made</span>
        </MeetupInfo>
      </SideBar>
    </GameWrapper>
    <LeadBoard/>
  </MainWrapper>
);

export default connect(state => state)(Home);
