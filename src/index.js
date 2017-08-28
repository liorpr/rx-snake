import React from 'react';
import ReactDOM from 'react-dom';
import { setObservableConfig } from 'recompose';
import { Observable } from 'rxjs';
import './index.css';
import App from './App';

setObservableConfig({
  fromESObservable: Observable.from,
});

ReactDOM.render(<App />, document.getElementById('root'));
