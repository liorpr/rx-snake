import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Home from './Home';
import OnBoarding from './OnBoarding';
import Game from './Game';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/play" component={Game} />
      <Route component={OnBoarding}/>
    </Switch>
  </Router>
);

export default App;
