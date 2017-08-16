import React from 'react';
import PropTypes from 'prop-types';
import Point from './utils/Point';

const Dot = ({ size, point, color }) => (
  <div style={{
    width: point.size * size,
    height: point.size * size,
    left: point.x * size - (((point.size - 1) / 2) * size),
    top: point.y * size - (((point.size - 1) / 2) * size),
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
