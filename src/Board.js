import React from 'react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';
import R from 'ramda';
import Logo from './Logo';

const Wrapper = glamorous.div(({ width, height }) => ({
  width: width,
  height: height,
  background: 'white',
  position: 'relative',
  overflow: 'hidden',
}));

const Board = connect(R.pickAll(['width', 'height']))(({ children, ...props }) => (
  <Wrapper {...props}>
    <Logo />
    {children}
  </Wrapper>
))

Board.displayName = 'Board';

export default Board;
