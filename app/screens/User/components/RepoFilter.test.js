import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import RepoFilter from './RepoFilter';

describe(RepoFilter.displayName, () => {
  it('should call the onKeyUp prop', () => {
    const onKeyUp = sinon.spy();
    const wrapper = mountComponent({onKeyUp});
    const input = wrapper.find('input');
    const key = 'b';
    input.simulate('keyup', {target: {value: key}});
    expect(onKeyUp).to.have.been.calledWith(key);
  });

  it('should have a default onKeyUp handler', () => {
    const wrapper = mountComponent();
    const input = wrapper.find('input');
    expect(() => input.simulate('keyup')).to.not.throw();
  });
});

function mountComponent(props) {
  return mount(<RepoFilter {...props} />);
}
