import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import TableFilterDrawer from '.'

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

describe('TableFilterDrawer tests', () => {
  it('should exists', () => {
    expect(TableFilterDrawer).toBeDefined()
  })
  it('should be a drawer component', () => {
    renderWithReduxAndTheme(<TableFilterDrawer isOpen />, { container: createRootContainer() })
    expect(screen.getByTestId('extract-filter-drawer')).toBeInTheDocument()
  })
  it('should have a header with 2 buttons and logo', () => {
    renderWithReduxAndTheme(<TableFilterDrawer isOpen />, { container: createRootContainer() })
    expect(screen.getByRole('img', { name: 'arrowleft' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'close' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Logo Conquista Beta' })).toBeInTheDocument()
  })
})