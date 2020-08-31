import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import { storeFactory } from 'setupTests'

import FundDetailCard from '.'
import { fireEvent } from '@testing-library/react'

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

describe('FundDetailCard', () => {
  describe('renders correcly in success case', () => {
    const successStore = storeFactory({
      investmentDetails: {
        data: responseMock,
        isLoading: false,
        hasError: false,
      }
    })
    it('renders title', () => {
      renderWithReduxAndTheme(<FundDetailCard handleFundDetailOpen={() => {}} />, { store: successStore })
      expect(screen.getByText(/OCCAM FI CAMBIAL/i)).toBeInTheDocument()
    })
    it('renders minimal application', () => {
      renderWithReduxAndTheme(<FundDetailCard handleFundDetailOpen={() => {}} />, { store: successStore })
      expect(screen.getByText('R$ 5.000,00')).toBeInTheDocument()
    })
    it('renders redemption fee', () => {
      renderWithReduxAndTheme(<FundDetailCard handleFundDetailOpen={() => {}} />, { store: successStore })
      expect(screen.getByText('D+0')).toBeInTheDocument()
    })
    it('renders category', () => {
      renderWithReduxAndTheme(<FundDetailCard handleFundDetailOpen={() => {}} />, { store: successStore })
      expect(screen.getByText('Renda Fixa')).toBeInTheDocument()
    })
    it('renders risk level', () => {
      renderWithReduxAndTheme(<FundDetailCard handleFundDetailOpen={() => {}} />, { store: successStore })
      expect(screen.getByText('Alto')).toBeInTheDocument()
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
    it('renders loading component', () => {
      renderWithReduxAndTheme(<FundDetailCard handleFundDetailOpen={() => {}} />, { store: loadingStore })
      expect(screen.getByTestId('test-loading-component')).toBeInTheDocument()
    })
    it('renders loading message', () => {
      renderWithReduxAndTheme(<FundDetailCard handleFundDetailOpen={() => {}} />, { store: loadingStore })
      expect(screen.getByText('Buscando informações do fundo de investimento...')).toBeInTheDocument()
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
    it('renders error state', () => {
      renderWithReduxAndTheme(<FundDetailCard handleFundDetailOpen={() => {}} />, { store: errorStore })
      expect(screen.getByRole('button', { name: /Tentar novamente/i})).toBeInTheDocument()
    })
    it('renders error message', () => {
      renderWithReduxAndTheme(<FundDetailCard handleFundDetailOpen={() => {}} />, { store: errorStore })
      expect(screen.getByText('Não foi possível carregar as informações deste fundo de investimento.')).toBeInTheDocument()
    })
    it('retries request by clicking on retry button', () => {
      renderWithReduxAndTheme(<FundDetailCard handleFundDetailOpen={() => {}} />, { store: errorStore })
      const retryButton = screen.getByRole('button', { name: /Tentar novamente/i})
      fireEvent.click(retryButton)
      expect(screen.getByTestId('test-loading-component')).toBeInTheDocument()
    })
  })
})