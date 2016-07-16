import React, {PropTypes} from 'react';

export default React.createClass({
  propTypes: {
    onKeyUp: PropTypes.func,
  },

  getDefaultProps() {
    return {
      onKeyUp() {},
    };
  },

  handleInputKeyUp({target: {value}}) {
    this.props.onKeyUp(value);
  },

  render() {
    return (
      <section className="border-bottom">
        <input
          type="text"
          placeholder="Filter repositories..."
          className="form-control"
          onKeyUp={this.handleInputKeyUp}
        />
      </section>
    );
  },
});
