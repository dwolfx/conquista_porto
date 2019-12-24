import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import theme from 'styles/theme'

import ManagementCreditCard from '../../../../pages/CreditCard/Management'

const INITIAL_STATE = {
  creditCard: {
    data: [
      {
        id: 1,
        bandeira: 'Visa',
        fatura: {
          melhorDataCompra: 22,
          status: 'Aberta',
          valor: 25090,
          vencimento: 16,
        },
        limiteCartaoAdicional: {
          limiteCredito: 0,
          limiteDisponivel: 0,
          limiteDisponivelOverlimitt: 0,
          limiteSaque: 0,
        },
        limiteTitularCartao: {
          limiteCredito: 0,
          limiteDisponivel: 0,
          limiteDisponivelOverlimitt: 0,
          limiteSaque: 0,
        },
        link: 'string',
        tipo: 'Gold',
        ultimosDigitos: 3212,
      },
    ],
  },
}
const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

it('ManagementCreditCard renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ManagementCreditCard history={{ push: () => {} }} />
        </ThemeProvider>
      </Provider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
