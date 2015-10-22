import React from 'react';
import { History } from 'react-router';

export default React.createClass({
  mixins: [ History ],

  handleSubmit(e) {
    e.preventDefault();
    this.history.pushState(null, `/${this.refs.input.value}`);
  },

  render() {
    return (
      <section className="container home">
        <form className="form-inline" role="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="input-group">
              <input type="text"
                     placeholder="Enter a GitHub user..."
                     className="form-control"
                     ref="input"/>
            </div>
          </div>
          <button type="button"
                  className="btn btn-primary"
                  onClick={this.handleSubmit}>Go</button>
        </form>
      </section>
    );
  }
});
