import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'

import MainContent from '.'

describe('MainContent', () => {
  const mockNextStep = jest.fn()

  it(`should be able to display button with text 'Próximo'`, () => {
    const { getByText } = renderWithReduxAndTheme(
      <MainContent step={1} setStep={mockNextStep} maxSteps={4} />
    )
    expect(getByText('Próximo')).toBeDefined()
  })
  it(`should be able to display button with text 'Voltar'`, () => {
    const { getByText } = renderWithReduxAndTheme(
      <MainContent step={2} setStep={mockNextStep} maxSteps={4} />
    )
    expect(getByText('Voltar')).toBeDefined()
  })
})
