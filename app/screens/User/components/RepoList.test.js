import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import {getRepos, getMockRepo, getMockRepos} from '../../../utils/github-api.stub';
import RepoList from './RepoList';

describe('RepoList', () => {
  it('should render no repos by default', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('li')).to.have.length(0);
  });

  it('should invoke the getRepos method with the user', () => {
    const getReposSpy = getGetReposSpy();
    mountComponent({getRepos: getReposSpy, username: 'bob'});
    expect(getReposSpy).to.have.been.calledOnce;
    expect(getReposSpy).to.have.been.calledWith('bob');
  });

  it('should not invoke the getRpos method when the user has not changed', () => {
    const getReposSpy = getGetReposSpy();
    const wrapper = mountComponent({getRepos: getReposSpy, username: 'buddy'});
    getReposSpy.reset();
    wrapper.setProps({filter: 'bud'});
    expect(getReposSpy).to.have.not.been.called;
  });

  it('should list the repositories', done => {
    const totalRepos = 3;
    const getReposSpy = getGetReposSpy(getMockRepos(totalRepos));
    const wrapper = mountComponent({getRepos: getReposSpy});
    setTimeout(() => {
      expect(wrapper.find('li')).to.have.length(totalRepos);
      done();
    });
  });

  it('should filter the list of repositories', done => {
    const reposMatchingBob = [
      getMockRepo({name: 'bob'}),
      getMockRepo({name: 'bobby'}),
    ];
    const reposNotMatchingBob = [
      getMockRepo({name: 'fred'}),
      getMockRepo({name: 'george'}),
      getMockRepo({name: 'ron'}),
    ];
    const getReposSpy = getGetReposSpy([
      ...reposMatchingBob,
      ...reposNotMatchingBob,
    ]);
    const wrapper = mountComponent({getRepos: getReposSpy, filter: 'bob'});
    setTimeout(() => {
      expect(wrapper.find('li')).to.have.length(reposMatchingBob.length);
      done();
    });
  });
});

function mountComponent(props = {}) {
  return mount(<RepoList {...getDefaultProps()} {...props} />);
}

function getDefaultProps() {
  return {
    username: 'luke-skywalker',
    filter: '',
    getRepos,
  };
}

function getGetReposSpy(resolvedValue = getMockRepos()) {
  return spy(() => Promise.resolve(resolvedValue));
}
