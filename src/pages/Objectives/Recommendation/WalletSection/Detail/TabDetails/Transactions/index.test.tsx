import React from 'react'
import { render, within } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import '@testing-library/jest-dom'

import Transactions from '.'
import { formatMoney } from 'helpers'

const setup = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}

const fund = {
  min_initial_value: 3000,
  min_movement: 100.29,
  min_balance: 2000,
  time_limit: '23:59',
  quotation_apply_days: 'D+1',
  financial_apply_days: 'D+2',
  quotation_rescue_days: 'D+3 (Corridos)',
  financial_rescue_days: 'D+4 (Úteis)',
  category_name: 'Renda Fixa',
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
