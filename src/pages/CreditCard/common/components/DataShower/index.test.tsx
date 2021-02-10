import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import DataShower from './index'

describe('Credit Card creation fifth step DataShower', () => {
  it('should render document', () => {
    renderWithReduxAndTheme(<DataShower label="Bandeira" value="Mastercard" />)

    expect(screen.queryByText('Bandeira')).toBeDefined()
    expect(screen.queryByText('Mastercard')).toBeDefined()
  })
})
