import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import Tabs from 'components/Tabs'

describe('Tabs', () => {
  it('Tabs to render', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Tabs>Primeira tab</Tabs>
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
