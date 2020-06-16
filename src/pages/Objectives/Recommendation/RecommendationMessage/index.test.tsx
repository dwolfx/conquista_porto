import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import '@testing-library/jest-dom'

import RecommendationMessage from '.'

const setup = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}

const suggestion_goal1 = {
  suggestion_monthly_value: 16120,
  suggestion_target_date: '11/10/2041',
}

const suggestion_goal2 = undefined

describe('RecommendationMessage', () => {
  describe('different messages based on suggestion goals', () => {
    it(`should return "Os valores e o prazo não alcançam a meta financeira que você quer atingir." `, () => {
      const { getByTestId } = setup(
        <RecommendationMessage
          data-testid="recommendation-message"
          suggestion_goal={suggestion_goal1}
        />
      )
      expect(getByTestId('recommendation-message')).toHaveTextContent(
        'Os valores e o prazo não alcançam a meta financeira que você quer atingir.'
      )
    })
    it(`should return "Ótimo! Já temos uma carteira de investimento para você." `, () => {
      const { getByTestId } = setup(
        <RecommendationMessage
          data-testid="recommendation-message"
          suggestion_goal={suggestion_goal2}
        />
      )
      expect(getByTestId('recommendation-message')).toHaveTextContent(
        'Ótimo! Já temos uma carteira de investimento para você.'
      )
    })
  })
})
