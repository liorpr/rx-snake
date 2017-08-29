import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducer, { getInitialState } from './reducer';
import browserHistory from './browserHistory';

export default function () {
  return createStore(
    reducer,
    getInitialState(),
    compose(
      applyMiddleware(thunk),
      applyMiddleware(routerMiddleware(browserHistory)),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
        ? window.devToolsExtension()
        : f => f,
    ),
  );
}
