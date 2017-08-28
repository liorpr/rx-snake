import { mapPropsStream } from 'recompose';
import { Observable } from 'rxjs';

export default mapPropsStream(props$ => {
  const windowSize$ = Observable.fromEvent(window, 'resize')
    .startWith(null)
    .map(() => ({
      width: Math.min(document.documentElement.clientWidth, window.innerWidth || Infinity),
      height: Math.min(document.documentElement.clientHeight, window.innerHeight || Infinity),
      orientation: window.screen.orientation.type.split('-')[0],
    }));

  return Observable.combineLatest(props$, windowSize$)
    .map(([props, windowSize]) => ({
      ...props,
      windowSize
    }));
});
