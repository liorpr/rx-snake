import React from 'react';
import ReactDOM from 'react-dom';
import { setObservableConfig } from 'recompose';
import { Observable } from 'rxjs';
import './index.css';
import Game from './Game';

setObservableConfig({
  fromESObservable: Observable.from,
});

ReactDOM.render(<Game />, document.getElementById('root'));
