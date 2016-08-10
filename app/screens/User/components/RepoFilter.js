import React, {Component} from 'react';

export default class RepoFilter extends Component {
  render() {
    return (
      <section className="border-bottom">
        <input
          type="text"
          placeholder="Filter repositories..."
          className="form-control"
        />
      </section>
    );
  }
}
