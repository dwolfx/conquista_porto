import React from 'react'

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
  it('should be a layer component', () => {
    renderWithReduxAndTheme(<AccountExtract isOpen handleClose={() => {}} />, { container: createRootContainer() })
    expect(screen.getByTestId('layer-account-extract')).toBeInTheDocument()
  })
  it('should render correclty the header', () => {
    renderWithReduxAndTheme(<AccountExtract isOpen handleClose={() => {}} />, { container: createRootContainer() })
    expect(screen.getByRole('img', { name: 'close' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Logo Conquista Beta'})).toBeInTheDocument()
  })
  it('should call handleClose function when click on close button', () => {
    const handleCloseMock = jest.fn()
    renderWithReduxAndTheme(<AccountExtract isOpen handleClose={handleCloseMock} />, { container: createRootContainer() })
    const closeButton = screen.getByRole('img', { name: 'close' })
    fireEvent.click(closeButton)
    expect(handleCloseMock).toBeCalled()
  })
  it('should render an information subheader with the page title', () => {
    renderWithReduxAndTheme(<AccountExtract isOpen handleClose={() => {}} />, { container: createRootContainer() })
    const subheader = screen.getByTestId('subheader')
    expect(subheader).toBeInTheDocument()
    expect(subheader).toHaveStyleRule('background-color', '#555861')
    expect(subheader).toHaveStyleRule('height', '56px')
    expect(screen.getByText(/extrato da/i)).toBeInTheDocument()
    expect(screen.getByText(/conta de investimento/i)).toBeInTheDocument()
  })
  it('should contains 2 cards in the body', () => {
    renderWithReduxAndTheme(<AccountExtract isOpen handleClose={() => {}} />, { container: createRootContainer() })
    expect(screen.getByTestId('card-account-info')).toBeInTheDocument()
    expect(screen.getByTestId('table-account-extract')).toBeInTheDocument()
  })
  it('should contain ambima component', () => {
    renderWithReduxAndTheme(<AccountExtract isOpen handleClose={() => {}} />, { container: createRootContainer() })
    expect(screen.getByTestId('ambima')).toBeInTheDocument()
  })
})