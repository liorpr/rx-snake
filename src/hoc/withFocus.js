import { lifecycle } from 'recompose';
import { Observable } from 'rxjs';

export default lifecycle({
  componentDidMount() {
    const onFocus$ = Observable.fromEvent(window, 'focus').map(() => true);
    const onBlur$ = Observable.fromEvent(window, 'blur').map(() => false);

    this.disposable = Observable.merge(onFocus$, onBlur$)
      .distinctUntilChanged()
      .subscribe(x => this.props.onFocus(x));
  },
  componentWillUnmount() {
    this.disposable.unsubscribe();
  }
});
