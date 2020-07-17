import React from 'react'
import { MemoryRouter, RouteProps, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { renderWithReduxAndTheme, fireEvent } from 'testUtils'
import { storeFactory } from 'setupTests'
import theme from 'styles/theme'
import 'jest-styled-components'

import FundsCarousel from '.'

const mock = [
  {
    saldo_atual: '31905.05',
    data_inicio: '2013-03-28T00:00:00-03:00',
    valor_patrimonio_liq: '65572971.83',
    taxa_performance: '0.00',
    apelido: 'Porto Seguro Alocação FIC FIM',
    contagem_dias_resgate: 'Corridos',
    minimo_inicial: '1000.0',
    nome_gestor: 'PortoSeguro Investimentos',
    hora_resgate: '23:59',
    link_lamina:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/InformativoDesempenho_PS_Alocacao.pdf',
    link_infor_desempenho:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/InformativoDesempenho_PS_Alocacao.pdf',
    categoria_ambima: 'Multimercado Alocação Dinâmicos',
    is_fundo_ativo: true,
    aplicao_liberada: true,
    aviso_data_fundo: true,
    link_termo_adesao:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/TCR_PS_Alocacao.pdf',
    resgate_minimo: '1000.0',
    url_logo_gestor:
      'https://www.portoseguro.com.br/conteudo/solucoes-financeiras/investimentos/arena/assets/images/fundoLogos/logo-porto-investimentos.png',
    aliquotas_ir: {
      aliquota: [
        {
          valor: '22.5',
          faixa: 'Até 180 dias',
        },
        {
          valor: '20',
          faixa: 'De 181 dias a 360 dias',
        },
        {
          valor: '17.5',
          faixa: 'De 361 dias a 720 dias',
        },
        {
          valor: '15',
          faixa: 'Acima de 720 dias',
        },
      ],
    },
    resgate_liberado: false,
    categoria_arena: 'Multimercado',
    id_carteira: '5112',
    regime_iof: 'Regime Regressivo',
    classificacao: 'Longo Prazo',
    aplicacao_financeiro: 'D+0',
    nome_carteira: 'Porto Seguro Alocação FIC FIM',
    link_regulamento:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/Regulamento_PS_Alocacao.pdf',
    perfil_risco: 'medio-alto',
    resgate_cotizacao: 'D+32 (Corridos)',
    nome_empresa: 'PortoSeguro Investimentos',
    benchmark: {
      nome: 'CDI',
      id: '1',
    },
    comparativo_hist_rentabil: {
      hist_rentabil_benchmark: {
        rentabil_Ano: '1.02',
        rentabil_24_meses: '12.14',
        rentabil_12_meses: '5.45',
        rentabil_36_meses: '21.57',
        rentabil_dia: '0.01',
        rentabil_mes_anteiror: '0.29',
        benchmark: {
          nome: 'CDI',
          id: '1',
        },
        rentabil_mes: '0.34',
      },
      hist_rentabil_fundo: {
        rel_fundo_benchmark_mes_ant: '-',
        rentabil_ano: '-3.01',
        rentabil_12_meses: '6.53',
        rentabil_36_meses: '25.29',
        rel_fundo_benchmark_mes: '-',
        rel_fundo_benchmark_dia: '-',
        rentabil_mes_anteiror: '-0.71',
        rel_fundo_benchmark_24_meses: '105.04',
        rel_fundo_benchmark_ano: '-',
        rentabil_24_meses: '12.75',
        rel_fundo_benchmark_36_meses: '117.24',
        id_carteira: '5112',
        rentabil_dia: '-0.02',
        rentabil_mes: '-2.95',
        rel_fundo_benchmark_12_meses: '119.78',
      },
      data_referencia: '2020-03-23T00:00:00-03:00',
    },
    tipo_cota: 'Fechamento',
    hora_aplicacao: '23:59',
    resgate_financeiro: 'D+2 (Úteis)',
    perfil_risco_ordem: '4',
    saldo_minimo: '1000.0',
    taxa_administracao: '0.50',
    aplicacao_cotizacao: 'D+0',
    aplicao_minima: '1000.0',
  },
  {
    saldo_atual: '3337.22',
    data_inicio: '2013-07-31T00:00:00-03:00',
    valor_patrimonio_liq: '79743742.67',
    taxa_performance: '20.00',
    apelido: 'Porto Seguro Selecta FIC FIA',
    contagem_dias_resgate: 'Corridos',
    minimo_inicial: '1000.0',
    nome_gestor: 'PortoSeguro Investimentos',
    hora_resgate: '23:59',
    link_lamina:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/acoes/InformativoDesempenho_PS_Selecta.pdf',
    link_infor_desempenho:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/acoes/InformativoDesempenho_PS_Selecta.pdf',
    categoria_ambima: 'Ações Ativos Livre',
    is_fundo_ativo: true,
    aplicao_liberada: true,
    aviso_data_fundo: true,
    link_termo_adesao:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/acoes/TCR_PS_%20Selecta.pdf',
    resgate_minimo: '100.0',
    url_logo_gestor:
      'https://www.portoseguro.com.br/conteudo/solucoes-financeiras/investimentos/arena/assets/images/fundoLogos/logo-porto-investimentos.png',
    aliquotas_ir: {
      aliquota: {
        valor: '15',
        faixa: 'Alíquota Única',
      },
    },
    resgate_liberado: true,
    categoria_arena: 'Renda Variável',
    id_carteira: '5094',
    regime_iof: 'Regime Regressivo',
    classificacao: 'Ações',
    aplicacao_financeiro: 'D+0',
    nome_carteira: 'Porto Seguro Selecta FIC FIA',
    link_regulamento:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/acoes/Regulamento_PS_Selecta.pdf',
    perfil_risco: 'alto',
    resgate_cotizacao: 'D+15 (Corridos)',
    nome_empresa: 'PortoSeguro Investimentos',
    benchmark: {
      nome: 'IBOVESPA',
      id: '70',
    },
    comparativo_hist_rentabil: {
      hist_rentabil_benchmark: {
        rentabil_Ano: '-1.63',
        rentabil_24_meses: '33.97',
        rentabil_12_meses: '16.81',
        rentabil_36_meses: '75.91',
        rentabil_dia: '1.52',
        rentabil_mes_anteiror: '6.85',
        benchmark: {
          nome: 'IBOVESPA',
          id: '70',
        },
        rentabil_mes: '-1.63',
      },
      hist_rentabil_fundo: {
        rel_fundo_benchmark_mes_ant: '0.34',
        rentabil_ano: '3.05',
        rentabil_12_meses: '35.40',
        rentabil_36_meses: '82.14',
        rel_fundo_benchmark_mes: '4.68',
        rel_fundo_benchmark_dia: '-',
        rentabil_mes_anteiror: '7.19',
        rel_fundo_benchmark_24_meses: '12.27',
        rel_fundo_benchmark_ano: '4.68',
        rentabil_24_meses: '46.24',
        rel_fundo_benchmark_36_meses: '6.23',
        id_carteira: '5094',
        rentabil_dia: '1.42',
        rentabil_mes: '3.05',
        rel_fundo_benchmark_12_meses: '18.59',
      },
      data_referencia: '2020-01-17T00:00:00-03:00',
    },
    tipo_cota: 'Fechamento',
    hora_aplicacao: '23:59',
    resgate_financeiro: 'D+2 (Úteis)',
    perfil_risco_ordem: '5',
    saldo_minimo: '0.0',
    taxa_administracao: '2.00',
    aplicacao_cotizacao: 'D+0',
    aplicao_minima: '100.0',
  },
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
    const { getByTestId } = renderWithReduxAndTheme(
      <MemoryRouter>
        <FundsCarousel
          displayInformation
          idFund="0001"
          onHandleChangeIdFund={id => {}}
          filteredFunds={mock}
        />
      </MemoryRouter>
    )
    expect(getByTestId('button-add-fund')).toBeDefined()
  })
  test('It shows a list of slides', () => {
    const { getAllByTestId } = renderWithReduxAndTheme(
      <MemoryRouter>
        <FundsCarousel
          displayInformation
          idFund="0001"
          onHandleChangeIdFund={id => {}}
          filteredFunds={mock}
        />
      </MemoryRouter>
    )
    expect(getAllByTestId('component-chip')).toHaveLength(2)
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
        <FundsCarousel
          displayInformation
          idFund="0001"
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
          <FundsCarousel
            displayInformation
            idFund="5112"
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
              <FundsCarousel
                displayInformation
                idFund="5094"
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
          <FundsCarousel
            displayInformation
            idFund="5112"
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
          <FundsCarousel
            displayInformation
            idFund="5112"
            onHandleChangeIdFund={id => {}}
            filteredFunds={mock}
          />
        </MemoryRouter>
      )
      expect(getByText('R$ 31.905,05')).toHaveStyleRule('color', '#272727')
    })
  })
})
