import firebase from 'firebase';
import { mapPropsStream, createEventHandler } from 'recompose';
import { Observable } from 'rxjs'

export default (path, propName, initialValue) => mapPropsStream(props$ => {
  const { handler: onValue, stream: onValue$ } = createEventHandler();

  const ref = firebase.database().ref(path);
  ref.on('value', onValue);

  const values$ = onValue$.map(x => x.val()).startWith(initialValue);

  return Observable.combineLatest(props$, values$)
    .map(([props, value]) => ({
      ...props,
      [propName]: value,
    }))
    .finally(() => ref.off('value', onValue));
})
