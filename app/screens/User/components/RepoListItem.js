import React, { PropTypes } from 'react';
import moment from 'moment';

export default React.createClass({
  propTypes: {
    repo: PropTypes.object
  },

  getDefaultProps() {
    return {
      repo: {}
    };
  },

  render() {
    let repo = this.props.repo;
    return (
      <li className="border-bottom">
        <div className="pull-right">
          <strong>{repo.language}</strong>
          <strong>&#9734; {repo.stargazers_count}</strong>
          <strong>&#4292; {repo.forks_count}</strong>
        </div>
        <h4><a href={repo.html_url}>{repo.name}</a></h4>
        <p>{repo.description}</p>
        <time>Updated {moment(repo.pushed_at).fromNow()}</time>
      </li>
    );
  }
});
