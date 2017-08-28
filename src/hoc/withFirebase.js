import { createEventHandler, mapPropsStream } from 'recompose';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import '../Game/utils/initFirebase';

export default (ref, propName = 'firebaseData') => mapPropsStream(props$ => {
  const { handler: onData, stream: onData$ } = createEventHandler();

  const updateData = x => onData(x.val());
  const dataRef = firebase.database().ref(ref);
  dataRef.on('value', updateData);

  return Observable.combineLatest(props$, onData$)
    .map(([props, data]) => ({ ...props, [propName]: data }))
    .finally(() => dataRef.off('value', updateData))
});
