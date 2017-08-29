import React from 'react';
import { connect } from 'react-redux';
import Board from './Board';
import Candy from './Candy';
import Players from './Players';
import colors from './resources/colors';

const Home = ({size, candy}) => (
  <Board>
    <Players size={size} colors={colors}/>
    <Candy />
  </Board>
);

export default connect(state => state)(Home);
