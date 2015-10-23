import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import Home from './app/screens/Home';
import User from './app/screens/User';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tooltip/dist/react-tooltip.min.css';
import './assets/styles.css';

ReactDOM.render((
  <Router>
    <Route path="/" component={Home}/>
    <Route path="/:user" component={User}/>
  </Router>
), document.getElementById('container'));
