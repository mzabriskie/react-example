import React, {Component} from 'react';

export default class User extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            Profile for Matt
          </div>
          <div className="col-sm-9">
            <h3>Repositories</h3>
            <div>Repo Filter</div>
            <div>Repo List</div>
          </div>
        </div>
      </div>
    );
  }
}
