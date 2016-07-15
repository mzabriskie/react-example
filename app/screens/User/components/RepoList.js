import React, { PropTypes } from 'react';
import {getRepos} from '../util/github-api'
import RepoListItem from './RepoListItem';

export default React.createClass({
  propTypes: {
    user: PropTypes.string,
    filter: PropTypes.string
  },

  getDefaultProps() {
    return {
      user: null,
      filter: null,
      getRepos, // for testing to be able to override with a stub
    };
  },

  getInitialState() {
    return {
      repos: []
    };
  },

  getRepos(props = this.props) {
    props.getRepos(props.user).then((repos) => {
      this.setState({repos});
    });
  },

  componentWillMount() {
    this.getRepos();
  },

  componentWillReceiveProps(props) {
    const usernameChanged = props.user !== this.props.user
    if (usernameChanged) {
      this.getRepos(props)
    }
  },

  renderRepos() {
    let filter = this.props.filter ? this.props.filter.toLowerCase() : null;
    return this.state.repos
      .filter((repo) => {
        return !filter ||
          (repo.name && repo.name.toLowerCase().includes(filter)) ||
          (repo.description && repo.description.toLowerCase().includes(filter));
      })
      .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
      .map((repo) => <RepoListItem key={repo.id} repo={repo}/>);
  },

  render() {
    return (
      <ul className="list-unstyled">
        {this.renderRepos()}
      </ul>
    );
  }
});
