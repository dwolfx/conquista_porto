import React from 'react'
import { Provider } from 'react-redux'
import createStore from 'redux-mock-store'
import ReactDOM from 'react-dom'
import renderer, { act } from 'react-test-renderer'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'

import CustomerTravelDetailsForm from 'pages/TripInsurance/PRO/Creation/PartnerOffer/Steps/CustomerTravelDetailsForm'

const INITIAL_STATE = {
  fluxManagement: { stack: [], form: {} },
}

const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

beforeAll(() => {
  ReactDOM.createPortal = jest.fn(element => element)
})

afterEach(() => {
  ReactDOM.createPortal.mockClear()
})

it('CustomerTravelDetailsForm renders correctly', () => {
  let root

  act(() => {
    root = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CustomerTravelDetailsForm />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    )
  })

  expect(root.toJSON()).toMatchSnapshot()
})
