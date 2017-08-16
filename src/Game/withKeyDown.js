import { lifecycle } from 'recompose';
import Rx from 'rx-dom';

export default lifecycle({
  componentDidMount() {
    this.disposable = Rx.DOM.keydown(document.body)
      .filter(({code}) => this.props.capture.includes(code))
      .do(e => { e.preventDefault(); e.stopPropagation(); })
      .map(e => e.code)
      .subscribe(x => this.props.onKeyDown(x))
  },
  componentWillUnmount() {
    this.disposable.dispose();
  }
});
