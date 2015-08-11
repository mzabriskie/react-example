import React, { PropTypes } from 'react';
import axios from 'axios';
import RepoListItem from './RepoListItem';

export default React.createClass({
  propTypes: {
    user: PropTypes.string,
    filter: PropTypes.string
  },

  getDefaultProps() {
    return {
      user: null,
      filter: null
    };
  },

  getInitialState() {
    return {
      repos: []
    };
  },

  getRepos(props) {
    props = props || this.props;
    axios.get(`https://api.github.com/users/${props.user}/repos?per_page=250`)
      .then((repos) => {
        this.setState({
          repos: repos.data
        });
      });
  },

  componentWillMount() {
    this.getRepos();
  },

  componentWillReceiveProps(props) {
    this.getRepos(props);
  },

  renderRepos() {
    let filter = this.props.filter ? this.props.filter.toLowerCase() : null;
    return this.state.repos
      .filter((repo) => {
        return !filter ||
          (repo.name && repo.name.toLowerCase().indexOf(filter) > -1) ||
          (repo.description && repo.description.toLowerCase().indexOf(filter) > -1);
      })
      .sort((a, b) => {
        return Date.parse(b.pushed_at) - Date.parse(a.pushed_at);
      })
      .map((repo) => {
        return (
          <RepoListItem key={repo.id} repo={repo}/>
        );
      });
  },

  render() {
    return (
      <ul className="list-unstyled">
        {this.renderRepos()}
      </ul>
    );
  }
});
