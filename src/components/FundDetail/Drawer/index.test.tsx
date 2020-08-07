import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import util from 'util'
import { storeFactory } from 'setupTests'

import { fireEvent } from '@testing-library/react'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'

import FundDetailDrawer from '.'

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    container.setAttribute('role', 'main')
    document.body.appendChild(container)
  }
  return container
}

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
  taxa_performance: 0,
  contagem_dias_resgate: 'Corridos',
  valor_patrimonio_liq: 0,
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
  minimo_inicial: 1000,
  hora_aplicacao: '20:59',
  categoria_arena: 'Multimercado',
  url_logo_gestor:
    'https://www.portoseguro.com.br/conteudo/solucoes-financeiras/investimentos/arena/assets/images/fundoLogos/logo-porto-investimentos.png',
  saldo_minimo: 1000,
  resgate_minimo: 1000,
  aplicao_minima: 1000,
  nome_gestor: 'PortoSeguro Investimentos',
  perfil_risco_ordem: 0,
  perfil_risco: 'medio-alto',
}

describe('FundDetailDrawer', () => {
  const successStore = storeFactory({
    investmentDetails: {
      data: responseMock,
      isLoading: false,
      hasError: false,
    },
  })
  describe('renders correcly in success case', () => {
    it('renders tabs', () => {
      renderWithReduxAndTheme(
        <FundDetailDrawer handleClose={() => {}} isOpen />,
        { container: createRootContainer(), store: successStore }
      )
      expect(screen.getByRole('tablist')).toBeInTheDocument()
      expect(screen.getAllByRole('tab')).toHaveLength(3)
    })
    it('renders invest button', () => {
      renderWithReduxAndTheme(
        <FundDetailDrawer handleClose={() => {}} isOpen />,
        { container: createRootContainer(), store: successStore }
      )
      expect(
        screen.getByRole('button', { name: /investir/i })
      ).toBeInTheDocument()
    })
    it('handles invest button click', () => {
      const mockHandleLayerOpen = jest.fn()
      renderWithReduxAndTheme(
        <FundDetailDrawer
          isOpen
          handleLayerOpen={mockHandleLayerOpen}
          handleClose={() => {}}
        />,
        { container: createRootContainer(), store: successStore }
      )
      fireEvent.click(screen.getByRole('button', { name: /investir/i }))
      expect(mockHandleLayerOpen).toBeCalled()
    })
    describe('renders correct content by tab selection', () => {
      it('displays fund detail content (default initial selection)', () => {
        renderWithReduxAndTheme(
          <FundDetailDrawer isOpen handleClose={() => {}} />,
          { container: createRootContainer(), store: successStore }
        )
        expect(
          screen.getByRole('tab', { name: 'tab-detalhe-fundo' })
        ).toHaveClass('active')
        expect(screen.getByRole('tabpanel')).toHaveAttribute(
          'aria-labelledby',
          'tab-detalhe-fundo'
        )
        expect(screen.getByText(/aplicação Inicial/i)).toBeInTheDocument()
      })
      it('displays profitability content', () => {
        renderWithReduxAndTheme(
          <FundDetailDrawer isOpen handleClose={() => {}} />,
          { container: createRootContainer(), store: successStore }
        )
        const profitabilityTab = screen.getByRole('tab', {
          name: 'tab-rentabilidade',
        })
        fireEvent.click(profitabilityTab)
        expect(
          screen.getByRole('tab', { name: 'tab-rentabilidade' })
        ).toHaveClass('active')
        expect(screen.getByRole('tabpanel')).toHaveAttribute(
          'aria-labelledby',
          'tab-rentabilidade'
        )
        expect(screen.getByRole('tabpanel')).toContainHTML('table')
      })
      it('displays information content', () => {
        renderWithReduxAndTheme(
          <FundDetailDrawer isOpen handleClose={() => {}} />,
          { container: createRootContainer(), store: successStore }
        )
        const informationTab = screen.getByRole('tab', {
          name: 'tab-informacoes',
        })
        fireEvent.click(informationTab)
        expect(
          screen.getByRole('tab', { name: 'tab-informacoes' })
        ).toHaveClass('active')
        expect(screen.getByRole('tabpanel')).toHaveAttribute(
          'aria-labelledby',
          'tab-informacoes'
        )
        expect(screen.getByText(/mais informações/i)).toBeInTheDocument()
      })
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
    it('displays loading component', () => {
      renderWithReduxAndTheme(
        <FundDetailDrawer isOpen handleClose={() => {}} />,
        { container: createRootContainer(), store: loadingStore }
      )
      expect(screen.getByTestId('test-loading-component')).toBeInTheDocument()
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
    it('displays error message', () => {
      renderWithReduxAndTheme(
        <FundDetailDrawer isOpen hasError handleClose={() => {}} />,
        { container: createRootContainer(), store: errorStore }
      )
      expect(
        screen.getByText(
          'Não foi possível carregar as informações detalhadas deste fundo de investimento.'
        )
      ).toBeInTheDocument()
    })
    it('displays retry button', () => {
      renderWithReduxAndTheme(
        <FundDetailDrawer isOpen hasError handleClose={() => {}} />,
        { container: createRootContainer(), store: errorStore }
      )
      expect(
        screen.getByRole('button', { name: /tentar novamente/i })
      ).toBeInTheDocument()
    })
    it('retries to retrieve data when click on retry button', () => {
      renderWithReduxAndTheme(
        <FundDetailDrawer isOpen hasError handleClose={() => {}} />,
        { container: createRootContainer(), store: errorStore }
      )
      fireEvent.click(screen.getByRole('button', { name: /tentar novamente/i }))
      errorStore.dispatch(GetInvestmentDetailsRequest('1234'))
      expect(screen.getByTestId('test-loading-component')).toBeInTheDocument()
    })
  })
  describe('renders correcly when fund is locked for investment', () => {
    const successStore = storeFactory({
      investmentDetails: {
        data: {
          ...responseMock,
          categoria: 'Renda Variável',
        },
        isLoading: false,
        hasError: false,
      },
    })
    it('hides invest button to show message', () => {
      renderWithReduxAndTheme(
        <FundDetailDrawer
          isOpen
          isOpenForInvestments={false}
          handleClose={() => {}}
        />,
        { container: createRootContainer(), store: successStore }
      )
      expect(
        screen.getByText(/fundo fechado para aplicações/i)
      ).toBeInTheDocument()
      expect(screen.getByRole('img', { name: 'lock2' })).toBeInTheDocument()
    })
  })
})
