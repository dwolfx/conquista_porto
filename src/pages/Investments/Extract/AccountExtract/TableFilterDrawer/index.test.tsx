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
  it('should have a footer with 3 buttons', () => {
    renderWithReduxAndTheme(<TableFilterDrawer isOpen />, { container: createRootContainer() })
    expect(screen.getByRole('button', { name: /aplicar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /limpar/i })).toBeInTheDocument()
  })
  it('should have button filters', () => {
    renderWithReduxAndTheme(<TableFilterDrawer isOpen />, { container: createRootContainer() })
    expect(screen.getByRole('button', { name: /últimos 7 dias/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /últimos 30 dias/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /período específico/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /retirada/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrada/i })).toBeInTheDocument()
  })
})