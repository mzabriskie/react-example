import React, { PropTypes } from 'react';
import Profile from './components/Profile';
import RepoFilter from './components/RepoFilter';
import RepoList from './components/RepoList';

export default React.createClass({
  contextTypes: {
    router: PropTypes.func
  },

  getInitialState() {
    return {
      filter: null
    };
  },

  handleFilterKeyUp(filter) {
    this.setState({
      filter
    });
  },

  render() {
    let user = this.context.router.getCurrentParams().user;
    return (
      <div className="container">
        <div className="col-md-3 pull-left">
          <Profile user={user}/>
        </div>
        <div className="col-md-8 col-sm-7 pull-left">
          <h3>Repositories</h3>
          <RepoFilter onKeyUp={this.handleFilterKeyUp}/>
          <RepoList user={user} filter={this.state.filter}/>
        </div>
      </div>
    );
  }
});
