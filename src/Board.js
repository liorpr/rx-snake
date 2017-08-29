import React from 'react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';
import R from 'ramda';
import { SOLUTO_BLUE } from "./resources/colors";

const Wrapper = glamorous.div({ display: 'flex', height: '100vh' });
const Board = glamorous.div(({ width, height }) => ({
  width: width,
  height: height,
  background: 'white',
  border: `4px solid ${SOLUTO_BLUE}`,
  margin: 'auto',
  position: 'relative',
  overflow: 'hidden',
}));

export default connect(R.pickAll(['width', 'height']))(({ ...props, children }) => (
  <Wrapper>
    <Board {...props}>
      {children}
    </Board>
  </Wrapper>
));
