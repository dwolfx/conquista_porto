import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { storeFactory } from 'setupTests'
import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import FundExtract from '.'

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

const authMock = {
  accessToken: '9dd993fc2a66c77d80404ac79c601ad8b7df12bc',
  cpf: '11122233300',
}

const mockInvestmentPositionData = {
  data: [
    {
      categoria: 'Multimercado',
      contagem_dias_resgate: 'Corridos',
      aplicacao_cotizacao: 'D+0',
      aplicacao_financeiro: 'D+0',
      resgate_cotizacao: 'D+4 (Corridos)',
      resgate_financeiro: 'D+1 (Úteis)',
      apelido: 'Absolute Hedge FIC FIM',
      minimo_inicial: 5000,
      aplicao_liberada: true,
      categoria_arena: 'Multimercado',
      fundo_ativo: true,
      saldo_minimo: 3000,
      resgate_minimo: 1000,
      resgate_liberado: true,
      saldo_bloqueado: 0,
      aplicao_minima: 1000,
      nome_gestor: 'Absolute Investimentos',
      id: 51380015,
      id_cotista: 2000143425,
      fundo: 'Absolute Hedge FIC Multimercado',
      saldo_bruto: 'R$ 5.000,00',
      saldo_liquido: 'R$ 5.000,00',
      valor_ir: 'R$ 0,00',
      valor_iof: 'R$ 0,00',
      valor_cota: 'R$ 2,04',
      quantidade_cota: 2456.16,
      perfil_risco_ordem: 4,
      data_historico: '2020-03-24T21:00:00',
      data_historico_formatada: '24/03/2020',
      pdf_informativo_desempenho:
        'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Informativos-de-Desempenho/INFORMATIVODESEMPENHO_ABSOLUTEHEDGEFICFIM.pdf',
      pdf_regulamento:
        'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Regulamentos/REGULAMENTO_ABSOLUTEHEDGEFICFIM.pdf',
      saldo_bruto_numerico: 5000,
      perfil_risco: 'medio-alto',
    },
  ],
  displayInformation: false,
  idFund: 51380015,
  hasError: false,
  isLoading: false,
}

const investmentDetailsMock = {
  data: {
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
    saldo_minimo: 891.11,
    resgate_minimo: 1000,
    aplicao_minima: 1000,
    nome_gestor: 'PortoSeguro Investimentos',
    perfil_risco_ordem: 0,
    perfil_risco: 'medio-alto',
    categoria: '',
  },
  isLoading: false,
  isError: false,
}

describe('FundExtract tests', () => {
  const store = storeFactory({
    auth: authMock,
    investmentDetails: investmentDetailsMock,
    investmentPosition: mockInvestmentPositionData,
  })
  it('should exists', () => {
    expect(FundExtract).toBeDefined()
  })
  it('should contains 2 cards in the body', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <FundExtract isOpen handleClose={() => {}} />
      </MemoryRouter>,
      { container: createRootContainer(), store }
    )
    expect(screen.getByTestId('card-fund-info')).toBeInTheDocument()
    expect(screen.getByTestId('table-fund-extract')).toBeInTheDocument()
  })
  it('should render mobile components', () => {
    window.resizeTo(400, 600)

    renderWithReduxAndTheme(
      <MemoryRouter>
        <FundExtract isOpen handleClose={() => {}} />
      </MemoryRouter>,
      { container: createRootContainer(), store }
    )
    expect(screen.getByTestId('card-fund-info')).toBeInTheDocument()
    expect(screen.getByTestId('table-fund-extract')).toBeInTheDocument()
  })
})
