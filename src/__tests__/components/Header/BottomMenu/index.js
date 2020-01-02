import React from 'react'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import BottomMenu from 'components/Header/BottomMenu'

it('Header to render', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <BottomMenu />
        </BrowserRouter>
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
