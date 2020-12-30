import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import '@testing-library/jest-dom'

import InformativeHeader from '.'

const setup = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}

const answer = {
  nickname: 'Viagem',
  target_date: '12/12/2021',
  target_value: 100000,
  initial_value: 10100.87,
  monthly_value: 10010,
}

describe('Recommendation Information Header', () => {
  describe('show answer prop values', () => {
    it('should be able to show answer nickname', () => {
      const { getByTestId } = setup(
        <InformativeHeader
          nickname={answer.nickname}
          targetDate={answer.target_date}
          targetValue={answer.target_value}
          initialInvestment={answer.initial_value}
          monthlyInvestment={answer.monthly_value}
        />
      )
      expect(getByTestId('header-title')).toHaveTextContent('Viagem')
    })
    it('should be able to show answer target_date', () => {
      const { getByTestId } = setup(
        <InformativeHeader
          nickname={answer.nickname}
          targetDate={answer.target_date}
          targetValue={answer.target_value}
          initialInvestment={answer.initial_value}
          monthlyInvestment={answer.monthly_value}
        />
      )
      expect(getByTestId('target-date-value')).toHaveTextContent('12/12/2021')
    })
    it('should be able to show formatted answer target_value', () => {
      const { getByTestId } = setup(
        <InformativeHeader
          nickname={answer.nickname}
          targetDate={answer.target_date}
          targetValue={answer.target_value}
          initialInvestment={answer.initial_value}
          monthlyInvestment={answer.monthly_value}
        />
      )
      expect(getByTestId('financial-goal-value')).toHaveTextContent(
        'R$ 100.000,00'
      )
    })
    it('should be able to show formatted answer initial_value', () => {
      const { getByTestId } = setup(
        <InformativeHeader
          nickname={answer.nickname}
          targetDate={answer.target_date}
          targetValue={answer.target_value}
          initialInvestment={answer.initial_value}
          monthlyInvestment={answer.monthly_value}
        />
      )
      expect(getByTestId('initial-investment-value')).toHaveTextContent(
        'R$ 10.100,87'
      )
    })
    it('should be able to show formatted answer monthly_value', () => {
      const { getByTestId } = setup(
        <InformativeHeader
          nickname={answer.nickname}
          targetDate={answer.target_date}
          targetValue={answer.target_value}
          initialInvestment={answer.initial_value}
          monthlyInvestment={answer.monthly_value}
        />
      )
      expect(getByTestId('monthly-investment-value')).toHaveTextContent(
        'R$ 10.010,00'
      )
    })
  })
})
