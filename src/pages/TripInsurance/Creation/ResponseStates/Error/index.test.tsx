import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import ErrorContent from '.'

describe('Error state tests', () => {
  it('should exists', () => {
    expect(ErrorContent).toBeDefined()
  })
  it('should render correctly', () => {
    renderWithReduxAndTheme(<ErrorContent />)
    const message = screen.getByText(
      'Desculpe, não foi possível carregar suas informações. Aguarde alguns instantes e tente novamente.'
    )
    const tryAgainButton = screen.getByText('TENTAR NOVAMENTE')
    expect(tryAgainButton).toBeInTheDocument()
    expect(message).toBeInTheDocument()
  })
})
