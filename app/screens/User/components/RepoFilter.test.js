import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import RepoFilter from './RepoFilter';

describe('RepoFilter', () => {
  it('should call the onKeyUp prop', () => {
    const onUpdate = sinon.spy();
    const wrapper = mountComponent({onUpdate});
    const input = wrapper.find('input');
    const key = 'b';
    input.simulate('keyup', {target: {value: key}});
    expect(onUpdate).to.have.been.calledWith(key);
  });
});

function mountComponent(props) {
  return mount(<RepoFilter {...props} />);
}
