import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Game from './Game';
import Home from './Home';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/play" component={Game} />
      <Route component={Home}/>
    </Switch>
  </Router>
);

export default App;
