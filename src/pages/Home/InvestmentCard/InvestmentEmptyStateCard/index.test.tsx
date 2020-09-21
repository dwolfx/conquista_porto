import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'
import { fireEvent, screen, act } from '@testing-library/react'

import InvestmentEmptyStateCard from 'pages/Home/InvestmentCard/InvestmentEmptyStateCard'

// useHistory mock
const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('InvestmentEmptyStateCard', () => {
  it('should render empty state data', () => {
    renderWithReduxAndTheme(<InvestmentEmptyStateCard />)

    expect(screen.getByText('Investimentos')).toBeDefined()
    expect(screen.getByText('Fundos de Investimento')).toBeDefined()
    expect(screen.getByText('Diversificar com menos riscos')).toBeDefined()
    expect(
      screen.getByText(
        'Uma carteira de investimento com diferentes ativos é a chave para bons rendimentos. Na Lista de Fundos, você pode selecionar os que mais combinam com o seu perfil.'
      )
    ).toBeDefined()
    expect(screen.getByText('conhecer')).toBeDefined()
  })

  it('should trigger button click event', async () => {
    renderWithReduxAndTheme(<InvestmentEmptyStateCard />)

    await act(async () => {
      const button = screen.getAllByRole('button')[0]
      await fireEvent.click(button)
      expect(button).toBeInTheDocument()
    })

    expect(mockHistoryPush).toHaveBeenCalledTimes(1)
  })
})
