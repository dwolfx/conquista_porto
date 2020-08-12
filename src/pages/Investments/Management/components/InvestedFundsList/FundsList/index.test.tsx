import React from 'react'
import { MemoryRouter, RouteProps, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { storeFactory } from 'setupTests'
import { renderWithReduxAndTheme, fireEvent } from 'testUtils'
import theme from 'styles/theme'
import 'jest-styled-components'

import FundsList from '.'
const mock = [
  {
    "categoria": "Multimercado",
    "contagem_dias_resgate": "Corridos",
    "aplicacao_cotizacao": "0",
    "aplicacao_financeiro": "0",
    "resgate_cotizacao": "32",
    "resgate_financeiro": "2",
    "categoria_arena": "Multimercado",
    "saldo_minimo": 1000,
    "resgate_minimo": 1000,
    "resgate_liberado": false,
    "saldo_bloqueado": 0,
    "aplicao_minima": 1000,
    "nome_gestor": "PortoSeguro Investimentos",
    "id": 5112,
    "id_cotista": 2000112690,
    "fundo": "Porto Seguro Alocação FIC FIM",
    "saldo_bruto": "R$ 31.905,05",
    "saldo_liquido": "R$ 31.905,05",
    "valor_ir": "R$ 0,00",
    "valor_iof": "R$ 0,00",
    "valor_cota": "R$ 1,90",
    "quantidade_cota": 16804.33,
    "perfil_risco_ordem": 4,
    "data_historico": "2020-03-22T21:00:00",
    "data_historico_formatada": "22/03/2020",
    "pdf_informativo_desempenho": "https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/InformativoDesempenho_PS_Alocacao.pdf",
    "pdf_regulamento": "https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/Regulamento_PS_Alocacao.pdf",
    "saldo_bruto_numerico": 31905.05,
    "perfil_risco": "medio-alto"
  },
  {
    "categoria": "Renda Variável",
    "contagem_dias_resgate": "Corridos",
    "aplicacao_cotizacao": "0",
    "aplicacao_financeiro": "0",
    "resgate_cotizacao": "15",
    "resgate_financeiro": "2",
    "categoria_arena": "Renda Variável",
    "saldo_minimo": 0,
    "resgate_minimo": 100,
    "resgate_liberado": true,
    "saldo_bloqueado": 0,
    "aplicao_minima": 100,
    "nome_gestor": "PortoSeguro Investimentos",
    "id": 5094,
    "id_cotista": 2000112690,
    "fundo": "Porto Seguro Selecta FIC FIA",
    "saldo_bruto": "R$ 3.337,22",
    "saldo_liquido": "R$ 3.271,64",
    "valor_ir": "R$ 65,58",
    "valor_iof": "R$ 0,00",
    "valor_cota": "R$ 2,49",
    "quantidade_cota": 1338.2,
    "perfil_risco_ordem": 5,
    "data_historico": "2020-01-16T21:00:00",
    "data_historico_formatada": "16/01/2020",
    "pdf_informativo_desempenho": "https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/acoes/InformativoDesempenho_PS_Selecta.pdf",
    "pdf_regulamento": "https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/acoes/Regulamento_PS_Selecta.pdf",
    "saldo_bruto_numerico": 3337.22,
    "perfil_risco": "alto"
  }
]
const store = storeFactory({
  investmentPosition: {
    displayInformation: false,
    isLoading: false,
    hasError: false,
    data: null,
  },
})

describe('It renders correctly', () => {
  test('It shows "add fund" button', () => {
    const { getByRole } = renderWithReduxAndTheme(
      <MemoryRouter>
        <FundsList
          displayInformation
          idFund={5112}
          onHandleChangeIdFund={id => {}}
          filteredFunds={mock}
        />
      </MemoryRouter>
    )
    expect(getByRole('button', { name: /Adicionar fundo/i })).toBeDefined()
  })
  test('It shows a funds list', () => {
    const { getAllByTestId } = renderWithReduxAndTheme(
      <MemoryRouter>
        <FundsList
          displayInformation
          idFund={5112}
          onHandleChangeIdFund={id => {}}
          filteredFunds={mock}
        />
      </MemoryRouter>
    )
    expect(getAllByTestId('fund-list-item')).toHaveLength(2)
  })
})

describe('It behaves correcly', () => {
  test('It redirects to funds list after clicking add button', () => {
    let locationLocal: RouteProps['location']
    const { getByTestId } = renderWithReduxAndTheme(
      <MemoryRouter initialEntries={['/investimentos/visualizar']}>
        <Route
          path="*"
          render={({ location }) => {
            locationLocal = location
            return null
          }}
        />
        <FundsList
          displayInformation
          idFund={5112}
          onHandleChangeIdFund={id => {}}
          filteredFunds={mock}
        />
      </MemoryRouter>
    )
    fireEvent.click(getByTestId('button-add-fund'))

    expect(locationLocal!.pathname).toBe('/investimentos/lista-fundos')
  })
  describe('It highlights the selected fund', () => {
    test('It highlights fund when click on it', () => {
      const { getByText, rerender } = renderWithReduxAndTheme(
        <MemoryRouter>
          <FundsList
            displayInformation
            idFund={5112}
            onHandleChangeIdFund={id => {}}
            filteredFunds={mock}
          />
        </MemoryRouter>
      )
      expect(getByText('Porto Seguro Selecta FIC FIA')).toHaveStyleRule(
        'color',
        '#898989'
      )
      expect(getByText('R$ 3.337,22')).toHaveStyleRule('color', '#898989')

      fireEvent.click(getByText('Porto Seguro Selecta FIC FIA'))

      rerender(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <MemoryRouter>
              <FundsList
                displayInformation
                idFund={5112}
                onHandleChangeIdFund={id => {}}
                filteredFunds={mock}
              />
            </MemoryRouter>
          </ThemeProvider>
        </Provider>
      )
      expect(getByText('Porto Seguro Selecta FIC FIA')).toHaveStyleRule(
        'color',
        '#00ADEF'
      )
      expect(getByText('R$ 3.337,22')).toHaveStyleRule('color', '#272727')
    })
    test('It highlight fund name in blue', () => {
      const { getByText } = renderWithReduxAndTheme(
        <MemoryRouter>
          <FundsList
            displayInformation
            idFund={5112}
            onHandleChangeIdFund={id => {}}
            filteredFunds={mock}
          />
        </MemoryRouter>
      )
      expect(getByText('Porto Seguro Alocação FIC FIM')).toHaveStyleRule(
        'color',
        '#00ADEF'
      )
    })
    test('It highlight fund ballance in black bold', () => {
      const { getByText } = renderWithReduxAndTheme(
        <MemoryRouter>
          <FundsList
            displayInformation
            idFund={5112}
            onHandleChangeIdFund={id => {}}
            filteredFunds={mock}
          />
        </MemoryRouter>
      )
      expect(getByText('R$ 31.905,05')).toHaveStyleRule('color', '#272727')
    })
  })
})
