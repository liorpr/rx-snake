import React from 'react';
import Swipeable from 'react-swipeable';

export default Component => ({onSwipe, ...props}) => (
  <Swipeable
    onSwipedUp={() => onSwipe('SwipedUp')}
    onSwipedRight={() => onSwipe('SwipedRight')}
    onSwipedDown={() => onSwipe('SwipedDown')}
    onSwipedLeft={() => onSwipe('SwipedLeft')}
  >
    <Component {...props}/>
  </Swipeable>
);
