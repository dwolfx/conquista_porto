import React from 'react'
import { render, within } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import '@testing-library/jest-dom'

import { formatMoney } from 'helpers'
import { IFunds } from 'store/modules/Objective/types'
import Transactions from '.'

const setup = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}

const fund: IFunds = {
  adm_tax: 123,
  fund_id: 5105,
  name: 'Porto Seguro FI Referenciado DI Credito Privado',
  profile_risk: 'medio-baixo',
  share_holder_profile_risk: 2,
  initial_date: '28/02/2014',
  manager: 'PortoSeguro Investimentos',
  min_value_to_apply: 100,
  financial_apply_days: 'D+0',
  quotation_rescue_days: 'D+0 (Úteis)',
  financial_rescue_days: 'D+0 (Úteis)',
  performance_rate: 0,
  classification: 'Longo Prazo',
  tribute_ir: {
    '180': 22.5,
    '360': 20,
    '720': 17.5,
    '721': 15,
  },
  iof: 'Regime Regressivo',
  benchmark: 'CDI',
  profitability: [
    {
      name: 'fundo',
      value: {
        '1': 1.28,
        '2': -0.17,
        '3': 1.55,
        '4': 8.1,
        '5': 15.67,
      },
    },
    {
      name: 'CDI',
      value: {
        '1': 0.05,
        '2': 1.92,
        '3': 3.67,
        '4': 10.18,
        '5': 17.72,
      },
    },
    {
      name: 'variacao',
      value: {
        '1': 2663.91,
        '3': 42.19,
        '4': 79.59,
        '5': 88.44,
      },
    },
  ],
  url_performance_info_pdf:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/DI/InformativoDesempenho_PS_ReferenciadoDICreditoPrivado.pdf',
  url_fund_rules_pdf:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/DI/Regulamento_PS_Referenciado_DI_Credito_Privado.pdf',
  is_fund_active: true,
  initial_value: 1000,
  monthly_value: 100,
  annual_rate: 4.5,
  min_initial_value: 3000,
  min_movement: 100.29,
  min_balance: 2000,
  arena_category: 'Renda Variável',
  time_limit: '23:59',
  quotation_apply_days: 'D+1',
}

describe('Transactions component', () => {
  it('should be able to display formatted min_balance value', () => {
    const { getByTestId } = setup(
      <Transactions data-testid="transactions" fund={fund} />
    )

    expect(
      within(getByTestId('transactions')).getByText((_, node) => {
        const hasText = (node: Node) =>
          node.textContent === formatMoney(fund.min_balance)
        const nodeHasText = hasText(node)
        const childrenDontHaveText = Array.from(node.children).every(
          child => !hasText(child)
        )

        return nodeHasText && childrenDontHaveText
      })
    ).toBeInTheDocument()
  })
  it('should be able to display a dash symbol when the received min_balance value is a string', () => {
    Object.assign(fund, {
      ...fund,
      min_balance: '2000',
    })
    const { queryByText } = setup(<Transactions fund={fund} />)

    expect(queryByText('-')).toBeTruthy()
  })
  it(`should be able to display a dash symbol when the received min_balance value is undefined`, () => {
    Object.assign(fund, {
      ...fund,
      min_balance: undefined,
    })
    const { queryByText } = setup(<Transactions fund={fund} />)

    expect(queryByText('-')).toBeTruthy()
  })
  it(`should be able to display 'Ações' when the received category_name value is equal to 'Renda Variável'`, () => {
    Object.assign(fund, {
      ...fund,
      category_name: 'Renda Variável',
    })
    const { queryByText } = setup(<Transactions fund={fund} />)

    expect(queryByText('Ações')).toBeTruthy()
  })
})
