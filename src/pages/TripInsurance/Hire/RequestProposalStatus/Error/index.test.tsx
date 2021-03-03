import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import ErrorState from '.'

describe('Success state tests', () => {
  it('exists', () => {
    expect(ErrorState).toBeDefined()
  })
  it('should display the correct texts: REQUEST FAILED', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <ErrorState />
      </MemoryRouter>
    )
    expect(
      screen.getByRole('img', { name: 'closerounded' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Não foi possível confirmar sua solitação')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Tente novamente mais tarde, por favor.')
    ).toBeInTheDocument()
  })
})
