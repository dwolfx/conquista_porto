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
  tribute_ir: {
    180: 22.5,
    360: 20,
    720: 17.5,
    721: 15,
  },
  classification: 'Longo Prazo',
  iof: 'Regime Regressivo',
}

describe('Taxation component', () => {
  it('should be able to display classification', () => {
    const { queryByText } = setup(<Taxation fund={fund} />)

    expect(queryByText('Longo Prazo')).toBeTruthy()
  })
  it(`should be able to display 'Regressivo' when the iof value is 'Regime Regressivo'`, () => {
    const { queryByText } = setup(<Taxation fund={fund} />)

    expect(queryByText('Regressivo')).toBeTruthy()
  })
  it('should be able to display iof', () => {
    Object.assign(fund, {
      ...fund,
      iof: 'Isento',
    })
    const { queryByText } = setup(<Taxation fund={fund} />)

    expect(queryByText('Isento')).toBeTruthy()
  })
  it('should be able to display tributes', () => {
    const { queryByText } = setup(<Taxation fund={fund} />)

    expect(queryByText('22,5%')).toBeTruthy()
    expect(queryByText('20%')).toBeTruthy()
    expect(queryByText('17,5%')).toBeTruthy()
    expect(queryByText('15%')).toBeTruthy()
  })
  it('should not be able to display tributes', () => {
    Object.assign(fund, {
      ...fund,
      tribute_ir: { 1: 15 },
    })
    const { queryByText } = setup(<Taxation fund={fund} />)

    expect(queryByText('15%')).toBeFalsy()
  })
})
