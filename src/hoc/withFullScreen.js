import { mapPropsStream, createEventHandler } from 'recompose';
import { Observable } from 'rxjs';

export default mapPropsStream(props$ => {
  if (!document.webkitFullscreenEnabled) return props$;
  
  const { handler: onFullScreenChanged, stream: onFullScreenChanged$ } = createEventHandler();
  document.documentElement.onwebkitfullscreenchange = () => onFullScreenChanged(!!document.webkitFullscreenElement);

  return Observable.combineLatest(
      props$,
      onFullScreenChanged$.startWith(!!document.webkitFullscreenElement),
    )
    .map(([props, isFullScreen]) => ({ ...props, isFullScreen }));
});
