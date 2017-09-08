import React from 'react';
import withLocation from '../../hoc/withLocation';
import Head from './Head';
import Body from './Body';
import Belly from './Belly';

const SnakePart = ({ index, ...props, point: { belly } }) => {
  let Part;
  if (index === 0) {
    Part = Head
  } else if (belly) {
    Part = Belly
  } else {
    Part = Body
  }

  return <Part {...props}/>
};

export default withLocation(SnakePart);
