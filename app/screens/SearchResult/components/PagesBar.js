import React, {Component, PropTypes} from 'react';

export default class PagesBar extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-6" >
          <button onClick={this.props.decrementPage} className="btn btn-primary pull-right">
            Prev
          </button>
        </div>
        <div className="col-sm-6" >
          <button onClick={this.props.incrementPage} className="btn btn-primary">
            Next
          </button>
        </div>
      </div>
    )
  }
}

PagesBar.propTypes = {
  decrementPage: PropTypes.func,
  incrementPage: PropTypes.func,
};
