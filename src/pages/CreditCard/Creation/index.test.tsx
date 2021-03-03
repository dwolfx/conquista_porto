import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import Creation from '.'

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

describe('Creation tests', () => {
  it('should exists', () => {
    expect(Creation).toBeDefined()
  })
  it('should be a layer component', () => {
    renderWithReduxAndTheme(<Creation isOpen />, {
      container: createRootContainer(),
    })
    expect(screen.getByTestId('layer-credit-card-creation')).toBeInTheDocument()
  })
  it('should render correclty the header', () => {
    renderWithReduxAndTheme(<Creation isOpen />, {
      container: createRootContainer(),
    })
    expect(screen.getByRole('img', { name: 'close' })).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Logo Conquista Beta' })
    ).toBeInTheDocument()
  })
  it('should render correctly the subheader', () => {
    renderWithReduxAndTheme(<Creation isOpen />, {
      container: createRootContainer(),
    })
    expect(screen.getAllByText(/Solicitação/i)[0]).toBeInTheDocument()
    expect(screen.getByText(/Cartão de Crédito/i)).toBeInTheDocument()
  })
})
