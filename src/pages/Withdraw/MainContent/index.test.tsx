import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'

import WithdrawCard from '.'

describe('WithdrawCard', () => {
  const mockNextStep = jest.fn()

  it(`should be able to display button with text 'Próximo'`, () => {
    const { getByText } = renderWithReduxAndTheme(
      <WithdrawCard step={1} setStep={mockNextStep} />
    )
    expect(getByText('Próximo')).toBeDefined()
  })
  it(`should be able to display button with text 'Voltar'`, () => {
    const { getByText } = renderWithReduxAndTheme(
      <WithdrawCard step={2} setStep={mockNextStep} />
    )
    expect(getByText('Voltar')).toBeDefined()
  })
})
