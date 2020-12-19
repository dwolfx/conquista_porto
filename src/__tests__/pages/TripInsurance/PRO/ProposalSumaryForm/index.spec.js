import React from 'react'
import renderer, { act } from 'react-test-renderer'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'

import ProposalSumaryForm from 'pages/TripInsurance/PRO/ProposalSumaryForm'

it('ProposalSumaryForm renders correctly', () => {
  let root

  act(() => {
    root = renderer.create(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ProposalSumaryForm />
        </ThemeProvider>
      </BrowserRouter>
    )
  })

  expect(root.toJSON()).toMatchSnapshot()
})
