import React from 'react';
import withLocation from '../../hoc/withLocation';
import candy from '../../resources/candy.png';

const Candy = ({ style }) => <img src={candy} style={style} alt=""/>;

export default withLocation(Candy);
