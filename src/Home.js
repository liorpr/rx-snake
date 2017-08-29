import React from 'react';
import { connect } from 'react-redux';
import colors from './resources/colors';
import Board from './Board';
import Candy from './Candy';
import Players from './Players';
import LeadBoard from './LeadBoard';

const Home = ({ size, candy }) => (
  <div>
    <Board>
      <Players size={size} colors={colors}/>
      <Candy/>
    </Board>
    <LeadBoard/>
  </div>
);

export default connect(state => state)(Home);
