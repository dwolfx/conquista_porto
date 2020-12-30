import React from 'react'
import {
  renderWithReduxAndTheme,
  screen,
  createRootContainer,
  fireEvent,
} from 'testUtils'
import { IFunds } from 'store/modules/Objective/types'

import RemoveFunds from './index'

let isOpen = false

const setIsOpen = (newState: boolean) => (isOpen = newState)

let removedFunds: IFunds[] | [] = []

const restoreFunds = (fundsId: number[]) =>
  (removedFunds = [...removedFunds].filter(
    fund => !fundsId.includes(fund.fund_id)
  ))

const ComponentToRender = () => (
  <RemoveFunds
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    removedFunds={removedFunds}
    restoreFunds={restoreFunds}
  />
)

describe('Objective Recommendation Edit Wallter RemovedFunds Component', () => {
  it('should render component with empty state', () => {
    renderWithReduxAndTheme(<ComponentToRender />, {
      container: createRootContainer(),
    })

    expect(screen.getByText('Nenhum fundo recomendado removido.')).toBeDefined()
    expect(screen.getByRole('button', { name: 'Voltar' })).toBeDefined()
  })

  it('should render table with Occam Institucional II FIC Multimercado fund', () => {
    removedFunds = [
      {
        fund_id: 51380026,
        name: 'Occam Institucional II FIC Multimercado',
        nickname: 'Occam Institucional II FIC FIM',
        company_name: 'Occam Brasil',
        profile_risk: 'medio',
        share_holder_profile_risk: 1,
        initial_date: '05/07/2012',
        manager: 'Occam Brasil',
        min_initial_value: 1000.0,
        min_value_to_apply: 100.0,
        release_to_apply: true,
        min_rescue_value: 0.0,
        release_to_rescue: false,
        min_balance_value: 100.0,
        time_limit_to_apply: '23:59',
        time_limit_to_rescue: '23:59',
        quotation_apply_days: 'D+0',
        financial_apply_days: 'D+0',
        quotation_rescue_days: 'D+0 (Úteis)',
        financial_rescue_days: 'D+1 (Úteis)',
        count_rescue_days: 'Úteis',
        arena_category: 'Multimercado',
        anbima_category: 'Empresas',
        adm_tax: 1.0,
        performance_rate: 20.0,
        classification: 'Longo Prazo',
        tribute_ir: { '720': 17.5, '721': 15, '180': 22.5, '360': 20 },
        iof: 'Regime Regressivo',
        benchmark: null,
        profitability: [
          {
            name: 'fundo',
            value: { '1': 0.07, '2': 0.39, '3': 6.18, '4': 13.97, '5': 25.65 },
          },
          {
            name: 'CDI',
            value: { '1': 0.29, '2': 1.01, '3': 5.45, '4': 12.14, '5': 21.57 },
          },
          {
            name: 'variacao',
            value: {
              '1': 23.74,
              '2': 38.38,
              '3': 113.39,
              '4': 115.11,
              '5': 118.95,
            },
          },
        ],
        url_performance_info_pdf:
          'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Informativos-de-Desempenho/INFORMATIVODESEMPENHO_OCCAMINSTITUCIONALIIFICFIM.pdf',
        url_lamina_pdf:
          'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Informativos-de-Desempenho/INFORMATIVODESEMPENHO_OCCAMINSTITUCIONALIIFICFIM.pdf',
        url_fund_rules_pdf:
          'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Regulamentos/REGULAMENTO_OCCAMINSTITUCIONALIIFICFIM.pdf',
        url_fund_adhesion_pdf:
          'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Termos/TERMODECIENCIADERISCO_OCCAMINSTITUCIONALIIFICFIM.pdf',
        url_manager_logo:
          'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Logos/LOGO_OCCAM.png',
        is_fund_active: true,
        quota_type: 'Fechamento',
        cnpj: null,
        pl: null,
        pl_last_year: null,
        initial_value: 1600.0,
        monthly_value: 100.0,
        annual_rate: 7.0,
      },
    ]

    renderWithReduxAndTheme(<ComponentToRender />, {
      container: createRootContainer(),
    })

    expect(
      screen.getByText('Occam Institucional II FIC Multimercado')
    ).toBeDefined()
    expect(screen.getAllByRole('checkbox')[1]).toBeDefined()
  })
})
