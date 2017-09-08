import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import configureStore from './store/configure';
import getGameConfig from './utils/getGameConfig';

import Home from './pages/Home';
import OnBoarding from './pages/OnBoarding';
import Game from './pages/Game';

const store = configureStore();
getGameConfig(store.dispatch);

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/play" render={() => {
          const name = localStorage.getItem('name');
          return name && name !== ''  ? <Game/> : <Redirect to="/"/>;
        }}/>
        <Route component={OnBoarding}/>
      </Switch>
    </Router>
  </Provider>
);

export default App;
