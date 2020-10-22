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
    renderWithReduxAndTheme(<Creation isOpen handleClose={() => {}} />, {
      container: createRootContainer(),
    })
    expect(screen.getByTestId('layer-credit-card-creation')).toBeInTheDocument()
  })
  it('should render correclty the header', () => {
    renderWithReduxAndTheme(<Creation isOpen handleClose={() => {}} />, {
      container: createRootContainer(),
    })
    expect(screen.getByRole('img', { name: 'close' })).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Logo Conquista Beta' })
    ).toBeInTheDocument()
  })
  it('should close the layer when clicking the close button', () => {
    const handleCloseMock = jest.fn()
    renderWithReduxAndTheme(<Creation isOpen handleClose={handleCloseMock} />, {
      container: createRootContainer(),
    })
    const closeButton = screen.getByRole('img', { name: 'close' })
    fireEvent.click(closeButton)
    expect(handleCloseMock).toHaveBeenCalled()
  })
  it('should close the layer when clicking the arrow left button at step 1', () => {
    const handleCloseMock = jest.fn()
    renderWithReduxAndTheme(<Creation isOpen handleClose={handleCloseMock} />, {
      container: createRootContainer(),
    })
    const goBackButton = screen.getByRole('img', { name: 'arrowleft' })
    fireEvent.click(goBackButton)
    expect(handleCloseMock).toHaveBeenCalled()
  })
  it('should render correctly the subheader', () => {
    renderWithReduxAndTheme(<Creation isOpen handleClose={() => {}} />, {
      container: createRootContainer(),
    })
    expect(screen.getAllByText(/Solicitação/i)[0]).toBeInTheDocument()
    expect(screen.getByText(/Cartão de Crédito/i)).toBeInTheDocument()
    expect(screen.getByText(/etapa 1 de 5/i)).toBeInTheDocument()
  })
})
