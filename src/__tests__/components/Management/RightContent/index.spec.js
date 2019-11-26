import React from 'react'
import renderer from 'react-test-renderer'

import RightContent from '../../../../components/Management/RightContent'

it('RightContent renders correctly', () => {
  const tree = renderer
    .create(
      <RightContent>
        <span>testando</span>
      </RightContent>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
