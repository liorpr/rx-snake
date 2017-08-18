import React from 'react';
import PropTypes from 'prop-types';
import pointShape from './pointShape';

const BELLY = 1.5;
const ADJUST = (BELLY - 1) / 2;

function getStyle({ point: { belly, x, y }, size, color }) {
  const displaySize =  belly ? BELLY * size : size;
  const adjustLocation = belly ? ADJUST * size : 0;
  return {
    width: displaySize,
    height: displaySize,
    left: x * size - adjustLocation,
    top: y * size - adjustLocation,
    backgroundColor: color,
    position: 'absolute',
    borderRadius: '50%',
  }
}

const Dot = props => <div style={getStyle(props)} />;

Dot.propTypes = {
  point: pointShape.isRequired,
  size: PropTypes.number,
  color: PropTypes.string, 
};

Dot.defaultProps = {
  size: 8,
  color: '#FFFFFF'
};

export default Dot;
