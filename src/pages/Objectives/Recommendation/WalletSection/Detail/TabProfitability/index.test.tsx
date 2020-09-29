import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import '@testing-library/jest-dom'

import TabProfitability from '.'

const setup = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}

const profitability = [
  {
    name: 'fundo',
    value: {
      1: 0.38,
      2: 0.7,
      3: 5.95,
      4: 13.84,
      5: 35.68,
    },
  },
  {
    name: 'CDI',
    value: {
      1: 0.3,
      2: 1.49,
      3: 4.83,
      4: 11.51,
      5: 20.07,
    },
  },
  {
    name: 'variacao',
    value: {
      1: 125.73,
      2: 46.95,
      3: 123.12,
      4: 120.24,
      5: 122.95,
    },
  },
]

describe('TabMoreInfo component', () => {
  it('should be able to display tab title', () => {
    const { getByTestId } = setup(
      <TabProfitability
        data-testid="tab-profitability"
        profitability={profitability}
      />
    )

    expect(getByTestId('tab-profitability')).toHaveTextContent(
      'RENTABILIDADE HISTÓRICA'
    )
  })
})
