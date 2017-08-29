import { lifecycle } from 'recompose';
import { Observable } from 'rxjs';

export default lifecycle({
  componentDidMount() {
    this.disposable = Observable.fromEvent(document, 'keydown')
      .filter(({code}) => this.props.capture.includes(code))
      .do(e => { e.preventDefault(); e.stopPropagation(); })
      .map(e => e.code)
      .subscribe(x => this.props.onKeyDown(x))
  },
  componentWillUnmount() {
    this.disposable.unsubscribe();
  }
});
