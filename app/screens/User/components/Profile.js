import React, {Component} from 'react';
import Tooltip from 'react-tooltip';
import ProfileStat from './ProfileStat'

export default class Profile extends Component {
  constructor() {
    super()
    this.user = {
      avatar_url: 'https://avatars.githubusercontent.com/u/199035?v=3',
      name: 'Matt Zabriskie',
      login: 'mzabriskie',
      followers: 528,
      public_repos: 74,
      following: 4,
    }
    this.orgs = [
      {
        login: 'facebook',
        id: 69631,
        avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=3',
      },
      {
        login: 'reactjs',
        id: 6412038,
        avatar_url: 'https://avatars.githubusercontent.com/u/6412038?v=3',
      },
      {
        login: 'javascriptair',
        id: 15834066,
        avatar_url: 'https://avatars.githubusercontent.com/u/15834066?v=3',
      }
    ]
  }

  render() {
    const {user, orgs} = this.state;
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
          {orgs.map(org => (
            <img
              key={org.id}
              src={org.avatar_url}
              alt="Organization Avatar"
              data-tip={org.login}
            />
          ))}
          <Tooltip effect="solid" />
        </section>
      </div>
    );
  }
}
