import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import pointShape from './Game/utils/pointShape';
import withLocation from './hoc/withLocation';
import candy from './resources/candy.png';

const Candy = ({ style }) => <img src={candy} style={style} alt=""/>;

Candy.propTypes = {
  point: pointShape.isRequired,
  size: PropTypes.number.isRequired,
};

export default compose(
  connect(({candy, size}) => ({point: candy, size})),
  withLocation,
)(Candy);
