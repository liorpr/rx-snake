import React from 'react';
import PropTypes from 'prop-types';
import pointShape from '../Game/utils/pointShape';
import SnakePart from './SnakePart';

const Snake = ({ shape, ...props }) => (
  <div>
    {
      shape.map((point, index) => <SnakePart key={point.uuid} {...props} point={point} index={index}/>)
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
