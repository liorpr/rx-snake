import { lifecycle, mapProps, compose } from 'recompose';
import R from 'ramda';
import Hammer from 'hammerjs';
import KeyCodes from '../utils/KeyCodes';

const events = {
  swiperight: KeyCodes.swipeRight,
  swipeleft: KeyCodes.swipeLeft,
  swipeup: KeyCodes.swipeUp,
  swipedown: KeyCodes.swipeDown,
  doubletap: KeyCodes.space,
};

export default elementId => compose(
  lifecycle({
    componentDidMount() {
      const onSwipe = direction => () => {
        this.props.onSwipe(direction);
      };

      this.hammer = new Hammer(document.getElementById(elementId));
      this.hammer.get('swipe').set({
        direction: Hammer.DIRECTION_ALL,
        threshold: 5,
        velocity: 0.2,
      });

      Object.keys(events).forEach(event => this.hammer.on(event, onSwipe(events[event])));
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
