import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import '@testing-library/jest-dom'
import 'jest-styled-components'

import CardEstimatedResults from '.'

const setup = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}

const answer = {
  target_value: 10000.0,
}

const income = {
  pessimistic: 133620.64,
  median: 137358.87,
  optimistic: 141242.75,
}

describe('CardEstimatedResults', () => {
  describe('show information tests', () => {
    it('should be able to show container message with information icon', () => {
      const text = `Estas são as estimativas de quando o seu investimento pode evoluir, baseadas no histórico de rendimentos dos fundos da carteira recomendadainformation.svg .`
      const { getByTestId } = setup(
        <CardEstimatedResults
          answerTargetValue={answer.target_value}
          income={income}
        />
      )
      expect(getByTestId('text-container')).toHaveTextContent(text)
    })
    it('should be able to show pessimistic info', () => {
      const { getByTestId } = setup(
        <CardEstimatedResults
          answerTargetValue={answer.target_value}
          income={income}
        />
      )
      expect(getByTestId('estimate-title-1')).toHaveTextContent(
        'Estimativa Pessimista'
      )
      expect(getByTestId('estimate-value-1')).toHaveTextContent('R$ 133.620,64')
    })
    it('should be able to show median info', () => {
      const { getByTestId } = setup(
        <CardEstimatedResults
          answerTargetValue={answer.target_value}
          income={income}
        />
      )
      expect(getByTestId('estimate-title-2')).toHaveTextContent(
        'Estimativa Provável'
      )
      expect(getByTestId('estimate-value-2')).toHaveTextContent('R$ 137.358,87')
    })
    it('should be able to show optimistic info', () => {
      const { getByTestId } = setup(
        <CardEstimatedResults
          answerTargetValue={answer.target_value}
          income={income}
        />
      )
      expect(getByTestId('estimate-title-3')).toHaveTextContent(
        'Estimativa Otimista'
      )
      expect(getByTestId('estimate-value-3')).toHaveTextContent('R$ 141.242,75')
    })
    it('should be able to show median info in green4 color', () => {
      const { getByTestId } = setup(
        <CardEstimatedResults
          answerTargetValue={answer.target_value}
          income={income}
        />
      )
      expect(getByTestId('estimate-value-2')).toHaveStyleRule(
        'color',
        '#46A166'
      )
    })
    it('should be able to show median info in magenta2 color', () => {
      const { getByTestId } = setup(
        <CardEstimatedResults answerTargetValue={1000000} income={income} />
      )
      expect(getByTestId('estimate-value-2')).toHaveStyleRule(
        'color',
        '#E72176'
      )
    })
  })
})
