import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import Configurations from 'pages/Notifications/Configurations'

it('Configurations renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Configurations />
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
