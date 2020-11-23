import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import AdventureSportsQuestion from '.'

describe('Adventure Sports Question tests', () => {
  it('should exists', () => {
    expect(AdventureSportsQuestion).toBeDefined()
  })
  it('should render correctly', () => {
    renderWithReduxAndTheme(<AdventureSportsQuestion />)
    const question = screen.getByText(
      'Você pretende praticar esportes de aventura durante a viagem?'
    )
    const radioButtonYes = screen.getByText('Sim')
    const radioButtonNo = screen.getByText('Não')
    expect(radioButtonYes).toBeInTheDocument()
    expect(radioButtonNo).toBeInTheDocument()
    expect(question).toBeInTheDocument()
  })
  it('should have the button disabled', () => {
    renderWithReduxAndTheme(<AdventureSportsQuestion />)
    const nextButton = screen.getByTestId('button-adventure-sports')

    expect(nextButton).toBeDisabled()
  })
  it('should have the button enabled', () => {
    renderWithReduxAndTheme(<AdventureSportsQuestion />)
    const nextButton = screen.getByTestId('button-adventure-sports')
    const radioButtonYes = screen.getByText('Sim')

    fireEvent.click(radioButtonYes)

    expect(nextButton).not.toBeDisabled()
  })
})
