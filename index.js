import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Home from './app/screens/Home';
import User from './app/screens/User';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tooltip';
import './assets/styles.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Home}/>
    <Route path="/:user" component={User}/>
  </Router>
), document.getElementById('container'));
