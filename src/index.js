import React from 'react';
import ReactDOM from 'react-dom';
import { setObservableConfig } from 'recompose';
import { Observable } from 'rxjs';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

setObservableConfig({
  fromESObservable: Observable.from,
});

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
