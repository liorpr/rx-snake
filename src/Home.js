import React from 'react';
import { connect } from 'react-redux';
import glamorous, { Span, Img } from 'glamorous';
import colors from './resources/colors';
import Board from './Board';
import Candy from './Candy';
import Players from './Players';
import LeadBoard from './LeadBoard';
import qrCode from './resources/qr-code.png'

const Wrapper = glamorous.div({
  color: 'white',
  background: '#696969',
  height: '100vh',
  boxSizing: 'border-box',
  fontSize: '4vmin',
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
});

const Grid = glamorous.div({
  display: 'grid',
  gridTemplateColumns: 'auto 2vmin 1fr',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateAreas: `
      "header . game"
      "callToAction . game"
      "meetupInfo . game"
    `,
  padding: '2vmin',
});

const Header = glamorous.div({
  gridArea: 'header',
  // paddingTop: '0.8em',
});

const GameArea = glamorous.div({
  gridArea: 'game',
  alignSelf: 'end',
});

const CallToAction = glamorous.div({
  gridArea: 'callToAction',
  alignSelf: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const MeetupInfo = glamorous.div({
  gridArea: 'meetupInfo',
  alignSelf: 'end',
  fontSize: '3vmin',
  display: 'flex',
  flexDirection: 'column',
});

const Home = ({ size, candy }) => (
  <Wrapper>
    <Grid>
      <Header><strong>Soluto</strong> Snake</Header>
      <CallToAction>
        <Span>Scan to play!</Span>
        <Img width="25vmin" src={qrCode}/>
        <Span fontSize="2.5vmin">https://goo.gl/nADJAu</Span>
      </CallToAction>
      <MeetupInfo>
        <span>Join our Rx meetup</span>
        <span><strong>@2/10/2017</strong></span>
        <span>and see how this</span>
        <span>game was made</span>
      </MeetupInfo>
      <GameArea>
        <Board style={{ zoom: 0.834 }}>
          <Players size={size} colors={colors}/>
          <Candy/>
        </Board>
        <LeadBoard/>
      </GameArea>
    </Grid>
  </Wrapper>
);

export default connect(state => state)(Home);
