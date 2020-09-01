import React from 'react'
import { act } from 'react-dom/test-utils'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import theme from 'styles/theme'

import SuccessCard from 'pages/Investments/FinancialApplication/EndOfApplicationFlow/SuccessCard'

const INITIAL_STATE = {
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
}
const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

const waitForComponentToPaint = async () => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
  })
}

describe('Investments/FinancialApplication/EndOfApplicationFlow/SuccessCard', () => {
  it('Renders correctly', () => {
    const wrapper = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <SuccessCard />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    )

    waitForComponentToPaint()
    expect(wrapper).toMatchSnapshot()
  })
})
