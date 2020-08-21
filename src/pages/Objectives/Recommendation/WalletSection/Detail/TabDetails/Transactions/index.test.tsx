import React from 'react'
import { render, screen } from '@testing-library/react'
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
  fund_id: 5138002,
  name: 'Not Arx Income FI Ações',
  nickname: 'Arx Income FIA',
  profile_risk: 'medio',
  share_holder_profile_risk: 3,
  initial_date: '17/06/1999',
  manager: 'ARX Investimentos',
  min_initial_value: 500,
  min_value_to_apply: 100,
  release_to_apply: true,
  min_rescue_value: 100,
  release_to_rescue: true,
  min_balance_value: 100,
  time_limit_to_apply: '17:00',
  time_limit_to_rescue: '17:00',
  quotation_apply_days: 'D+0',
  financial_apply_days: 'D+0',
  quotation_rescue_days: 'D+1 (Úteis)',
  financial_rescue_days: 'D+2 (Úteis)',
  count_rescue_days: 'Úteis',
  arena_category: 'Renda Fixa',
  adm_tax: 3,
  performance_rate: 0,
  classification: 'Renda Fixa',
  tribute_ir: {
    additionalProp1: 0,
    additionalProp2: 0,
    additionalProp3: 0,
  },
  iof: 'Isento',
  benchmark: 'CDI',
  profitability: [
    {
      name: 'CDI',
      value: {
        additionalProp1: 0,
        additionalProp2: 0,
        additionalProp3: 0,
      },
    },
  ],
  url_performance_info_pdf:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Informativos-de-Desempenho/INFORMATIVODESEMPENHO_ARXINCOMEFIA.pdf',
  url_lamina_pdf:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Informativos-de-Desempenho/INFORMATIVODESEMPENHO_ARXINCOMEFIA.pdf',
  url_fund_rules_pdf:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Regulamentos/REGULAMENTO_ARXINCOMEFIA.pdf',
  url_fund_adhesion_pdf:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Termos/TERMODECIENCIADERISCO_ARXINCOMEFIA.pdf',
  url_manager_logo:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Logos/LOGO_ARX.png',
  quota_type: 'Fechamento',
  cnpj: 'string',
  pl: 0,
  pl_last_year: 0,
  initial_value: 1000,
  monthly_value: 100,
  annual_rate: 9.5,
  fundActive: true,
  company_name: '',
  anbima_category: '',
}

describe('Transactions component', () => {
  it('should be able to display formatted min_balance_value value', () => {
    setup(<Transactions data-testid="transactions" fund={fund} />)

    expect(
      screen.getAllByText((_, node) => {
        const hasText = (nodeParam: Node) =>
          nodeParam.textContent === formatMoney(fund.min_balance_value)
        const nodeHasText = hasText(node)
        const childrenDontHaveText = Array.from(node.children).every(
          child => !hasText(child)
        )

        return nodeHasText && childrenDontHaveText
      })
    ).toBeDefined()
  })
  it('should be able to display a dash symbol when the received min_balance_value value is a string', () => {
    Object.assign(fund, {
      ...fund,
      min_balance_value: '2000',
    })
    const { queryByText } = setup(<Transactions fund={fund} />)

    expect(queryByText('-')).toBeTruthy()
  })
  it(`should be able to display a dash symbol when the received min_balance_value value is undefined`, () => {
    Object.assign(fund, {
      ...fund,
      min_balance_value: undefined,
    })
    const { queryByText } = setup(<Transactions fund={fund} />)

    expect(queryByText('-')).toBeTruthy()
  })
  it(`should be able to display 'Ações' when the received category_name value is equal to 'Renda Variável'`, () => {
    Object.assign(fund, {
      ...fund,
      arena_category: 'Renda Variável',
    })
    const { queryByText } = setup(<Transactions fund={fund} />)

    expect(queryByText('Ações')).toBeTruthy()
  })
})
