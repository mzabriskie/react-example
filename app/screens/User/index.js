import React, {Component} from 'react';
import Profile from './components/Profile'
import RepoFilter from './components/RepoFilter'
import RepoList from './components/RepoList'

export default class User extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <Profile />
          </div>
          <div className="col-sm-9">
            <h3>Repositories</h3>
            <RepoFilter />
            <RepoList />
          </div>
        </div>
      </div>
    );
  }
}
