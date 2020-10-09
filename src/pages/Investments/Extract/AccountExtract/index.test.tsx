import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import AccountExtract from '.'

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    container.setAttribute('role', 'main')
    document.body.appendChild(container)
  }
  return container
}

describe('AccountExtract tests', () => {
  it('should exists', () => {
    expect(AccountExtract).toBeDefined()
  })
  it('should contains 2 cards in the body', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <AccountExtract isOpen handleClose={() => {}} />
      </MemoryRouter>, { container: createRootContainer() }
    )
    expect(screen.getByTestId('card-account-info')).toBeInTheDocument()
    expect(screen.getByTestId('table-account-extract')).toBeInTheDocument()
  })
})
