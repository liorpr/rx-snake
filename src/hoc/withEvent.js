import { lifecycle } from 'recompose';
import { Observable } from 'rxjs';

export default (event, fn) => lifecycle({
  componentDidMount() {
    this.disposable = Observable.fromEvent(window, event)
      .subscribe(x => this.props[fn](x));
  },
  componentWillUnmount() {
    this.disposable.unsubscribe();
  }
});
