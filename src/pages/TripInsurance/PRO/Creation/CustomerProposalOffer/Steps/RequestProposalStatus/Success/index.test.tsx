import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import SuccessState from '.'

describe('Success state tests', () => {
  it('exists', () => {
    expect(SuccessState).toBeDefined()
  })
  it('should display the correct texts: REQUEST SUCCESS', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <SuccessState />
      </MemoryRouter>
    )
    expect(screen.getByRole('img', { name: 'check' })).toBeInTheDocument()
    expect(
      screen.getByText('Tudo certo com a solicitação do seu Seguro Viagem.')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Agora, basta acessar seu e-mail e assinar eletronicamente a proposta.'
      )
    ).toBeInTheDocument()
  })
})
