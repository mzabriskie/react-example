import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    value: PropTypes.number,
    label: PropTypes.string
  },

  render() {
    return (
      <span>
        <h2>{this.props.value}</h2>
        <small>{this.props.label}</small>
      </span>
    );
  }
});
