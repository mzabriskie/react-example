import React, {Component, PropTypes} from 'react';
import RepoListItem from './RepoListItem';

export default class RepoList extends Component {
  constructor() {
    super()
    this.state = {
      repos: [
        {
          id: 23088740,
          name: 'axios',
          html_url: 'https://github.com/mzabriskie/axios',
          description: 'Promise based HTTP client for the browser and node.js',
          pushed_at: '2016-08-09T03:24:35Z',
          stargazers_count: 5198,
          language: 'JavaScript',
          forks: 289,
        },
        {
          id: 24301997,
          name: 'react-example',
          html_url: 'https://github.com/mzabriskie/react-example',
          description: 'Simple React example app',
          pushed_at: '2016-08-07T15:10:50Z',
          stargazers_count: 34,
          language: 'JavaScript',
          forks: 5,
        },
        {
          id: 65098276,
          name: 'react-workshop',
          html_url: 'https://github.com/mzabriskie/react-workshop',
          description: 'Exercises as part of a React workshop',
          pushed_at: '2016-08-06T19:20:08Z',
          stargazers_count: 0,
          language: 'JavaScript',
          forks: 0,
        },
        {
          id: 22234455,
          name: 'react-draggable',
          html_url: 'https://github.com/mzabriskie/react-draggable',
          description: 'React draggable component',
          pushed_at: '2016-07-29T21:05:18Z',
          stargazers_count: 890,
          language: 'JavaScript',
          forks: 199,
        },
        {
          id: 41111786,
          name: 'pdf-annotate.js',
          html_url: 'https://github.com/mzabriskie/pdf-annotate.js',
          description: 'WIP - Annotation layer for pdf.js',
          pushed_at: '2016-07-27T20:36:50Z',
          stargazers_count: 47,
          language: 'JavaScript',
          forks: 8,
        }
      ]
    }
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
};

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
