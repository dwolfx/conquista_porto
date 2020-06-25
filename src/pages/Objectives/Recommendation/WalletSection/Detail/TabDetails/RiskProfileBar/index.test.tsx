import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import '@testing-library/jest-dom'

import RiskProfileBar from '.'

const setup = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}

describe('RiskProfileBar component', () => {
  it('should be able to display low risk', () => {
    const { getByTestId } = setup(<RiskProfileBar riskProfile={'baixo'} />)

    expect(getByTestId('low-risk')).toHaveStyle('display: block')
  })
  it('should be able to display low medium risk', () => {
    const { getByTestId } = setup(
      <RiskProfileBar riskProfile={'medio-baixo'} />
    )

    expect(getByTestId('low-medium-risk')).toHaveStyle('display: block')
  })
  it('should be able to display medium risk', () => {
    const { getByTestId } = setup(<RiskProfileBar riskProfile={'medio'} />)

    expect(getByTestId('medium-risk')).toHaveStyle('display: block')
  })
  it('should be able to display medium high risk', () => {
    const { getByTestId } = setup(<RiskProfileBar riskProfile={'medio-alto'} />)

    expect(getByTestId('medium-high-risk')).toHaveStyle('display: block')
  })
  it('should be able to display high risk', () => {
    const { getByTestId } = setup(<RiskProfileBar riskProfile={'alto'} />)

    expect(getByTestId('high-risk')).toHaveStyle('display: block')
  })
})
