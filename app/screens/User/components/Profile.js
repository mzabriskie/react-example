import React, {PropTypes} from 'react';
import Tooltip from 'react-tooltip';
import {getUserData} from '../util/github-api';
import ProfileStat from './ProfileStat';

export default React.createClass({
  propTypes: {
    user: PropTypes.string,
  },

  getDefaultProps() {
    return {
      user: null,
      getUserData,
    };
  },

  getInitialState() {
    return {
      user: {},
      orgs: [],
    };
  },

  getUser(props = this.props) {
    props.getUserData(props.user)
      .then(({user, orgs}) => {
        this.setState({user, orgs});
      });
  },

  componentWillMount() {
    this.getUser();
  },

  componentWillReceiveProps(props) {
    this.getUser(props);
  },

  renderOrgs() {
    return this.state.orgs.map(org => {
      return (
        <img
          key={org.avatar_url}
          src={org.avatar_url}
          alt="Organization Avatar"
          data-tip={org.login}
        />
      );
    });
  },

  render() {
    const user = this.state.user;
    return (
      <div>
        <section className="user border-bottom">
          <img
            src={user.avatar_url}
            className="img-rounded img-responsive"
            alt="User Avatar"
          />
          <h2>{user.name}</h2>
          <h5>{user.login}</h5>
        </section>
        <section className="stats border-bottom">
          <ProfileStat value={user.followers} label="followers" />
          <ProfileStat value={user.public_repos} label="repositories" />
          <ProfileStat value={user.following} label="following" />
        </section>
        <section className="orgs">
          <h4>Organizations</h4>
          {this.renderOrgs()}
        </section>
        <Tooltip effect="solid" />
      </div>
    );
  },
});
