import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withLocation from '../hoc/withLocation';
import candy from '../resources/candy.png';

const Candy = ({ style }) => <img src={candy} style={style} alt=""/>;

export default compose(
  connect(({candy, size}) => ({point: candy, size})),
  withLocation,
)(Candy);
