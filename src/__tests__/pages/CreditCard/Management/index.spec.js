import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import theme from 'styles/theme'

import ManagementCreditCard from '../../../../pages/CreditCard/Management'

const INITIAL_STATE = {
  creditCard: {
    data: [
      {
        Id: 1,
        CodigoCanal: 0,
        CpfCnpj: '33244452809',
        Bandeira: 'Visa',
        Fatura: {
          MelhorDataCompra: 22,
          Status: 'Aberta',
          Valor: 25090,
          Vencimento: 16,
        },
        LimiteCartaoAdicional: {
          LimiteCredito: 0,
          LimiteDisponivel: 0,
          LimiteDisponivelOverlimitt: 0,
          LimiteSaque: 0,
        },
        LimiteTitularCartao: {
          LimiteCredito: 0,
          LimiteDisponivel: 0,
          LimiteDisponivelOverlimitt: 0,
          LimiteSaque: 0,
        },
        Link: 'string',
        Tipo: 'Gold',
        UltimosDigitos: 3212,
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
          <MemoryRouter>
            <ManagementCreditCard />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
