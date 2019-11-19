import React from 'react'
import renderer from 'react-test-renderer'

import Points from '../../../pages/Points'

it('Points renders correctly', () => {
  const tree = renderer.create(<Points />).toJSON()
  expect(tree).toMatchSnapshot()
})
