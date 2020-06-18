import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'
import '@testing-library/jest-dom'
import 'jest-styled-components'

import Warning from 'components/Warning'

const warnings = [
  {
    title: 'Perfil de investidor vencido.',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
    buttonText: 'Atualizar perfil',
    buttonAction: () => {},
  },
  {
    title: 'Cadastro de investidor vencido.',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
    buttonText: 'Atualizar cadastro',
    buttonAction: () => {},
  },
]

describe('Warning', () => {
  it('Should render warning title: Perfil de investidor vencido.', () => {
    const { getByText } = renderWithReduxAndTheme(
      <Warning warnings={warnings} />
    )
    expect(getByText('Perfil de investidor vencido.')).toBeDefined()
  })
  it('Should render 2 warnings elements.', async () => {
    const { findAllByRole } = renderWithReduxAndTheme(
      <Warning warnings={warnings} />
    )
    const items = await findAllByRole('button')
    expect(items).toHaveLength(2)
  })
})
