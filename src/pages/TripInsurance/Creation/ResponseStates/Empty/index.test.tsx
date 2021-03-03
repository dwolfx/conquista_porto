import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import EmptyContent from '.'

describe('Empty state tests', () => {
  it('should exists', () => {
    expect(EmptyContent).toBeDefined()
  })
  it('should render correctly', () => {
    renderWithReduxAndTheme(<EmptyContent />)
    const message = screen.getByText(
      'Desculpe, no momento não temos um plano adequado para sua viagem.'
    )
    const simulateAgainButton = screen.getByText('SIMULAR NOVAMENTE')
    const homeButtom = screen.getByText('INÍCIO')
    expect(simulateAgainButton).toBeInTheDocument()
    expect(homeButtom).toBeInTheDocument()
    expect(message).toBeInTheDocument()
  })
})
