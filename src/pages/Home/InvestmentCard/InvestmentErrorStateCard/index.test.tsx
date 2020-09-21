import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'
import { fireEvent, screen, act } from '@testing-library/react'

import InvestmentErrorStateCard from 'pages/Home/InvestmentCard/InvestmentErrorStateCard'

// onFetchInvestments mock
const onFetchInvestments = jest.fn()

describe('InvestmentErrorStateCard', () => {
  it('should render error state data', () => {
    renderWithReduxAndTheme(
      <InvestmentErrorStateCard onRetry={onFetchInvestments} />
    )

    expect(
      screen.getByText(
        'Desculpe, não foi possível carregar suas informações. Aguarde alguns instantes e tente novamente.'
      )
    ).toBeDefined()
  })

  it('should trigger button click event', async () => {
    renderWithReduxAndTheme(
      <InvestmentErrorStateCard onRetry={onFetchInvestments} />
    )

    await act(async () => {
      const button = screen.getAllByRole('button')[0]
      await fireEvent.click(button)
      expect(button).toBeInTheDocument()
    })

    expect(onFetchInvestments).toHaveBeenCalledTimes(1)
  })
})
