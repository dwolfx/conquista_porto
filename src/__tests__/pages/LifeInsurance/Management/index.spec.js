import React from 'react'
import renderer from 'react-test-renderer'

import LifeInsurance from '../../../../pages/LifeInsurance/Management'

it('LifeInsurance renders correctly', () => {
  const tree = renderer.create(<LifeInsurance />).toJSON()
  expect(tree).toMatchSnapshot()
})
