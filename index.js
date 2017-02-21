import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './app/screens/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.scss';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>,
  document.getElementById('container')
);
