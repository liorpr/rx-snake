import React from 'react';
import PropTypes from 'prop-types';
import Dot from './Dot';
import Point from './utils/Point';

const Snake = ({ shape, ...props }) => (
  <div>
    {
      shape.map((point) => <Dot key={point.uuid} {...props} point={point}/>)
    }
  </div>
);

Snake.propTypes = {
  shape: PropTypes.arrayOf(PropTypes.instanceOf(Point)).isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

export default Snake;
