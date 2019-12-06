import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import Points from 'pages/Points'

it('Points renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Points />
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
