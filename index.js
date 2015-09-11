import React from 'react';
import Router, { Route } from 'react-router';
import Home from './app/screens/Home';
import User from './app/screens/User';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tooltip/dist/react-tooltip.min.css';
import './assets/styles.css';

var routes = (
  <Route>
    <Route name="home" path="/" handler={Home}/>
    <Route name="user" path="/:user" handler={User}/>
  </Route>
);

Router.run(routes, (Handler) => {
  React.render(<Handler/>, document.getElementById('container'));
});
