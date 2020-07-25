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
  "id": 51380064,
  "data_inicio": "2016-02-15T00:00:00-03:00",
  "taxa_performance": "0.00",
  "apelido": "Occam FI Cambial",
  "nome_carteira": "OCCAM FI CAMBIAL",
  "valor_patrimonio_liq": "457325",
  "contagem_dias_resgate": "Úteis",
  "minimo_inicial": "5000.0",
  "link_regulamento": "https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Regulamentos/REGULAMENTO_OCCAMFICAMBIAL.pdf",
  "perfil_risco": "alto",
  "resgate_cotizacao": "D+0",
  "nome_gestor": "Kapitalo Investimentos",
  "hora_resgate": "23:53",
  "link_lamina": "https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Informativos-de-Desempenho/INFORMATIVODESEMPENHO_OCCAMFICAMBIAL.pdf",
  "link_infor_desempenho": "https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Informativos-de-Desempenho/INFORMATIVODESEMPENHO_OCCAMFICAMBIAL.pdf",
  "benchmark": {
    "nome": "PTAX 800 MEDIO",
    "id": "23"
  },
  "comparativo_hist_rentabil": {
    "hist_rentabil_benchmark": {
      "rentabil_Ano": "7.02",
      "rentabil_24_meses": "30.90",
      "rentabil_12_meses": "3.57",
      "rentabil_36_meses": "27.75",
      "rentabil_dia": "-0.86",
      "rentabil_mes_anteiror": "9.92",
      "benchmark": {
        "nome": "PTAX 800 MEDIO",
        "id": "23"
      },
      "rentabil_mes": "0.20"
    },
    "hist_rentabil_fundo": {
      "rel_fundo_benchmark_mes_ant": "-",
      "rentabil_ano": "9.36",
      "rentabil_12_meses": "5.81",
      "rentabil_36_meses": "32.78",
      "rel_fundo_benchmark_mes": "0.87",
      "rel_fundo_benchmark_dia": "1.01",
      "rentabil_mes_anteiror": "7.43",
      "rel_fundo_benchmark_24_meses": "5.42",
      "rel_fundo_benchmark_ano": "2.34",
      "rentabil_24_meses": "36.32",
      "rel_fundo_benchmark_36_meses": "5.03",
      "id_fundo": "51380063",
      "rentabil_dia": "0.15",
      "rentabil_mes": "1.08",
      "rel_fundo_benchmark_12_meses": "2.23"
    },
    "data_referencia": "2019-09-26T00:00:00-03:00"
  },
  "resgate_financeiro": "D+1",
  "hora_aplicacao": "23:53",
  "link_termo_adesao": "https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Termos/TERMODECIENCIADERISCO_OCCAMFICAMBIAL.pdf",
  "aliquotas_ir": {
    "aliquota": [
      {
        "valor": "22.5",
        "faixa": "Até 180 dias"
      },
      {
        "valor": "20",
        "faixa": "De 181 dias a 360 dias"
      },
      {
        "valor": "17.5",
        "faixa": "De 361 dias a 720 dias"
      },
      {
        "valor": "15",
        "faixa": "Acima de 720 dias"
      }
    ]
  },
  "taxa_administracao": "0.75",
  "id_fundo": "51380063",
  "regime_iof": "Regime Regressivo",
  "classificacao": "Longo Prazo",
  "aplicao_minima": "0.0",
  "aplicacao_financeiro": "D+0",
  "categoria": 'Renda Fixa',
}

describe('FundDetailDrawer', () => {
  const successStore = storeFactory({
    investmentDetails: {
      data: responseMock,
      isLoading: false,
      hasError: false,
    }
  })
  describe('renders correcly in success case', () => {
    it('renders tabs', () => {
      renderWithReduxAndTheme(<FundDetailDrawer handleClose={() => {}}/>, { container: createRootContainer(), store: successStore })
      expect(screen.getByRole('tablist')).toBeInTheDocument()
      expect(screen.getAllByRole('tab')).toHaveLength(3)
    })
    it('renders invest button', () => {
      renderWithReduxAndTheme(<FundDetailDrawer handleClose={() => {}}/>, { container: createRootContainer(), store: successStore })
      expect(screen.getByRole('button', { name: /investir/i})).toBeInTheDocument()
    })
    it('handles invest button click', () => {
      const mockHandleLayerOpen = jest.fn()
      renderWithReduxAndTheme(<FundDetailDrawer handleLayerOpen={mockHandleLayerOpen} handleClose={() => {}}/>, { container: createRootContainer(), store: successStore })
      fireEvent.click(screen.getByRole('button', { name: /investir/i}))
      expect(mockHandleLayerOpen).toBeCalled()
    })
    describe('renders correct content by tab selection', () => {
      it('displays fund detail content (default initial selection)', () => {
        renderWithReduxAndTheme(<FundDetailDrawer handleClose={() => {}}/>, { container: createRootContainer(), store: successStore })
        expect(screen.getByRole('tab', { name: 'tab-detalhe-fundo'})).toHaveClass('active')
        expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-detalhe-fundo')
        expect(screen.getByText(/aplicação Inicial/i)).toBeInTheDocument()
      })
      it('displays profitability content', () => {
        renderWithReduxAndTheme(<FundDetailDrawer handleClose={() => {}}/>, { container: createRootContainer(), store: successStore })
        const profitabilityTab = screen.getByRole('tab', { name: 'tab-rentabilidade'})
        fireEvent.click(profitabilityTab)
        expect(screen.getByRole('tab', { name: 'tab-rentabilidade'})).toHaveClass('active')
        expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-rentabilidade')
        expect(screen.getByRole('tabpanel')).toContainHTML('table')
      })
      it('displays information content', () => {
        renderWithReduxAndTheme(<FundDetailDrawer handleClose={() => {}}/>, { container: createRootContainer(), store: successStore })
        const informationTab = screen.getByRole('tab', { name: 'tab-informacoes'})
        fireEvent.click(informationTab)
        expect(screen.getByRole('tab', { name: 'tab-informacoes'})).toHaveClass('active')
        expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-informacoes')
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
      }
    })
    it('displays loading component', () => {
      renderWithReduxAndTheme(<FundDetailDrawer handleClose={() => {}}/>, { container: createRootContainer(), store: loadingStore })
      expect(screen.getByTestId('test-loading-component')).toBeInTheDocument()
    })
  })
  describe('renders correcly when error occours', () => {
    const errorStore = storeFactory({
      investmentDetails: {
        data: {},
        isLoading: false,
        hasError: true,
      }
    })
    it('displays error message', () => {
      renderWithReduxAndTheme(<FundDetailDrawer hasError handleClose={() => {}}/>, { container: createRootContainer(), store: errorStore })
      expect(screen.getByText('Não foi possível carregar as informações detalhadas deste fundo de investimento.')).toBeInTheDocument()
    })
    it('displays retry button', () => {
      renderWithReduxAndTheme(<FundDetailDrawer hasError handleClose={() => {}}/>, { container: createRootContainer(), store: errorStore })
      expect(screen.getByRole('button', { name: /tentar novamente/i})).toBeInTheDocument()
    })
    it('retries to retrieve data when click on retry button', () => {
      renderWithReduxAndTheme(<FundDetailDrawer hasError handleClose={() => {}}/>, { container: createRootContainer(), store: errorStore })
      fireEvent.click(screen.getByRole('button', { name: /tentar novamente/i}))
      errorStore.dispatch(GetInvestmentDetailsRequest('1234'))
      expect(screen.getByTestId('test-loading-component')).toBeInTheDocument()
    })
  })
  describe('renders correcly when fund is locked for investment', () => {
    const successStore = storeFactory({
      investmentDetails: {
        data: {
          ...responseMock,
          categoria: 'Renda Variável'
        },
        isLoading: false,
        hasError: false
      }
    })
    it('hides invest button to show message', () => {
      renderWithReduxAndTheme(<FundDetailDrawer isOpenForInvestments={false} handleClose={() => {}}/>, { container: createRootContainer(), store: successStore })
      expect(screen.getByText(/fundo fechado para aplicações/i)).toBeInTheDocument()
      expect(screen.getByRole('img', { name: 'lock2' })).toBeInTheDocument()
    })
  })
})