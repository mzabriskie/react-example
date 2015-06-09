import React from 'react';
import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';
const STAT_FIELDS = [
  {field: 'followers', label: 'followers'},
  {field: 'public_repos', label: 'repositories'},
  {field: 'following', label: 'following'}
];

export default React.createClass({
  propTypes: {
    user: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      user: null
    };
  },

  getInitialState() {
    return {
      user: {},
      orgs: []
    };
  },

  getUser(props) {
    props = props || this.props;
    axios.all([
        axios.get(GITHUB_API_URL + '/users/' + props.user),
        axios.get(GITHUB_API_URL + '/users/' + props.user + '/orgs')
      ])
      .then(axios.spread((user, orgs) => {
        this.setState({
          user: user.data,
          orgs: orgs.data
        });
      }));
  },

  componentWillMount() {
    this.getUser();
  },

  componentWillReceiveProps(props) {
    this.getUser(props);
  },

  renderStats() {
    return STAT_FIELDS.map((stat) => {
      return (
        <span key={stat.field}>
          <h2>{this.state.user[stat.field]}</h2>
          <small>{stat.label}</small>
        </span>
      );
    });
  },

  renderOrgs() {
    return this.state.orgs.map((org) => {
      return <img key={org.avatar_url} src={org.avatar_url} className="avatar" title={org.login}/>;
    });
  },

  render() {  
    return (
      <div>
        <section className="user border-bottom">
          <img src={this.state.user.avatar_url} className="avatar"/>
          <h2>{this.state.user.name}</h2>
          <h5>{this.state.user.login}</h5>
        </section>
        <section className="stats border-bottom">
          {this.renderStats()}
        </section>
        <section className="orgs">
          <h4>Organizations</h4>
          {this.renderOrgs()}
        </section>
      </div>
    );
  }
});
