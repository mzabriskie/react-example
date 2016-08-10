import React, {Component, PropTypes} from 'react';
import RepoListItem from './RepoListItem';
import {getRepos} from '../../../utils/github-api'

export default class RepoList extends Component {
  constructor() {
    super()
    this.state = {repos: []}
  }

  getRepos() {
    const {username} = this.props
    this.props.getRepos(username).then(repos => {
      this.setState({repos});
    });
  }

  componentWillMount() {
    this.getRepos();
  }

  render() {
    const {repos} = this.state
    const {filter} = this.props
    return (
      <ul className="list-unstyled">
        {renderRepos(repos, filter.toLowerCase())}
      </ul>
    );
  }
}

RepoList.propTypes = {
  filter: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  getRepos: PropTypes.func,
};
RepoList.defaultProps = {getRepos}

function renderRepos(repos, filter) {
  return repos
    .filter(repo => {
      return !filter ||
        (repo.name && repo.name.toLowerCase().includes(filter)) ||
        (repo.description && repo.description.toLowerCase().includes(filter));
    })
    .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
    .map(repo => <RepoListItem key={repo.id} repo={repo} />);
}
