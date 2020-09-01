import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import CheckboxItem from 'pages/Notifications/Configurations/CheckboxItem'

it('CheckboxItem renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <CheckboxItem />
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
