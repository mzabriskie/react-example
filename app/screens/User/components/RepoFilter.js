import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    onKeyUp: PropTypes.func
  },

  getDefaultProps() {
    return {
      onKeyUp() {}
    };
  },

  handleInputKeyUp() {
    this.props.onKeyUp(this.refs.input.value);
  },

  render() {
    return (
      <section className="border-bottom">
        <input type="text"
              placeholder="Filter repositories..."
              className="form-control"
              ref="input"
              onKeyUp={this.handleInputKeyUp}/>
      </section>
    );
  }
});
