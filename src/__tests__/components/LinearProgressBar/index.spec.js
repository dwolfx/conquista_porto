import React from 'react'
import renderer from 'react-test-renderer'
import theme from 'styles/theme'
import { ThemeProvider } from 'styled-components'

import LinearProgressBar from '../../../components/LinearProgressBar'

it('LinearProgressBar renders correctly (with subtitle)', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <LinearProgressBar
          width="70%"
          margin="70px 0 0 0"
          now={10}
          max={12}
          subtitle="parcelas"
        />
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('LinearProgressBar renders correctly (without subtitle)', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <LinearProgressBar width="70%" margin="70px 0 0 0" now={4} max={12} />
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
