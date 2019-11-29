import React from 'react'
import renderer from 'react-test-renderer'

import LinearProgressBar from '../../../components/LinearProgressBar'

it('LinearProgressBar renders correctly (with subtitle)', () => {
  const tree = renderer
    .create(
      <LinearProgressBar
        width="70%"
        margin="70px 0 0 0"
        now={10}
        max={12}
        subtitle="parcelas"
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('LinearProgressBar renders correctly (without subtitle)', () => {
  const tree = renderer
    .create(
      <LinearProgressBar width="70%" margin="70px 0 0 0" now={4} max={12} />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
