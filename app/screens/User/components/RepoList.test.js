import React from 'react'
import {mount} from 'enzyme'
import {spy} from 'sinon'
import {getRepos, getMockRepo, getMockRepos} from '../util/github-api.stub'
import RepoList from './RepoList'

describe(RepoList.displayName, () => {
  it('should render no repos by default', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('li')).to.have.length(0)
  })

  it('should invoke the getRepos method with the user', () => {
    const getReposSpy = getGetReposSpy()
    mountComponent({getRepos: getReposSpy, user: 'bob'})
    expect(getReposSpy).to.have.been.calledOnce
    expect(getReposSpy).to.have.been.calledWith('bob')
  })

  it('should invoke the getRepos method with a new user', () => {
    const getReposSpy = getGetReposSpy()
    const wrapper = mountComponent({getRepos: getReposSpy, user: 'buddy'})
    getReposSpy.reset()
    wrapper.setProps({user: 'han'})
    expect(getReposSpy).to.have.been.calledOnce
    expect(getReposSpy).to.have.been.calledWith('han')
  })

  it('should list the repositories', done => {
    const totalRepos = 3
    const getReposSpy = getGetReposSpy(getMockRepos(totalRepos))
    const wrapper = mountComponent({getRepos: getReposSpy})
    setTimeout(() => {
      expect(wrapper.find('li')).to.have.length(totalRepos)
      done()
    })
  })

  it('should filter the list of repositories', done => {
    const reposMatchingBob = [
      getMockRepo({name: 'bob'}),
      getMockRepo({name: 'bobby'}),
    ]
    const reposNotMatchingBob = [
      getMockRepo({name: 'fred'}),
      getMockRepo({name: 'george'}),
      getMockRepo({name: 'ron'}),
    ]
    const getReposSpy = getGetReposSpy([
      ...reposMatchingBob,
      ...reposNotMatchingBob,
    ])
    const wrapper = mountComponent({getRepos: getReposSpy, filter: 'bob'})
    setTimeout(() => {
      expect(wrapper.find('li')).to.have.length(reposMatchingBob.length)
      done()
    })
  })
})

function mountComponent(props = {}) {
  return mount(<RepoList {...getDefaultProps()} {...props} />)
}

function getDefaultProps() {
  const defaultProps = {
    user: 'luke-skywalker',
    filter: '',
    getRepos: getRepos,
  }
}

function getGetReposSpy(resolvedValue = getMockRepos()) {
  return spy(() => Promise.resolve(resolvedValue))
}
