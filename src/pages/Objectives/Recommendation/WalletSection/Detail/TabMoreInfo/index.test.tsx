import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import '@testing-library/jest-dom'

import TabMoreInfo from '.'

const setup = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}

const fund = {
  initial_date: '06/07/2012',
  manager: 'Occam Brasil',
  benchmark: 'CDI',
  pl: 1,
  adm_tax: 1,
  performance_rate: 20,
  url_performance_info_pdf:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Informativos-de-Desempenho/INFORMATIVODESEMPENHO_OCCAMINSTITUCIONALIIFICFIM.pdf',
  url_fund_rules_pdf:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Regulamentos/REGULAMENTO_OCCAMINSTITUCIONALIIFICFIM.pdf',
}

describe('TabMoreInfo component', () => {
  it('should be able to display manager', () => {
    const { queryByText } = setup(<TabMoreInfo fund={fund} />)

    expect(queryByText(fund.manager)).toBeInTheDocument()
  })
  it('should not be able to display manager', () => {
    Object.assign(fund, {
      ...fund,
      manager: null,
    })
    const { queryByText } = setup(<TabMoreInfo fund={fund} />)

    expect(queryByText('-')).toBeInTheDocument()
  })
  it(`should be able to display 'Não há cobrança de performance' when performance_rate is 0`, () => {
    Object.assign(fund, {
      ...fund,
      performance_rate: 0,
    })
    const { queryByText } = setup(<TabMoreInfo fund={fund} />)

    expect(queryByText('Não há cobrança de performance')).toBeInTheDocument()
  })
})
