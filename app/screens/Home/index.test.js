import React from 'react'
import {render, mount} from 'enzyme'
import {spy} from 'sinon'
import Home from './index'

describe(Home.displayName, () => {
  it('should render a form to input a github username', () => {
    const wrapper = render(<Home />)
    expect(wrapper).descendants('form input')
    expect(wrapper).descendants('form button[type=submit]')
  })

  it('should route to the user page with the username when the form is submitted', () => {
    const username = 'defunkt'
    const push = spy()
    const context = {router: {push}}

    const wrapper = mount(<Home />, {context})

    const form = wrapper.find('form')
    const input = wrapper.find('input')

    input.node.value = username
    form.simulate('submit')
    
    expect(push).to.have.been.calledOnce
    expect(push).to.have.been.calledWith({pathname: `/${username}`})
  })
})
