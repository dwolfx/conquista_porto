import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import { storeFactory } from 'setupTests'

import FundDetailCard from '.'
import { fireEvent } from '@testing-library/react'

const responseMock = {
  link_regulamento:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/Regulamento_PS_Alocacao.pdf',
  link_lamina:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/InformativoDesempenho_PS_Alocacao.pdf',
  link_infor_desempenho:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/InformativoDesempenho_PS_Alocacao.pdf',
  comparativo_hist_rentabil: {
    hist_rentabil_benchmark: {
      benchmark: {
        id: 1,
        nome: 'CDI',
      },
      rentabil_Ano: '1.01',
      rentabil_mes: '0.34',
      rentabil_dia: '0.01',
      rentabil_mes_anteiror: '0.29',
      rentabil_12_meses: '5.45',
      rentabil_24_meses: '12.14',
      rentabil_36_meses: '21.57',
    },
    hist_rentabil_fundo: {
      id_carteira: 5112,
      rentabil_dia: '-0.02',
      rentabil_mes: '-2.95',
      rentabil_ano: '-3.01',
      rentabil_mes_anteiror: '-0.71',
      rentabil_12_meses: '6.53',
      rentabil_24_meses: '12.75',
      rentabil_36_meses: '25.29',
      rel_fundo_benchmark_dia: '-',
      rel_fundo_benchmark_mes: '-',
      rel_fundo_benchmark_ano: '-',
      rel_fundo_benchmark_mes_ant: '-',
      rel_fundo_benchmark_12_meses: '119.78',
      rel_fundo_benchmark_24_meses: '105.04',
      rel_fundo_benchmark_36_meses: '117.24',
    },
  },
  benchmark: {
    id: 1,
    nome: 'CDI',
  },
  regime_iof: 'Regime Regressivo',
  aliquotas_ir: [
    {
      faixa: 'Até 180 dias',
      valor: 22.5,
    },
    {
      faixa: 'De 181 dias a 360 dias',
      valor: 20,
    },
    {
      faixa: 'De 361 dias a 720 dias',
      valor: 17.5,
    },
    {
      faixa: 'Acima de 720 dias',
      valor: 15,
    },
  ],
  classificacao: 'Longo Prazo',
  hora_resgate: '20:59',
  taxa_performance: 0.0,
  contagem_dias_resgate: 'Corridos',
  valor_patrimonio_liq: 0.0,
  data_inicio: 1364428800000,
  criterio_recomendacao: '1',
  aplicacao_cotizacao: '0',
  aplicacao_financeiro: '0',
  resgate_cotizacao: '32',
  resgate_financeiro: '2',
  link_termo_adesao:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/TCR_PS_Alocacao.pdf',
  id_carteira: 5112,
  apelido: 'Porto Seguro Alocação FIC FIM',
  nome_carteira: 'Porto Seguro Alocação FIC FIM',
  taxa_administracao: 0.5,
  minimo_inicial: 1000.0,
  hora_aplicacao: '20:59',
  categoria_arena: 'Multimercado',
  url_logo_gestor:
    'https://www.portoseguro.com.br/conteudo/solucoes-financeiras/investimentos/arena/assets/images/fundoLogos/logo-porto-investimentos.png',
  saldo_minimo: 1000.0,
  resgate_minimo: 1000.0,
  aplicao_minima: 1000.0,
  nome_gestor: 'PortoSeguro Investimentos',
  perfil_risco_ordem: 0,
  perfil_risco: 'medio-alto',
}

describe('FundDetailCard', () => {
  describe('renders correcly in success case', () => {
    const successStore = storeFactory({
      investmentDetails: {
        data: responseMock,
        isLoading: false,
        hasError: false,
      },
    })
    it('renders title', () => {
      renderWithReduxAndTheme(
        <FundDetailCard
          handleFundDetailOpen={() => {}}
          selectedFundId={5112}
        />,
        { store: successStore }
      )
      expect(screen.queryByText(/Porto Seguro Alocação FIC FIM/i)).toBeDefined()
    })
    it('renders minimal application', () => {
      renderWithReduxAndTheme(
        <FundDetailCard
          handleFundDetailOpen={() => {}}
          selectedFundId={5112}
        />,
        { store: successStore }
      )
      expect(screen.queryByText('R$ 1.000,00')).toBeDefined()
    })
    it('renders redemption fee', () => {
      renderWithReduxAndTheme(
        <FundDetailCard
          handleFundDetailOpen={() => {}}
          selectedFundId={5112}
        />,
        { store: successStore }
      )
      expect(screen.queryByText('D+32')).toBeDefined()
    })
    it('renders category', () => {
      renderWithReduxAndTheme(
        <FundDetailCard
          handleFundDetailOpen={() => {}}
          selectedFundId={5112}
        />,
        { store: successStore }
      )
      expect(screen.queryByText('Multimercado')).toBeDefined()
    })
    it('renders risk level', () => {
      renderWithReduxAndTheme(
        <FundDetailCard
          handleFundDetailOpen={() => {}}
          selectedFundId={5112}
        />,
        { store: successStore }
      )
      expect(screen.queryByText('Medio-alto')).toBeDefined()
    })
  })
  describe('renders correcly when loading', () => {
    const loadingStore = storeFactory({
      investmentDetails: {
        data: {},
        isLoading: true,
        hasError: false,
      },
    })
    it('renders loading component', () => {
      renderWithReduxAndTheme(
        <FundDetailCard
          handleFundDetailOpen={() => {}}
          selectedFundId={5112}
        />,
        { store: loadingStore }
      )
      expect(screen.getByTestId('test-loading-component')).toBeInTheDocument()
    })
    it('renders loading message', () => {
      renderWithReduxAndTheme(
        <FundDetailCard
          handleFundDetailOpen={() => {}}
          selectedFundId={5112}
        />,
        { store: loadingStore }
      )
      expect(
        screen.getByText('Buscando informações do fundo de investimento...')
      ).toBeInTheDocument()
    })
  })
  describe('renders correcly when error occours', () => {
    const errorStore = storeFactory({
      investmentDetails: {
        data: {},
        isLoading: false,
        hasError: true,
      },
    })
    it('renders error state', () => {
      renderWithReduxAndTheme(
        <FundDetailCard
          handleFundDetailOpen={() => {}}
          selectedFundId={5112}
        />,
        { store: errorStore }
      )
      expect(
        screen.queryByRole('button', { name: /Tentar novamente/i })
      ).toBeDefined()
    })
    it('renders error message', () => {
      renderWithReduxAndTheme(
        <FundDetailCard
          handleFundDetailOpen={() => {}}
          selectedFundId={5112}
        />,
        { store: errorStore }
      )
      expect(
        screen.queryByText(
          'Não foi possível carregar as informações deste fundo de investimento.'
        )
      ).toBeDefined()
    })
    it('retries request by clicking on retry button', () => {
      renderWithReduxAndTheme(
        <FundDetailCard
          handleFundDetailOpen={() => {}}
          selectedFundId={5112}
        />,
        { store: errorStore }
      )
      const retryButton = screen.getByTestId('test-button-tentar-novamente')
      fireEvent.click(retryButton)
      expect(screen.getByTestId('test-loading-component')).toBeDefined()
    })
  })
})
