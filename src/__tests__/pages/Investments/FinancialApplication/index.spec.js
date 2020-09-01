import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import theme from 'styles/theme'

import FinancialApplication from 'pages/Investments/FinancialApplication'

const INITIAL_STATE = {
  investmentsList: {
    data: [
      {
        apelido: 'Occam FI Cambial',
        aplicao_liberada: true,
        categoria_arena: 'Cambial',
        fundo_investidor_profissional: 'N',
        fundo_investidor_qualificado: 'N',
        hora_aplicacao: '23:53',
        id_fundo: '5112',
        is_fundo_ativo: true,
        minimo_inicial: '5000.0',
        nome_carteira: 'OCCAM FI CAMBIAL',
        nome_empresa: 'OCCAM BRASIL GESTÃO DE RECURSOS LTDA.',
        perfil_risco: 'alto',
        perfil_risco_ordem: '5',
        rentabil_fundo_12_meses: '5.81',
        rentabil_fundo_ano: '9.36',
        rentabil_fundo_mes: '1.08',
        resgate_cotizacao: 'D+0 (Úteis)',
        resgate_financeiro: 'D+1 (Úteis)',
        taxa_administracao: '0.75',
        url_logo_gestor:
          'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Logos/LOGO_OCCAM.png',
      },
    ],
  },
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
  investmentPosition: {
    idFund: '5112',
  },
  investmentDetails: {
    data: {
      categoria: 'renda variável',
      data_inicio: '2000-03-21T00:00:00-03:00',
      valor_patrimonio_liq: '2509215443.21',
      taxa_performance: '0.00',
      apelido: 'Western Asset Ativo FI RF',
      contagem_dias_resgate: 'Úteis',
      minimo_inicial: '5000.0',
      nome_gestor: 'Western Asset',
      hora_resgate: '23:59',
      link_lamina:
        'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Informativos-de-Desempenho/INFORMATIVODESEMPENHO_WESTERNASSETATIVOFIRF.pdf',
      link_infor_desempenho:
        'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Informativos-de-Desempenho/INFORMATIVODESEMPENHO_WESTERNASSETATIVOFIRF.pdf',
      link_termo_adesao:
        'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Termos/TERMODECIENCIADERISCO_WESTERNASSETATIVOFIRF.pdf',
      aliquotas_ir: {
        aliquota: [
          { valor: '22.5', faixa: 'Até 180 dias' },
          { valor: '20', faixa: 'De 181 dias a 360 dias' },
          { valor: '17.5', faixa: 'De 361 dias a 720 dias' },
          { valor: '15', faixa: 'Acima de 720 dias' },
        ],
      },
      regime_iof: 'Regime Regressivo',
      classificacao: 'Longo Prazo',
      aplicacao_financeiro: 'D+0',
      nome_carteira: 'WESTERN ASSET RENDA FIXA ATIVO FI',
      link_regulamento:
        'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Regulamentos/REGULAMENTO_WESTERNASSETATIVOFIRF.pdf',
      perfil_risco: 'medio-baixo',
      resgate_cotizacao: 'D+0',
      benchmark: { nome: 'CDI', id: '1' },
      comparativo_hist_rentabil: {
        hist_rentabil_benchmark: {
          rentabil_Ano: '1.85',
          rentabil_24_meses: '10.73',
          rentabil_12_meses: '4.12',
          rentabil_36_meses: '18.58',
          rentabil_dia: '0.00',
          rentabil_mes_anteiror: '0.17',
          benchmark: { nome: 'CDI', id: '1' },
          rentabil_mes: '0.02',
        },
        hist_rentabil_fundo: {
          rel_fundo_benchmark_mes_ant: '103.22',
          rentabil_ano: '1.49',
          rentabil_12_meses: '4.05',
          rentabil_36_meses: '22.64',
          rel_fundo_benchmark_mes: '-',
          rel_fundo_benchmark_dia: '0.00',
          rentabil_mes_anteiror: '0.18',
          rel_fundo_benchmark_24_meses: '134.44',
          rel_fundo_benchmark_ano: '80.54',
          rentabil_24_meses: '14.42',
          rel_fundo_benchmark_36_meses: '121.85',
          id_fundo: '5112',
          rentabil_dia: '-0.81',
          rentabil_mes: '-0.81',
          rel_fundo_benchmark_12_meses: '98.40',
        },
        data_referencia: '2020-07-24T00:00:00-03:00',
      },
      resgate_financeiro: 'D+1',
      hora_aplicacao: '23:59',
      saldo_minimo: '1000.0',
      taxa_administracao: '0.40',
      criterio_recomendacao: '3',
      aplicacao_cotizacao: 'D+0',
      aplicao_minima: '100.00',
    },
    isLoading: false,
    hasError: false,
  },
  alignmentTerms: {
    isLoading: false,
  },
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
  suitabilityInfo: {
    data: {
      status_cotista: true,
      CotistaContaOrdemPortoPar: 'S',
      investidor_qualificado: 'N',
      investidor_profissional: 'N',
      codigo_status_cotista: '122',
      id_cotista: '2000143425',
      status_possui_suitability: true,
      status_data_vigencia_suitability: true,
      status_data_vencimento_cadastro: false,
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

beforeAll(() => {
  // eslint-disable-next-line no-unused-vars
  ReactDOM.createPortal = jest.fn((element, node) => element)
})

afterEach(() => {
  ReactDOM.createPortal.mockClear()
})

jest.mock('../../../../components/FundDetail/Card', () => ({
  __esModule: true,
  default: () => <div></div>,
}))

describe('Investments/FinancialApplication', () => {
  it('Renders correctly', () => {
    const wrapper = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <FinancialApplication
              isAwareOfTerms={false}
              isOpen
              handleClose={() => {}}
              selectedFundId="5112"
              handleFundDetailOpen={() => {}}
            />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    )

    waitForComponentToPaint()
    expect(wrapper).toMatchSnapshot()
  })
})
