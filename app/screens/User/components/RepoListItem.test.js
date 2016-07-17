/* eslint camelcase:0 */
import React from 'react';
import {render} from 'enzyme';
import moment from 'moment';
import {getMockRepo} from '../util/github-api.stub';
import RepoListItem from './RepoListItem';

describe('RepoListItem', () => {
  it('should calculate the time updated', () => {
    const daysAgo = 7;
    const pushed_at = moment().subtract(daysAgo, 'days').toDate();
    const repo = getMockRepo({pushed_at});
    const wrapper = render(<RepoListItem repo={repo} />);
    const timeEl = wrapper.find('time');
    expect(timeEl).to.have.text('Updated 7 days ago');
  });
});
