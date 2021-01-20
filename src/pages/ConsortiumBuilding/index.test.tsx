import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'

import ConsortiumBuilding from '.'

describe('ConsortiumBuilding', () => {
  it(`should be able to display button with text 'Próximo'`, () => {
    const { getByText } = renderWithReduxAndTheme(<ConsortiumBuilding />)
    expect(getByText('Consórcio de Imóveis')).toBeDefined()
  })
})
