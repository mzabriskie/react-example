import React from 'react';
import axios from 'axios';
import moment from 'moment';

const GITHUB_API_URL = 'https://api.github.com';

export default React.createClass({
  propTypes: {
    user: React.PropTypes.string,
    filter: React.PropTypes.string
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
    axios.get(GITHUB_API_URL + '/users/' + props.user + '/repos?per_page=250')
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
    var filter = this.props.filter ? this.props.filter.toLowerCase() : null;
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
        var updated = moment(repo.pushed_at).fromNow();
        return (
          <li className="border-bottom" key={repo.id}>
            <div className="pull-right">
              <strong>{repo.language}</strong>
              <strong>&#9734; {repo.stargazers_count}</strong>
              <strong>&#4292; {repo.forks_count}</strong>
            </div>
            <h4><a href={repo.html_url}>{repo.name}</a></h4>
            <p>{repo.description}</p>
            <time>Updated {updated}</time>
          </li>
        );
      });
  },

  render() { 
    return (
      <ul className="list-unstyled">{this.renderRepos()}</ul>
    );
  }
});
