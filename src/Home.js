import React from 'react';
import { compose, flattenProp, mapProps } from 'recompose';
import withFirebase from "./hoc/withFirebase";
import withWindowSize from "./hoc/withWindowSize";
import getPointSize from './utils/getPointSize';
import Board from './Board';
import Candy from './Candy';
import Players from './Players';
import colors from './resources/colors';

const Home = ({width, height, size, candy}) => (
  <Board {...{ width, height, size }}>
    <Players size={size} colors={colors}/>
    <Candy point={candy} size={size}/>
  </Board>
);

export default compose(
  withFirebase('game/config', 'config'),
  flattenProp('config'),
  withWindowSize,
  mapProps(({size: gameSize, windowSize,...props}) => ({
    ...gameSize,
    size: getPointSize(gameSize, windowSize),
    ...props,
  }))
)(Home);
