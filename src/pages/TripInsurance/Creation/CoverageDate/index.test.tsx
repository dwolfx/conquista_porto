import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

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
    const initialDateInput = screen.getByText('Data de partida')
    const endDateInput = screen.getByText('Data de chegada')
    expect(initialDateInput).toBeInTheDocument()
    expect(endDateInput).toBeInTheDocument()
    expect(question).toBeInTheDocument()
  })
  it('should have the button disabled', () => {
    renderWithReduxAndTheme(<CoverageDate />)
    const nextButton = screen.getByTestId('button-coverage-date')

    expect(nextButton).toBeDisabled()
  })
})
