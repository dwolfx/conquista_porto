import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'

import CardFooter from '.'

describe('CardFooter', () => {
  it('Should render button "Voltar"', () => {
    const { getByText, getAllByRole } = renderWithReduxAndTheme(
      <CardFooter
        step={2}
        prevStep={() => {}}
        nextStep={() => {}}
        isNextDisabled={false}
        isNextLoading={false}
      />
    )
    expect(getByText('Voltar')).toBeDefined()
    expect(getAllByRole('button')).toBeDefined()
  })
  it('Should render button "Próximo"', () => {
    const { getByText, getAllByRole } = renderWithReduxAndTheme(
      <CardFooter
        step={1}
        prevStep={() => {}}
        nextStep={() => {}}
        isNextDisabled={false}
        isNextLoading={false}
      />
    )
    expect(getByText('Próximo')).toBeDefined()
    expect(getAllByRole('button')).toBeDefined()
  })
})
