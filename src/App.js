import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import configureStore from './store/configure';
import getGameConfig from './utils/getGameConfig';

import Home from './Home';
import OnBoarding from './OnBoarding';
import Game from './Game';

const store = configureStore();
getGameConfig(store.dispatch);

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/play" component={Game}/>
        <Route component={OnBoarding}/>
      </Switch>
    </Router>
  </Provider>
);

export default App;
