import React from 'react'
import {render} from 'enzyme'
import ProfileStat from './ProfileStat'

describe('ProfileStat', () => {
  it('should render the `value` in <h2>', () => {
    const value = 42
    const wrapper = renderDefaults({value})
    expect(wrapper.find('h2')).to.contain.text(value)
  })

  it('should render the `label` in <small>', () => {
    const label = 'Snickers'
    const wrapper = renderDefaults({label})
    expect(wrapper.find('small')).to.contain.text(label)
  })
})

function renderDefaults(props = {value: 12, label: 'Candy'}) {
  return render(<ProfileStat {...props} />)
}
