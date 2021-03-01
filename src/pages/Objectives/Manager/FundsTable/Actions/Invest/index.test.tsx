import React from 'react'
import { renderWithReduxAndTheme, screen, createRootContainer } from 'testUtils'
import { storeFactory } from 'setupTests'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'

import InvestAction from './index'

let isOpen = false

const setIsOpen = (newState: boolean) => (isOpen = newState)

const fundMock: TObjectiveFunds = {
  adm_tax: 0.4,
  anbima_category: '',
  arena_category: 'Renda Fixa',
  available: 84057.06,
  balance: 86558.46,
  benchmark: 'CDI',
  classification: 'Longo Prazo',
  financial_apply_days: 'D+0',
  financial_rescue_days: 'D+0 (Úteis)',
  fund_id: 51380134,
  fund_wallet_type: 'RECOMMENDED',
  goals: [{ id: 626, name: 'PVEV-772', value: 1000.7, goal_type: 'TRAVEL' }],
  initial_date: '27/02/2014',
  initial_value: 10300.23,
  invested: 1500.7,
  is_fund_active: true,
  min_balance_value: 1000,
  min_initial_value: 1000,
  min_value_to_invest: 100,
  monthly_value: 1100.77,
  name: 'Porto Seguro FI Referenciado DI Credito Privado',
  nickname: 'Porto Seguro FI RF Ref. DI CP',
  order_profile_risk: 4,
  performance_rate: 0,
  profitability: [
    { name: 'fundo', value: { 1: 0.61, 2: 0.55, 3: 1.73, 4: 8.24, 5: 15.54 } },
  ],
  quotation_apply_days: 'D+0',
  quotation_rescue_days: 'D+0 (Úteis)',
  release_to_apply: true,
  release_to_rescue: true,
  time_limit_to_apply: '15:00',
  url_fund_rules_pdf:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/DI/Regulamento_PS_Referenciado_DI_Credito_Privado.pdf',
  url_performance_info_pdf:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/DI/InformativoDesempenho_PS_ReferenciadoDICreditoPrivado.pdf',
}

const storeMock = {
  investmentsList: {
    isLoading: false,
    isError: false,
    data: [
      {
        aplicacao_cotizacao: 'D+0',
        aplicacao_financeiro: 'D+0',
        resgate_cotizacao: 'D+0 (Uteis)',
        resgate_financeiro: 'D+1 (Úteis)',
        id_carteira: 51380134,
        apelido: 'Claritas Institucional FIM',
        nome_carteira: 'CLARITAS INSTITUCIONAL FI MULTIMERCADO  ',
        nome_empresa: 'Claritas Investimentos',
        taxa_administracao: 1,
        minimo_inicial: 1000,
        aplicao_liberada: true,
        hora_aplicacao: '13:30',
        categoria_arena: 'Multimercado',
        rentabil_fundo_mes: '-0.30',
        rentabil_fundo_ano: '2.72',
        rentabil_fundo_12_meses: '4.49',
        url_logo_gestor:
          'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Logos/LOGO_CLARITAS.png',
        fundo_ativo: true,
        fundo_investidor_qualificado: 'N',
        fundo_investidor_profissional: 'N',
        saldo_minimo: 1000,
        aplicao_minima: 1000,
        nome_gestor: 'Claritas Investimentos',
        perfil_risco_ordem: 3,
        perfil_risco: 'medio',
      },
      {
        aplicacao_cotizacao: 'D+0',
        aplicacao_financeiro: 'D+0',
        resgate_cotizacao: 'D+15 (Corridos)',
        resgate_financeiro: 'D+1 (Úteis)',
        id_carteira: 51380156,
        apelido: 'Perfin Equity Hedge FIC FIM',
        nome_carteira: 'PERFIN EQUITY HEDGE FC FI MULT          ',
        nome_empresa: 'Perfin Investimentos',
        taxa_administracao: 1.35,
        minimo_inicial: 1000,
        aplicao_liberada: true,
        hora_aplicacao: '13:30',
        categoria_arena: 'Multimercado',
        rentabil_fundo_mes: '-2.08',
        rentabil_fundo_ano: '-10.64',
        rentabil_fundo_12_meses: '-3.54',
        url_logo_gestor:
          'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Logos/LOGO_PERFIN.png',
        fundo_ativo: true,
        fundo_investidor_qualificado: 'N',
        fundo_investidor_profissional: 'N',
        saldo_minimo: 1000,
        aplicao_minima: 1000,
        nome_gestor: 'Perfin Investimentos',
        perfil_risco_ordem: 4,
        perfil_risco: 'medio-alto',
      },
    ],
  },
}

describe('Objective Management FundsTable Invest Action', () => {
  it('should render component', () => {
    const store = storeFactory(storeMock)

    renderWithReduxAndTheme(
      <InvestAction
        isOpen
        handleClose={() => setIsOpen(false)}
        fund={fundMock}
      />,
      { container: createRootContainer(), store }
    )

    expect(screen.queryAllByText(/close.svg/g)).toBeDefined()
  })

  it('should show 48h avaliation modal', () => {
    const store = storeFactory({
      ...storeMock,
      suitabilityInfo: {
        data: {
          status_cotista: true,
          CotistaContaOrdemPortoPar: 'S',
          investidor_qualificado: 'S',
          investidor_profissional: 'N',
          codigo_status_cotista: '101',
          id_cotista: '2000130464',
          status_possui_suitability: true,
          status_data_vigencia_suitability: true,
          status_data_vencimento_cadastro: false,
          isOpen: true,
          title: 'Falha ao processar solicitação',
          description:
            'Seu cadastro está em análise. Em até 48 horas, você poderá investir.',
          button: {
            dataGtmName: 'fechar',
            dataGtmType: 'click',
            dataGtmClicktype: 'button',
            handleClick: null,
            buttonName: 'Fechar',
          },
        },
        status: 'loaded',
        hasError: false,
        isLoading: false,
      },
    })

    renderWithReduxAndTheme(
      <InvestAction
        isOpen
        handleClose={() => setIsOpen(false)}
        fund={fundMock}
      />,
      { container: createRootContainer(), store }
    )

    expect(
      screen.queryByText(
        'Seu cadastro está em análise. Em até 48 horas, você poderá investir.'
      )
    ).toBeDefined()
  })
})
