import React, { Component } from 'react';
import Game from './Game';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Welcome to Snake</h2>
        <Game />
      </div>
    );
  }
}

export default App;
