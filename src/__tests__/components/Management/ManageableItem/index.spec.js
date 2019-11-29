import React from 'react'
import renderer from 'react-test-renderer'

import ManageableItem from '../../../../components/Management/ManageableItem'

it('ManageableItem renders correctly', () => {
  const tree = renderer
    .create(
      <ManageableItem>
        <span>testando</span>
      </ManageableItem>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
