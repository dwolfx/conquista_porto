import React from 'react'
// import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import renderer, { act } from 'react-test-renderer'

// import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'
import ComissionDetailsModal from 'pages/TripInsurance/PRO/Creation/PartnerOffer/Steps/TravelDetailsForm/ComissionDetailsModal'

beforeAll(() => {
  // eslint-disable-next-line no-unused-vars
  ReactDOM.createPortal = jest.fn((element, node) => element)
})

afterEach(() => {
  ReactDOM.createPortal.mockClear()
})

it('ComissionDetailsModal renders correctly', () => {
  let root
  const handleCloseMockFn = jest.fn()
  act(() => {
    root = renderer.create(
      <ThemeProvider theme={theme}>
        <ComissionDetailsModal isOpen handleClose={handleCloseMockFn} />
      </ThemeProvider>
    )
  })

  expect(root.toJSON()).toMatchSnapshot()
})
