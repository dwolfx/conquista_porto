import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import CoverageDate from '.'

describe('Adventure Sports Question tests', () => {
  it('should exists', () => {
    expect(CoverageDate).toBeDefined()
  })
  it('should render correctly', () => {
    renderWithReduxAndTheme(<CoverageDate />)
    const question = screen.getByText(
      'Quais as datas de partida e de chegada da sua viagem?'
    )
    const initialDateInput = screen.getByPlaceholderText('Data de partida')
    const endDateInput = screen.getByPlaceholderText('Data de chegada')
    expect(initialDateInput).toBeInTheDocument()
    expect(endDateInput).toBeInTheDocument()
    expect(question).toBeInTheDocument()
  })
  it('should have the button disabled', () => {
    renderWithReduxAndTheme(<CoverageDate />)
    const nextButton = screen.getByRole('button', { name: /PRÓXIMO/i })

    expect(nextButton).toBeDisabled()
  })
})
