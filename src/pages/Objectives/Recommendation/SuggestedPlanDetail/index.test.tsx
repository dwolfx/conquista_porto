import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import '@testing-library/jest-dom'

import SuggestedPlanDetail from '.'

const setup = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}

const credit_product = {
  name: 'Financiamento de Veículo',
  values: [
    {
      name: 'Valor a Contratar',
      value: 'R$ 478.688,72',
      checked: false,
    },
  ],
}

const income = {
  median: 10000.89,
}

const answer = {
  target_value: 10000.9,
}

describe('SuggestedPlanDetail', () => {
  describe('show credit_product prop values', () => {
    it(`should be able to show 'Financiamento' when credit product name contains this value`, () => {
      const { getByText } = setup(
        <SuggestedPlanDetail
          creditProduct={credit_product}
          incomeMedianValue={income.median}
          answerTargetValue={answer.target_value}
        />
      )

      expect(getByText('Financiamento')).toBeDefined()
    })
    it(`should be able to show 'Consórcio' when credit product name does not contains 'Financiamento' value`, () => {
      Object.assign(credit_product, {
        ...credit_product,
        name: 'Consórcio de Veículo',
      })

      const { getByText } = setup(
        <SuggestedPlanDetail
          creditProduct={credit_product}
          incomeMedianValue={income.median}
          answerTargetValue={answer.target_value}
        />
      )

      expect(getByText('Consórcio')).toBeDefined()
    })
    it(`should be able to show formatted income median value`, () => {
      const { getByText } = setup(
        <SuggestedPlanDetail
          creditProduct={credit_product}
          incomeMedianValue={income.median}
          answerTargetValue={answer.target_value}
        />
      )

      expect(getByText('R$ 10.000,89')).toBeDefined()
    })
  })
  describe('component conditions to render ', () => {
    it('it should not be rendered if the income median value is equal or greater than target value', () => {
      const { queryByText } = setup(
        <SuggestedPlanDetail
          creditProduct={credit_product}
          incomeMedianValue={10000.9}
          answerTargetValue={10000.9}
        />
      )

      expect(queryByText('Plano Sugerido:')).not.toBeTruthy()
    })
    it('it should not be rendered if the credit_product is undefined', () => {
      const { queryByText } = setup(
        <SuggestedPlanDetail
          creditProduct={undefined}
          incomeMedianValue={income.median}
          answerTargetValue={answer.target_value}
        />
      )

      expect(queryByText('Plano Sugerido:')).not.toBeTruthy()
    })
  })
})
