import React from 'react';
import Profile from './components/Profile';
import RepoFilter from './components/RepoFilter';
import RepoList from './components/RepoList';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {
      filter: null
    };
  },

  handleKeyUp(filter) {
    this.setState({
      filter: filter
    });
  },

  render() {
    var user = this.context.router.getCurrentParams().user;

    return (
      <div className="container">
        <div className="col-md-3 pull-left">
          <Profile user={user}/>
        </div>
        <div className="col-md-8 col-sm-7 pull-left">
          <h3>Repositories</h3>
          <RepoFilter onKeyUp={this.handleKeyUp}/>
          <RepoList user={user} filter={this.state.filter}/>
        </div>
      </div>
    );
  }
});
