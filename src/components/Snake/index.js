import React from 'react';
import PropTypes from 'prop-types';
import pointShape from '../../utils/pointShape';
import SnakePart from './SnakePart';

const Snake = ({ shape, ...props }) => (
  <div>
    {
      shape.map((point, index) => <SnakePart key={index} {...props} point={point} index={index} style={{ zIndex: 1 }}/>)
    }
  </div>
);

Snake.propTypes = {
  shape: PropTypes.arrayOf(pointShape).isRequired,
  direction: PropTypes.arrayOf(PropTypes.number).isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

export default Snake;
