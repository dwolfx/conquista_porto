import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import renderer, { act } from 'react-test-renderer'
import createStore from 'redux-mock-store'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'

import SumaryMobile from 'pages/TripInsurance/Hire/Sumary'
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
  // eslint-disable-next-line no-unused-vars
  ReactDOM.createPortal = jest.fn((element, node) => element)
})

afterEach(() => {
  ReactDOM.createPortal.mockClear()
})

it('Sumary renders correctly', () => {
  let root
  window.resizeTo(480, 600)
  act(() => {
    root = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <SumaryMobile />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    )
  })

  expect(root.toJSON()).toMatchSnapshot()
})
