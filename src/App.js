import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './store/configure';
import browserHistory from './store/browserHistory';
import getGameConfig from './utils/getGameConfig';

import Home from './Home';
import OnBoarding from './OnBoarding';
import Game from './Game';

const store = configureStore();
getGameConfig(store.dispatch);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <Switch>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/play" render={() => (
          localStorage.getItem('playerId') ? <Game /> : <Redirect to="/" />
        )}/>
        <Route component={OnBoarding}/>
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
