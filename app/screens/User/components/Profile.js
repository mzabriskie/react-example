import React, { PropTypes } from 'react';
import axios from 'axios';
import ProfileStat from './ProfileStat';

export default React.createClass({
  propTypes: {
    user: PropTypes.string
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
        axios.get(`https://api.github.com/users/${props.user}`),
        axios.get(`https://api.github.com/users/${props.user}/orgs`)
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

  renderOrgs() {
    return this.state.orgs.map((org) => {
      return (
        <img
          key={org.avatar_url}
          src={org.avatar_url}
          title={org.login}
        />
      );
    });
  },

  render() {
    let user = this.state.user;
    return (
      <div>
        <section className="user border-bottom">
          <img src={user.avatar_url} className="img-rounded img-responsive"/>
          <h2>{user.name}</h2>
          <h5>{user.login}</h5>
        </section>
        <section className="stats border-bottom">
          <ProfileStat value={user.followers} label="followers"/>
          <ProfileStat value={user.public_repos} label="repositories"/>
          <ProfileStat value={user.following} label="following"/>
        </section>
        <section className="orgs">
          <h4>Organizations</h4>
          {this.renderOrgs()}
        </section>
      </div>
    );
  }
});
