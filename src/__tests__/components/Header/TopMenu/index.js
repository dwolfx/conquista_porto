import React from 'react'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import Header from 'components/Header'

it('Header to render', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
