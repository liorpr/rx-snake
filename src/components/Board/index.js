import React from 'react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';
import R from 'ramda';
import Logo from '../Logo';
import Candy from './Candy';
import Players from './Players';

const Wrapper = glamorous.div(({ width, height }) => ({
  width: width,
  height: height,
  background: 'white',
  position: 'relative',
  overflow: 'hidden',
}));

const Board = ({ children, size, candy, current, colors, ...props }) => (
  <Wrapper {...props}>
    <Logo style={{ opacity: 0.2 }}/>
    <Players size={size} current={current} colors={colors} />
    {children}
    <Candy size={size} point={candy} />
  </Wrapper>
);

export default connect(R.pickAll(['width', 'height', 'size', 'candy']))(Board);
