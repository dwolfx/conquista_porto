import React from 'react'
import renderer from 'react-test-renderer'

import ManagementConsortiumBuilding from '../../../../pages/ConsortiumBuilding/Management'

it('ManagementConsortiumBuilding renders correctly', () => {
  const tree = renderer.create(<ManagementConsortiumBuilding />).toJSON()
  expect(tree).toMatchSnapshot()
})
