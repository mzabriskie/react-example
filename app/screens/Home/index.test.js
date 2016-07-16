import React from 'react'
import {render, mount} from 'enzyme'
import {spy} from 'sinon'
import Home from './index'

describe(Home.displayName, () => {
  it('should render a form to input a github username', () => {
    const context = getContextStub()
    const wrapper = render(<Home />, {context})
    expect(wrapper).descendants('form input')
    expect(wrapper).descendants('form button[type=submit]')
  })

  it('should route to the user page with the username when the form is submitted', () => {
    const username = 'defunkt'
    const context = getContextStub()
    const wrapper = mount(<Home />, {context})

    const form = wrapper.find('form')
    const input = wrapper.find('input')

    input.node.value = username
    form.simulate('submit')

    expect(context.router.push).to.have.been.calledOnce
    expect(context.router.push).to.have.been.calledWith({pathname: `/${username}`})
  })
})

function getContextStub() {
    const push = spy()
    return {router: {push}}
}
