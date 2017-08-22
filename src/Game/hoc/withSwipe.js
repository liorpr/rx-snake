import React from 'react';
import Swipeable from 'react-swipeable';

export default Component => ({onSwipe, ...props}) => (
  <Swipeable
    style={{touchAction: 'none'}}
    onSwipedUp={() => onSwipe('SwipedUp')}
    onSwipedRight={() => onSwipe('SwipedRight')}
    onSwipedDown={() => onSwipe('SwipedDown')}
    onSwipedLeft={() => onSwipe('SwipedLeft')}
    trackMouse
  >
    <Component {...props}/>
  </Swipeable>
);
