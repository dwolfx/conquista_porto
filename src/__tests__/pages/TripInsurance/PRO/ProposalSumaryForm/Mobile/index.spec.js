import React from 'react'
import { Provider } from 'react-redux'
import createStore from 'redux-mock-store'
import ReactDOM from 'react-dom'
import renderer, { act } from 'react-test-renderer'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'

import InsuranceSummary from 'pages/TripInsurance/PRO/Creation/CustomerProposalOffer/Steps/InsuranceSummary'

const INITIAL_STATE = {
  customerProfile: {
    data: {
      cpfCnpj: '36275312807',
      customerName: 'Rubao',
      customerEmail: 'ricardo.eufrasio@portoseguro.com.br',
      customerState: 'SP',
      customerBirthdate: '1981-11-11T00:00:00-03:00',
      customerPhoneNumber: '996229303',
      customerAreaCode: '11',
      customerGender: 'M',
    },
    isLoading: false,
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

it('ProposalSumaryForm renders correctly', () => {
  let root
  window.resizeTo(480, 600)
  act(() => {
    root = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <InsuranceSummary />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    )
  })

  expect(root.toJSON()).toMatchSnapshot()
})
