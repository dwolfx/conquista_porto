import React from 'react'
import renderer from 'react-test-renderer'

import ManagementConsortiumVehicle from '../../../../pages/ConsortiumVehicle/Management'

it('ManagementConsortiumVehicle renders correctly', () => {
  const tree = renderer.create(<ManagementConsortiumVehicle />).toJSON()
  expect(tree).toMatchSnapshot()
})
