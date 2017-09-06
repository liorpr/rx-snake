import React from 'react';
import { connect } from 'react-redux';
import glamorous, { Span, Td, Img } from 'glamorous';
import colors from './resources/colors';
import Board from './Board';
import Candy from './Candy';
import Players from './Players';
import LeadBoard from './LeadBoard';
import qrCode from './resources/qr-code.png'

const Grid = glamorous.div({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  gridTemplateRows: 'auto auto 1fr auto',
  gridTemplateAreas: `
      ". . header"
      "game . sidebar"
      ". . ."
      "leadBoard leadBoard leadBoard"
    `,
  color: 'white',
  background: '#666',
  height: '100vh',
  boxSizing: 'border-box',
});

const HeaderArea = glamorous.div({
  gridArea: 'header',
  margin: '2vmin 2vmin 1vmin 0',
});

const GameArea = glamorous.div({
  gridArea: 'game',
  marginLeft: '2vmin',
});

const SideBar = glamorous.div({
  gridArea: 'sidebar',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginRight: '2vmin',
});

const LeadBoardArea = glamorous.div({
  gridArea: 'leadBoard',
});

const MeetupInfo = glamorous.div({
  fontSize: '4vmin',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '11vmin',
});

const Home = ({ size, candy }) => (
  <Grid>
    <HeaderArea><strong>Soluto</strong> Snake</HeaderArea>
    <GameArea>
      <Board style={{ zoom: 0.76 }}>
        <Players size={size} colors={colors}/>
        <Candy/>
      </Board>
    </GameArea>
    <SideBar>
      <Img width="35vmin" src={qrCode}/>
      <Span marginTop="2vmin">Scan to play!</Span>
      <MeetupInfo>
        <span>Join our Rx meetup</span>
        <span><strong>@2/10/2017</strong></span>
        <span>and see how this</span>
        <span>game was made</span>
      </MeetupInfo>
    </SideBar>
    <LeadBoardArea><LeadBoard/></LeadBoardArea>
  </Grid>
);

export default connect(state => state)(Home);
