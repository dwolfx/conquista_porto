import React from 'react'
import renderer from 'react-test-renderer'

import LeftNav from '../../../../components/Management/LeftNav'

it('LeftNav renders correctly', () => {
  const tree = renderer
    .create(
      <LeftNav>
        <span>testando</span>
      </LeftNav>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
