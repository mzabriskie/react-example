import React from 'react';

export default React.createClass({
  propTypes: {
    onKeyUp: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      onKeyUp() {}
    };
  },

  handleKeyUp() {
    this.props.onKeyUp(this.refs.input.getDOMNode().value);
  },

  render() {
    return (
      <section className="border-bottom">
        <input type="text"
              placeholder="Filter repositories..."
              className="form-control"
              ref="input"
              onKeyUp={this.handleKeyUp}/>
      </section>
    );
  }
});
