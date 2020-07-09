import React from 'react'

import { renderWithReduxAndTheme } from 'testUtils'
import HeaderNew from '.'
import { MemoryRouter } from 'react-router-dom'
import { Store } from 'redux'

const setup = (props = { crumbs: ['first'] }, store?: Store) =>
  renderWithReduxAndTheme(
    <MemoryRouter>
      <HeaderNew {...props} />
    </MemoryRouter>,
    { store }
  )

describe('HeaderNew', () => {
  it('should render the hamburguer menu when mobile or tablet', () => {
    window.resizeTo(800, 600)
    const { getByTestId } = setup()
    expect(getByTestId('header-hamburguer')).toBeDefined()
  })

  it('should NOT render the hamburguer menu when desktop', () => {
    const { getByTestId } = setup()
    expect(getByTestId('header-desktop')).toBeDefined()
  })
})
