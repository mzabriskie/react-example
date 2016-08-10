import React, {Component} from 'react';
import Profile from './components/Profile'
import RepoFilter from './components/RepoFilter'
import RepoList from './components/RepoList'

export default class User extends Component {
  constructor() {
    super()
    this.state = {filter: ''}
  }

  handleFilterUpdate = (filter) => {
    this.setState({filter})
  }

  render() {
    const {filter} = this.state
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <Profile username="mzabriskie" />
          </div>
          <div className="col-sm-9">
            <h3>Repositories</h3>
            <RepoFilter onUpdate={this.handleFilterUpdate} />
            <RepoList filter={filter} username="mzabriskie" />
          </div>
        </div>
      </div>
    );
  }
}
