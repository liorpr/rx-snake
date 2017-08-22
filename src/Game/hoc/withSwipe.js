import React from 'react';
import Swipeable from 'react-swipeable';

export default Component => ({onSwipe, ...props}) => (
  <Swipeable
    style={{touchAction: 'none'}}
    onSwipingUp={() => onSwipe('SwipeUp')}
    onSwipingRight={() => onSwipe('SwipeRight')}
    onSwipingDown={() => onSwipe('SwipeDown')}
    onSwipingLeft={() => onSwipe('SwipeLeft')}
    trackMouse
  >
    <Component {...props}/>
  </Swipeable>
);
