import React, {Component, PropTypes} from 'react';

export default class RepoFilter extends Component {
  render() {
    return (
      <section className="border-bottom">
        <input
          type="text"
          placeholder="Filter repositories..."
          className="form-control"
          onKeyUp={({target: {value}}) => this.props.onUpdate(value)}
        />
      </section>
    );
  }
}

RepoFilter.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
