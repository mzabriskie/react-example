import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Accounts from './app/screens/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.scss';

ReactDOM.render(
  <Router history={browserHistory}>
  </Router>,
  document.getElementById('container')
);
