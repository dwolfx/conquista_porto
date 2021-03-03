import React from 'react'
import ReactDOM from 'react-dom'
import renderer, { act } from 'react-test-renderer'

import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'
import ProposalSkeleton from 'pages/TripInsurance/PRO/Creation/PartnerOffer/Steps/TravelDetailsForm/ProposalSkeleton'

beforeAll(() => {
  ReactDOM.createPortal = jest.fn(element => element)
})

afterEach(() => {
  ReactDOM.createPortal.mockClear()
})

it('ComissionDetailsModal renders correctly', () => {
  let root
  act(() => {
    root = renderer.create(
      <ThemeProvider theme={theme}>
        <ProposalSkeleton />
      </ThemeProvider>
    )
  })

  expect(root.toJSON()).toMatchSnapshot()
})
