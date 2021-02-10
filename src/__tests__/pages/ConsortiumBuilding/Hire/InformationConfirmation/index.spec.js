import React from 'react'
import renderer, { act } from 'react-test-renderer'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import theme from 'styles/theme'

import InformationConfirmation from 'pages/ConsortiumBuilding/Hire/InformationConfirmation'

const INITIAL_STATE = {
  customerProfile: {
    data: {
      cpfCnpj: '36275312807',
      customerName: 'Rubao Teste',
      customerEmail: 'ricardo.eufrasio@portoseguro.com.br',
      customerState: 'SP',
      customerBirthdate: '1981-11-11T00:00:00-03:00',
    },
    status: 'loaded',
    hasError: false,
    isLoading: false,
  },
  fluxManagement: { stack: [], form: {} },
}
const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

it('InformationConfirmation - Consortium Building - renders correctly', () => {
  let root

  act(() => {
    root = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <InformationConfirmation />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    )
  })

  expect(root.toJSON()).toMatchSnapshot()
})
