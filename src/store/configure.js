import { createStore } from 'redux';
import reducer, { getInitialState } from './reducer';

export default function () {
  return createStore(
    reducer,
    getInitialState(),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f
  );
}
