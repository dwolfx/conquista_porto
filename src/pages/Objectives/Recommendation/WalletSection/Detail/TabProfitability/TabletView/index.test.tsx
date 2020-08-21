import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import '@testing-library/jest-dom'

import { TProfitability } from 'store/modules/Objective/types'
import TabletView from '.'

const setup = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}

const profitability: TProfitability[] = [
  {
    name: 'fundo',
    value: {
      1: 12.27,
      2: -25.92,
      3: -3.46,
      4: 8.68,
      5: 42.34,
    },
  },
  {
    name: 'IBOVESPA',
    value: {
      1: 13.9,
      2: -28.08,
      3: -14.28,
      4: 8.36,
      5: 32.62,
    },
  },
  {
    name: 'variacao',
    value: {
      1: 1.11,
      2: 2.16,
      3: 10.82,
      4: 0.32,
      5: 9.72,
    },
  },
]

describe('TabletView component', () => {
  it('should be able to display profitability values', () => {
    const { getByText } = setup(<TabletView profitability={profitability} />)

    profitability.forEach(item => {
      Object.entries(item.value).forEach(value => {
        expect(
          getByText(value[1]?.toString().replace('.', ',') || '')
        ).toBeInTheDocument()
      })
    })
  })
  it(`should be able to display 'VARIAÇÃO' when third object name is equal to 'CDI'`, () => {
    profitability.splice(-1, 1)
    profitability.push({
      name: 'CDI',
      value: {
        1: 1.11,
        2: 2.16,
        3: 10.82,
        4: 0.32,
        5: 9.72,
      },
    })

    const { getByText } = setup(<TabletView profitability={profitability} />)

    expect(getByText('Variação (%)')).toBeInTheDocument()
  })
  it(`should be able to display '---' if the object name or value is undefined or null`, () => {
    // profitability[1].name = ''
    profitability[2].value = {
      1: undefined,
      2: 2.16,
      3: 10.82,
      4: 0.32,
      5: 9.72,
    }

    const { getAllByText } = setup(<TabletView profitability={profitability} />)

    expect(getAllByText('---')).toBeDefined()
  })
})
