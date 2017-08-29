import firebase from 'firebase';
import { setGameSize, setCandy, setWindowSize } from '../store/reducer';
import './initFirebase';

export default function (dispatch) {
  const gameRef = firebase.database().ref('game/config');
  gameRef.child('candy').on('value', x => dispatch(setCandy(x.val())));
  gameRef.child('size').on('value', x => dispatch(setGameSize(x.val())));
  window.addEventListener('resize', () => dispatch(setWindowSize()));
}
