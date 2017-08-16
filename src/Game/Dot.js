import React from 'react';
import PropTypes from 'prop-types';
import Point from './utils/Point';

const Dot = ({ size, point, color }) => (
  <div style={{
    width: size,
    height: size,
    left: point.x * size,
    top: point.y * size,
    backgroundColor: color,
    position: 'absolute',
    borderRadius: '50%',
  }} />
);

Dot.propTypes = {
  point: PropTypes.instanceOf(Point).isRequired,
  size: PropTypes.number,
  color: PropTypes.string, 
};

Dot.defaultProps = {
  size: 8,
  color: '#FFFFFF'
};

export default Dot;
