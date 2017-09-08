import React from 'react';
import withLocation from '../../hoc/withLocation';
import candy from '../../resources/candy.png';

const Candy = ({ style }) => <img src={candy} style={{...style, zIndex: 3}} alt=""/>;

export default withLocation(Candy);
