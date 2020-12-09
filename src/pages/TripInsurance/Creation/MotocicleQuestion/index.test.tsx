import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import MotocicleQuestion from '.'

describe('Motocicle Question tests', () => {
  it('should exists', () => {
    expect(MotocicleQuestion).toBeDefined()
  })
  it('should render correctly', () => {
    renderWithReduxAndTheme(<MotocicleQuestion />)
    const question = screen.getByText(
      'Eventos decorrentes de acidentes com motocicletas na América Latina não tem cobertura.'
    )
    const radioButtonYes = screen.getByText('Sim')
    const radioButtonNo = screen.getByText('Não')
    expect(radioButtonYes).toBeInTheDocument()
    expect(radioButtonNo).toBeInTheDocument()
    expect(question).toBeInTheDocument()
  })
  it('should have the button disabled', () => {
    renderWithReduxAndTheme(<MotocicleQuestion />)
    const simulateButton = screen.getByRole('button')
    screen.debug(simulateButton)
    expect(simulateButton).toBeDisabled()
  })
  it('should have the button enabled', () => {
    renderWithReduxAndTheme(<MotocicleQuestion />)
    const simulateButton = screen.getByText('Simular')
    const radioButtonYes = screen.getByText('Sim')

    fireEvent.click(radioButtonYes)

    expect(simulateButton).not.toBeDisabled()
  })
})
