import React from 'react'
import renderer from 'react-test-renderer'

import ManagementCreditCard from '../../../../pages/CreditCard/Management'

it('ManagementCreditCard renders correctly', () => {
  const tree = renderer.create(<ManagementCreditCard />).toJSON()
  expect(tree).toMatchSnapshot()
})
