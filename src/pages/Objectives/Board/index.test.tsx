import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithReduxAndTheme } from 'testUtils'

import Board from './index'
import { MemoryRouter } from 'react-router-dom'

describe('Objective Board component', () => {
  it('should render cards with every goals types', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <Board />
      </MemoryRouter>
    )

    expect(screen.getByText('Viagem')).toBeDefined()
    expect(screen.getByText('Aposentar')).toBeDefined()
    expect(screen.getByText('Carro')).toBeDefined()
    expect(screen.getByText('Casa')).toBeDefined()
    expect(screen.getByText('Curso')).toBeDefined()
    expect(screen.getByText('Evento')).toBeDefined()
    expect(screen.getByText('Poupar')).toBeDefined()
  })
})
