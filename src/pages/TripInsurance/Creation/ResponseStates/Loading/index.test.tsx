import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import LoadingContent from '.'

describe('Loading tests', () => {
  it('should exists', () => {
    expect(LoadingContent).toBeDefined()
  })
  it('should render correctly', () => {
    renderWithReduxAndTheme(<LoadingContent />)
    const message = screen.getByText(
      'Aguarde, estamos buscando as melhores opções para você....'
    )
    expect(message).toBeInTheDocument()
  })
})
