import React from 'react';
import ReactDOM from 'react-dom';
import { setObservableConfig } from 'recompose';
import { Observable } from 'rxjs';
import App from './App';
import './index.css';

global.playerId = localStorage.getItem('playerId');

setObservableConfig({
  fromESObservable: Observable.from,
});

ReactDOM.render(<App/>, document.getElementById('root'));
