import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import CEPSearch from '.'

describe('CEPSearch component tests', () => {
  it('should exists', () => {
    expect(CEPSearch).toBeDefined()
  })
  it('should render correctly CEPSearch component with some state', () => {
    renderWithReduxAndTheme(<CEPSearch />)
    const cep = screen.getByTestId('cep')
    const dontKnowTheZIPCode = screen.getByText('Não sabe o CEP?')
    expect(cep).toBeInTheDocument()
    expect(dontKnowTheZIPCode).toBeInTheDocument()
  })
})
