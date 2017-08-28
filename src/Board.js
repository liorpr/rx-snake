import React from 'react';
import glamorous from 'glamorous';
import { SOLUTO_BLUE } from "./resources/colors";

const Wrapper = glamorous.div({display: 'flex', height: '100vh'});
const Board = glamorous.div(({ width, height, size }) => ({
  width: width * size,
  height: height * size,
  background: 'white',
  border: `4px solid ${SOLUTO_BLUE}`,
  margin: 'auto',
  position: 'relative'
}));

export default ({...props, children}) => (
  <Wrapper>
    <Board {...props}>
      {children}
    </Board>
  </Wrapper>
)
