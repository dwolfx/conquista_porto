import React from 'react'

import { storeFactory } from 'setupTests'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import MotocicleQuestion from '.'

const defaulState = {
  fluxManagement: {
    stack: [],
    form: {
      hasLatinAmericaCountryAndOtherCountry: false,
    },
  },
}

const setup = (initialState: any) => {
  let store = storeFactory(initialState)
  store = { ...store, dispatch: jest.fn() }
  return renderWithReduxAndTheme(<MotocicleQuestion />, { store })
}

describe('Motocicle Question tests', () => {
  it('should exists', () => {
    expect(MotocicleQuestion).toBeDefined()
  })
  it('should render correctly when there is no Latin America country selected', () => {
    setup(defaulState)
    const leftPanelTitle = screen.getByText('Cobertura')
    const leftPanelContent = screen.getByText(
      'Cobertura para eventos decorrentes de viagens de motocicleta.'
    )
    const question = screen.getByText(
      'Pretende usar motocicleta durante a viagem?'
    )
    const radioButtonYes = screen.getByText('Sim')
    const radioButtonNo = screen.getByText('Não')
    expect(radioButtonYes).toBeInTheDocument()
    expect(radioButtonNo).toBeInTheDocument()
    expect(leftPanelTitle).toBeInTheDocument()
    expect(leftPanelContent).toBeInTheDocument()
    expect(question).toBeInTheDocument()
  })
  it('should render correctly when there is at lease one Latin America country selected', () => {
    defaulState.fluxManagement.form.hasLatinAmericaCountryAndOtherCountry = true
    setup(defaulState)
    const question = screen.getByText(
      'Pretende usar motocicleta durante a viagem?'
    )
    const latinAmericaText = screen.getByText(
      'Não haverá cobertura para eventos decorrentes de viagens de motocicleta nos países selecionados da América Latina.'
    )
    const radioButtonYes = screen.getByText('Sim')
    const radioButtonNo = screen.getByText('Não')
    expect(radioButtonYes).toBeInTheDocument()
    expect(radioButtonNo).toBeInTheDocument()
    expect(question).toBeInTheDocument()
    expect(latinAmericaText).toBeInTheDocument()
  })
  it('should have the button disabled', () => {
    renderWithReduxAndTheme(<MotocicleQuestion />)
    const simulateButton = screen.getByRole('button')
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
