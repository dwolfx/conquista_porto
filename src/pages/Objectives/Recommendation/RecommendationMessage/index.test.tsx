import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import '@testing-library/jest-dom'

import RecommendationMessage from '.'

const setup = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}

const suggestion_goal = {
  suggestion_monthly_value: 16120,
  suggestion_target_date: '11/10/2041',
}

const creditProduct = {
  name: 'Consórcio de Veículo',
  values: [
    {
      name: 'Valor a Contratar',
      value: 478688.72,
      checked: false,
    },
  ],
}

describe('RecommendationMessage', () => {
  describe('different messages based on suggestion goals', () => {
    it(`should return "Ótimo! Já temos uma carteira de investimento para você." if incomeMedianValue is higher than answerTargetValue`, () => {
      const { getByTestId } = setup(
        <RecommendationMessage
          data-testid="recommendation-message"
          suggestion_goal={undefined}
          incomeMedianValue={11}
          answerTargetValue={10}
        />
      )
      expect(getByTestId('recommendation-message')).toHaveTextContent(
        'Ótimo! Já temos uma carteira de investimento para você.'
      )
    })
    it(`should return "Ótimo! Já temos uma carteira de investimento para você." if has suggestion, incomeMedianValue < answerTargetValue and has cretid product`, () => {
      const { getByTestId } = setup(
        <RecommendationMessage
          data-testid="recommendation-message"
          suggestion_goal={suggestion_goal}
          incomeMedianValue={9}
          answerTargetValue={10}
          creditProduct={creditProduct}
        />
      )
      expect(getByTestId('recommendation-message')).toHaveTextContent(
        'Ótimo! Já temos uma carteira de investimento para você.'
      )
    })

    it(`should return "Os valores e o prazo não alcançam a meta financeira que você quer atingir." `, () => {
      const { getByTestId } = setup(
        <RecommendationMessage
          data-testid="recommendation-message"
          suggestion_goal={suggestion_goal}
          incomeMedianValue={9}
          answerTargetValue={10}
        />
      )
      expect(getByTestId('recommendation-message')).toHaveTextContent(
        'Os valores e o prazo não alcançam a meta financeira que você quer atingir.'
      )
    })
  })
})
