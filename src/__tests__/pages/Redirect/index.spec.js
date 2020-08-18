import React from 'react'
import renderer, { act } from 'react-test-renderer'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'

import Redirect from 'pages/Redirect'

it('Redirect renders correctly', () => {
  let root

  act(() => {
    root = renderer.create(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Redirect />
        </ThemeProvider>
      </BrowserRouter>
    )
  })

  expect(root.toJSON()).toMatchSnapshot()
})
