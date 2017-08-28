import React from 'react';
import PropTypes from 'prop-types';
import pointShape from './Game/utils/pointShape';
import withLocation from './hoc/withLocation';
import candy from './resources/candy.png';

const Candy = withLocation(({ style }) => <img src={candy} style={style} alt=""/>);

Candy.propTypes = {
  point: pointShape.isRequired,
  size: PropTypes.number.isRequired,
};

export default Candy;
