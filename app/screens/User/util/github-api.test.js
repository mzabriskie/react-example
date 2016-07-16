import moxios from 'moxios';
import {spy} from 'sinon';
import {getRepos, getUserData} from './github-api';
import {getMockRepos, getMockUser, getMockOrgs} from './github-api.stub';

describe('GitHub API', () => {

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('getRepos', () => {
    it('should make a request to the proper url for the given user', done => {
      const data = getMockRepos(6);
      const successHandler = spy();

      moxios.stubRequest(/^https:\/\/api\.github\.com\/users\/kentcdodds\/repos/, {
        status: 200,
        response: data,
      });
      getRepos('kentcdodds').then(successHandler);

      moxios.wait(() => {
        expect(successHandler).to.have.been.calledOnce;
        expect(successHandler).to.have.been.calledWith(data);
        done();
      });
    });
  });

  describe('getUserData', () => {
    it('should make a request to the proper urls for the given user', done => {
      const user = getMockUser();
      const orgs = getMockOrgs();
      const successHandler = spy();

      moxios.stubRequest(/^https:\/\/api\.github\.com\/users\/kentcdodds$/, {
        status: 200,
        response: user,
      });
      moxios.stubRequest(/^https:\/\/api\.github\.com\/users\/kentcdodds\/orgs/, {
        status: 200,
        response: orgs,
      });

      getUserData('kentcdodds').then(successHandler);

      moxios.wait(() => {
        expect(successHandler).to.have.been.calledOnce;
        expect(successHandler).to.have.been.calledWith({user, orgs});
        done();
      });
    });
  });
});
