import React from 'react';
import Hammer from 'hammerjs';

export default Component => class extends React.Component {
  state = {
    loaded: false,
  };

  componentWillUnmount() {
    if (this.hammer) {
      this.hammer.stop();
      this.hammer.destroy();
    }
    this.hammer = null;
  }

  _initHammer = (domElement) => {
    if (this.state.loaded || !domElement) return;
    this.hammer = new Hammer(domElement);
    this.hammer.get('swipe').set({
      direction: Hammer.DIRECTION_ALL,
      threshold: 5,
      velocity: 0.2,
    });
    this.hammer.on('swiperight', () => this._onSwipe('SwipeRight'));
    this.hammer.on('swipeleft', () => this._onSwipe('SwipeLeft'));
    this.hammer.on('swipeup', () => this._onSwipe('SwipeUp'));
    this.hammer.on('swipedown', () => this._onSwipe('SwipeDown'));
    this.hammer.on('doubletap', () => this._onSwipe('Space'));
    this.setState({ loaded: true });
  };

  _onSwipe(direction) {
    const { onSwipe } = this.props;
    onSwipe(direction);
  }

  render() {
    const { onSwipe, ...props } = this.props;
    return (
      <div ref={this._initHammer}>
        <Component {...props} />
      </div>
    );
  }
}
