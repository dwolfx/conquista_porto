import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import '@testing-library/jest-dom'

import Taxation from '.'

const setup = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}

const fund = {
  profile_risk: 'baixo',
  tribute_ir: {
    180: 22.5,
    360: 20,
    720: 17.5,
    721: 15,
  },
  classification: 'Longo Prazo',
  iof: 'Regime Regressivo',
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

describe('Taxation component', () => {
  it('should be able to render RiskProfileBar component', () => {
    const { getByTestId } = setup(<Taxation fund={fund} />)

    expect(getByTestId('risk-profile-bar')).toBeInTheDocument()
  })
  it('should be able to render Transactions component', () => {
    const { getByTestId } = setup(<Taxation fund={fund} />)

    expect(getByTestId('transactions')).toBeInTheDocument()
  })
  it('should be able to render Taxation component', () => {
    const { getByTestId } = setup(<Taxation fund={fund} />)

    expect(getByTestId('taxation')).toBeInTheDocument()
  })
})
