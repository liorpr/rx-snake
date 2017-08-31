import React from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import colors, { SOLUTO_BLUE } from './resources/colors';
import Board from './Board';
import Candy from './Candy';
import Players from './Players';
import LeadBoard from './LeadBoard';

const Wrapper = glamorous.div({
  background: SOLUTO_BLUE,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  'alignItems': 'center',
})

const Home = ({ size, candy }) => (
  <Wrapper>
    <Board style={{zoom:0.8}}>
      <Players size={size} colors={colors}/>
      <Candy/>
    </Board>
    <LeadBoard/>
  </Wrapper>
);

export default connect(state => state)(Home);
