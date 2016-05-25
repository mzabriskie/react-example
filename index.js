import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history'
import Home from './app/screens/Home';
import User from './app/screens/User';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tooltip/dist/react-tooltip.min.css';
import './assets/styles.css';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

ReactDOM.render((
  <Router history={appHistory}>
    <Route path="/" component={Home}/>
    <Route path="/:user" component={User}/>
  </Router>
), document.getElementById('container'));
