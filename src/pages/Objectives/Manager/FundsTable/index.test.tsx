import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'

import FundsTable from './index'

const fundsMock: TObjectiveFunds[] = [
  {
    name: 'Porto Seguro FI Referenciado DI Credito Privado',
    nickname: 'Porto Seguro FI RF Ref. DI CP',
    classification: 'Longo Prazo',
    benchmark: 'CDI',
    balance: 86558.46,
    available: 84057.06,
    invested: 1500.7,
    goals: [
      {
        id: 626,
        name: 'PVEV-772',
        value: 1000.7,
        goal_type: 3,
      },
    ],
    arena_category: 'Multimercado',
    fund_id: 5105,
    order_profile_risk: 4,
    initial_date: '27/02/2014',
    min_initial_value: 1000.0,
    min_value_to_apply: 100.0,
    release_to_apply: true,
    release_to_rescue: true,
    min_balance_value: 1000.0,
    time_limit_to_apply: '15:00',
    quotation_apply_days: 'D+0',
    financial_apply_days: 'D+0',
    quotation_rescue_days: 'D+0 (Úteis)',
    financial_rescue_days: 'D+0 (Úteis)',
    anbima_category: '',
    adm_tax: 0.4,
    performance_rate: 0.0,
    profitability: [
      {
        name: 'fundo',
        value: {
          '1': 0.61,
          '2': 0.55,
          '3': 1.73,
          '4': 8.24,
          '5': 15.54,
        },
      },
      {
        name: 'CDI',
        value: {
          '1': 0.18,
          '2': 2.19,
          '3': 3.47,
          '4': 9.96,
          '5': 17.28,
        },
      },
      {
        name: 'variacao',
        value: {
          '1': 342.57,
          '2': 24.9,
          '3': 49.97,
          '4': 82.77,
          '5': 89.9,
        },
      },
    ],
    url_performance_info_pdf:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/DI/InformativoDesempenho_PS_ReferenciadoDICreditoPrivado.pdf',
    url_fund_rules_pdf:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/DI/Regulamento_PS_Referenciado_DI_Credito_Privado.pdf',
    is_fund_active: true,
    initial_value: 10300.23,
    monthly_value: 1100.77,
    fund_wallet_type: 'RECOMMENDED',
  },
  {
    name: 'Sciensa FI',
    nickname: 'Sciensa FI',
    classification: 'Longo Prazo',
    benchmark: 'CDI',
    balance: 558.46,
    available: 74057.06,
    invested: 2500.7,
    goals: [
      {
        id: 626,
        name: 'PVEV-772',
        value: 1000.7,
        goal_type: 3,
      },
    ],
    arena_category: 'Renda Fixa',
    fund_id: 5105,
    order_profile_risk: 3,
    initial_date: '27/02/2014',
    min_initial_value: 1000.0,
    min_value_to_apply: 100.0,
    release_to_apply: true,
    release_to_rescue: true,
    min_balance_value: 1000.0,
    time_limit_to_apply: '15:00',
    quotation_apply_days: 'D+0',
    financial_apply_days: 'D+0',
    quotation_rescue_days: 'D+0 (Úteis)',
    financial_rescue_days: 'D+0 (Úteis)',
    anbima_category: '',
    adm_tax: 0.4,
    performance_rate: 0.0,
    profitability: [
      {
        name: 'fundo',
        value: {
          '1': 0.61,
          '2': 0.55,
          '3': 1.73,
          '4': 8.24,
          '5': 15.54,
        },
      },
      {
        name: 'CDI',
        value: {
          '1': 0.18,
          '2': 2.19,
          '3': 3.47,
          '4': 9.96,
          '5': 17.28,
        },
      },
      {
        name: 'variacao',
        value: {
          '1': 342.57,
          '2': 24.9,
          '3': 49.97,
          '4': 82.77,
          '5': 89.9,
        },
      },
    ],
    url_performance_info_pdf:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/DI/InformativoDesempenho_PS_ReferenciadoDICreditoPrivado.pdf',
    url_fund_rules_pdf:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/DI/Regulamento_PS_Referenciado_DI_Credito_Privado.pdf',
    is_fund_active: true,
    initial_value: 10300.23,
    monthly_value: 1100.77,
    fund_wallet_type: 'RECOMMENDED',
    pendency: 'INITIAL_VALUE_PENDING',
  },
]

describe('Objective manager funds table component', () => {
  it('should render funds table - desktop', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <FundsTable
          funds={fundsMock}
          icon="financial"
          title="Funds Table Desktop"
          type="initial"
        />
      </MemoryRouter>
    )

    expect(screen.queryByText('financial.svg')).toBeDefined()
    expect(screen.queryByText('Funds Table Desktop')).toBeDefined()
  })
})
