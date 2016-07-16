import React, {PropTypes} from 'react';
import Profile from './components/Profile';
import RepoFilter from './components/RepoFilter';
import RepoList from './components/RepoList';

export default React.createClass({
  propTypes: {
    params: PropTypes.shape({
      user: PropTypes.string,
    }),
  },

  getInitialState() {
    return {
      filter: null,
    };
  },

  handleFilterKeyUp(filter) {
    this.setState({
      filter,
    });
  },

  render() {
    const {user} = this.props.params;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <Profile user={user} />
          </div>
          <div className="col-sm-9">
            <h3>Repositories</h3>
            <RepoFilter onKeyUp={this.handleFilterKeyUp} />
            <RepoList user={user} filter={this.state.filter} />
          </div>
        </div>
      </div>
    );
  },
});
