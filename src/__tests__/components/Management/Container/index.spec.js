import React from 'react'
import renderer from 'react-test-renderer'

import Container from '../../../../components/Management/Container'

it('Container renders correctly', () => {
  const tree = renderer
    .create(
      <Container>
        <span>testando</span>
      </Container>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
