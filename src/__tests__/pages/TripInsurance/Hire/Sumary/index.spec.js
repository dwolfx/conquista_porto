import React from 'react'
import renderer, { act } from 'react-test-renderer'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import theme from 'styles/theme'

import Sumary from 'pages/TripInsurance/Hire/Sumary'
import tripInsuranceQuotationMock from 'mocks/tripInsuranceQuotation.json'
import tripInsuranceCreditCardMock from 'mocks/tripInsuranceCreditCard.json'
import tripInsuranceProposalMock from 'mocks/tripInsuranceProposal.json'

const INITIAL_STATE = {
  tripInsuranceQuotation: {
    data: tripInsuranceQuotationMock,
    isLoading: false,
    hasError: false,
  },
  tripInsuranceCreditCard: {
    data: tripInsuranceCreditCardMock,
    isLoading: false,
    hasError: false,
  },
  tripInsuranceProposal: {
    data: tripInsuranceProposalMock,
    isLoading: false,
    hasError: false,
  },
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
it('Sumary renders correctly', () => {
  let root

  act(() => {
    root = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Sumary />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    )
  })

  expect(root.toJSON()).toMatchSnapshot()
})
