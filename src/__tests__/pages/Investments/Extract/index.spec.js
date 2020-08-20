import React from 'react'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import theme from 'styles/theme'

import Extract from 'pages/Investments/Extract'

const INITIAL_STATE = {
  auth: {
    cpf: '030302151',
  },
  bankData: {
    data: {
      UltimasOperacoes: {
        transacoes: {
          transacao: [
            {
              tipo: 'RESGATE',
              data: '2020-03-06T00:00:00-03:00',
              valor: '97.83',
            },
            {
              tipo: 'TED',
              data: '2020-02-28T00:00:00-03:00',
              valor: '102.06',
            },
          ],
        },
      },
      DadosContaPortoSeguro: {
        id_conta: '193791',
        cheque_especial: {
          limite: '0',
          data_vencimento: '0001-01-03T00:00:00-03:00',
        },
        conta: '47',
        nome_banco: 'Banco Portopar',
        saldo_liquidar: '1003.40',
        agencia: '0001',
        codigo_banco: '306',
        saldo_disponivel: '1000000.0',
        cpf: '33244452809',
        encargos_acumulados: '0',
        valores_bloqueados: {
          judicial: '0',
          em_24horas: '0',
          indeterminado: '0',
          em_48horas: '0',
        },
        digito_conta: '7',
        titular: 'Rafael Rodrigues',
      },
    },
  },
  bankExtract: {
    data: {
      transacoes: {
        transacao: [
          {
            tipo: 'APLICAÇÃO',
            data: '2019-07-03T00:00:00-03:00',
            valor: '-500',
          },
          {
            tipo: 'TED',
            data: '2019-08-27T00:00:00-03:00',
            valor: '100',
          },
        ],
      },
      conta: {
        'xsi:type': 'ns3:ContaPortoSeguroType',
        conta: '47',
        cpf: '030302151',
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        digito_conta: '0',
        nome_titular: 'Código Conquista',
        agencia: '0001',
        titular: 'Código Conquista',
        codigo_banco: '420',
      },
    },
  },
}

const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

describe('Investments/Extract', () => {
  it('Renders correctly', () => {
    const wrapper = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <Extract />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    )

    expect(wrapper).toMatchSnapshot()
  })
  it('Renders correctly with idFundo', () => {
    window.location = '/investimentos/extrato?idFundo=11111'

    const wrapper = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <Extract />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
