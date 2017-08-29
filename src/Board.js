import React from 'react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';
import R from 'ramda';

const Board = glamorous.div(({ width, height }) => ({
  width: width,
  height: height,
  background: 'white',
  margin: 'auto',
  position: 'relative',
  overflow: 'hidden',
}));

export default connect(R.pickAll(['width', 'height']))(Board);
