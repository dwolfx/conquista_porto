import React from 'react'
import renderer, { act } from 'react-test-renderer'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'

import SumaryMobile from 'pages/TripInsurance/Hire/Sumary'

it('Sumary renders correctly', () => {
  let root
  window.resizeTo(480, 600)
  act(() => {
    root = renderer.create(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SumaryMobile />
        </ThemeProvider>
      </BrowserRouter>
    )
  })

  expect(root.toJSON()).toMatchSnapshot()
})
