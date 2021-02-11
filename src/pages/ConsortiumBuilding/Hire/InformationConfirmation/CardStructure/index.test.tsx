import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithReduxAndTheme } from 'testUtils'
import CardStructure from '.'

describe('CardStructure', () => {
  it('Should exist', () => {
    expect(CardStructure).toBeDefined()
  })

  it('Should props', () => {
    renderWithReduxAndTheme(
      <CardStructure title="DADOS PESSOAIS" link="ALTERAR NO PERFIL">
        <h1>Teste children</h1>
      </CardStructure>
    )

    expect(screen.getByText('DADOS PESSOAIS')).toBeInTheDocument()
    expect(screen.getByText('ALTERAR NO PERFIL')).toBeInTheDocument()
  })

  test("it renders it's children", () => {
    renderWithReduxAndTheme(
      <CardStructure title="DADOS PESSOAIS" link="ALTERAR NO PERFIL">
        <h1>Teste children</h1>
      </CardStructure>
    )

    expect(screen.getByText('Teste children')).toBeInTheDocument()
  })
})
