import { lifecycle, mapProps, compose } from 'recompose';
import R from 'ramda';
import Hammer from 'hammerjs';

export default compose(
  lifecycle({
    componentDidMount() {
      const onSwipe = direction => () => {
        this.props.onSwipe(direction);
      };

      this.hammer = new Hammer(document.documentElement);
      this.hammer.get('swipe').set({
        direction: Hammer.DIRECTION_ALL,
        threshold: 5,
        velocity: 0.2,
      });
      this.hammer.on('swiperight', onSwipe('SwipeRight'));
      this.hammer.on('swipeleft', onSwipe('SwipeLeft'));
      this.hammer.on('swipeup', onSwipe('SwipeUp'));
      this.hammer.on('swipedown', onSwipe('SwipeDown'));
      this.hammer.on('doubletap', onSwipe('Space'));
    },
    componentWillUnmount() {
      if (this.hammer) {
        this.hammer.stop();
        this.hammer.destroy();
      }
      this.hammer = null;
    },
  }),
  mapProps(R.dissoc('onSwipe')),
);
