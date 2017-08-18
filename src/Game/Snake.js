import React from 'react';
import PropTypes from 'prop-types';
import Dot from './Dot';
import pointShape from './pointShape';

const Snake = ({ shape, ...props }) => (
  <div>
    {
      shape.map((point, i) => <Dot key={i} {...props} point={point}/>)
    }
  </div>
);

Snake.propTypes = {
  shape: PropTypes.arrayOf(pointShape).isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

export default Snake;
