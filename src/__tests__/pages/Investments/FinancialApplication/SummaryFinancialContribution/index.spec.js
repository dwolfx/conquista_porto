import React from 'react'
import { act } from 'react-dom/test-utils'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import theme from 'styles/theme'

import SummaryFinancialContribution from 'pages/Investments/FinancialApplication/SummaryFinancialContribution'

const INITIAL_STATE = {
  financialApplicationGetData: {
    data: {
      Message: {
        TipoCritica: 'SUCESSO',
        Mensagem: 'SUCESSO',
      },
      dados_para_aplicacao: {
        fundo: {
          id_carteira: 5112,
          apelido: 'Porto Seguro Alocação FIC FIM',
          nome_carteira: 'Porto Seguro Alocação FIC FIM',
          perfil_risco: 'medio-alto',
          data_inicio: '2013-03-28T00:00:00-03:00',
          minimo_inicial: 1000,
          aplicacao_minima: 1000,
          resgate_minimo: 1000,
          saldo_minimo: 1000,
          hora_aplicacao: '15:00',
          hora_resgate: '23:59',
          aplicacao_cotizacao: 'D+0',
          aplicacao_financeiro: 'D+0',
          resgate_cotizacao: 'D+32 (Corridos)',
          resgate_financeiro: 'D+2 (Úteis)',
          categoria_arena: '03-Multimercado',
          taxa_administracao: 0.5,
          taxa_performance: 0,
          classificacao: 'medio-alto',
          link_termo_adesao:
            'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/TCR_PS_Alocacao.pdf',
          tipo_cota: 'Fechamento',
          aviso_data_fundo: true,
          aplicacao_liberada: true,
          resgate_liberado: false,
        },
        posicao_cotista_fundo: {
          saldo_atual: 31905.05,
          data_historico: '2020-03-23T00:00:00',
        },
        id_cotista: 2000143425,
        saldo_conta: 1987123.99,
        aderente_fundo: false,
        fechado_aplicacao: false,
        data_prevista_cotizacao: '2020-07-09T00:00:00-03:00',
        data_prevista_liquidacao: '2020-07-09T00:00:00-03:00',
        data_operacao: '2020-07-20T00:00:00-03:00',
      },
    },
    hasError: false,
    isLoading: false,
  },
}
const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

const waitForComponentToPaint = async () => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
  })
}

// beforeAll(() => {
//   // eslint-disable-next-line no-unused-vars
//   ReactDOM.createPortal = jest.fn((element, node) => element)
// })

// afterEach(() => {
//   ReactDOM.createPortal.mockClear()
// })

describe('Investments/FinancialApplication/SummaryFinancialContribution', () => {
  it('Renders correctly', () => {
    const wrapper = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <SummaryFinancialContribution
              idFundo="5112"
              acceptAlignmentTerms={false}
              formData={{
                moneyToInvest: '1000',
                whenToInvest: '20/08/2020',
                isAwareOfTerms: false,
                updated: false,
              }}
              previousStep={() => {}}
              onChangeRequestStatus={() => {}}
              errorCount={0}
              onChangeErrorCount={() => {}}
            />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    )

    waitForComponentToPaint()
    expect(wrapper).toMatchSnapshot()
  })
})
