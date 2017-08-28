import React from 'react';
import Swipeable from 'react-swipeable';

export default (containerStyle = {}) => Component => ({onSwipe, ...props}) => (
  <Swipeable
    style={{touchAction: 'none', ...containerStyle}}
    onSwipingUp={() => onSwipe('SwipeUp')}
    onSwipingRight={() => onSwipe('SwipeRight')}
    onSwipingDown={() => onSwipe('SwipeDown')}
    onSwipingLeft={() => onSwipe('SwipeLeft')}
  >
    <Component {...props}/>
  </Swipeable>
);
