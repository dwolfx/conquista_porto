import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import Tab from 'components/Tab'

describe('Tabs', () => {
  it('Tabs to render', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Tab>Primeira tab</Tab>
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
