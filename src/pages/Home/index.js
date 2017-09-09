import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import R from 'ramda';
import glamorous, { Span, Img } from 'glamorous';
import colors, { SOLUTO_GRAY } from '../../resources/colors';
import qrCode from '../../resources/qr-code.png';
import withFirebase from '../../hoc/withFirebase';
import Board from '../../components/Board';
import LeadBoard from './LeadBoard';

const Wrapper = glamorous.div({
  color: 'white',
  background: SOLUTO_GRAY,
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

const Home = ({ size, candy, meetupDate }) => (
  <Wrapper>
    <Grid>
      <Header><strong>Soluto</strong> Snake</Header>
      <CallToAction>
        <Span>Scan to play!</Span>
        <Img width="25vmin" src={qrCode}/>
        <Span fontSize="2.5vmin">https://goo.gl/nADJAu</Span>
      </CallToAction>
      {meetupDate ?
        <MeetupInfo>
          <span>Join our Rx meetup</span>
          <span><strong>@{meetupDate}</strong></span>
          <span>and see how this</span>
          <span>game was made</span>
        </MeetupInfo>
        : null}
      <GameArea>
        <Board style={{ zoom: 0.834 }} colors={colors}/>
        <LeadBoard/>
      </GameArea>
    </Grid>
  </Wrapper>
);

export default compose(
  connect(R.pick(['candy', 'size'])),
  withFirebase('meetup', 'meetupDate'),
)(Home);
