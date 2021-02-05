import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import BaseLayer from '.'

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

describe('BaseLayer tests', () => {
  it('should be a layer component', () => {
    renderWithReduxAndTheme(
      <BrowserRouter>
        <BaseLayer
          isOpen
          handleClose={() => {}}
          id="extrato-conta"
          title="Conta de investimento"
        />
      </BrowserRouter>,
      { container: createRootContainer() }
    )
    expect(screen.getByTestId('layer-extrato-conta')).toBeInTheDocument()
  })
  it('should render correclty the header', () => {
    renderWithReduxAndTheme(
      <BrowserRouter>
        <BaseLayer
          isOpen
          handleClose={() => {}}
          id="extrato-conta"
          title="Conta de investimento"
        />
      </BrowserRouter>,
      { container: createRootContainer() }
    )
    expect(screen.getByRole('img', { name: 'close' })).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Logo Conquista Beta' })
    ).toBeInTheDocument()
  })
  it('should call handleClose function when click on close button', () => {
    const handleCloseMock = jest.fn()
    renderWithReduxAndTheme(
      <BrowserRouter>
        <BaseLayer
          isOpen
          handleClose={handleCloseMock}
          id="extrato-conta"
          title="Conta de investimento"
        />
      </BrowserRouter>,
      { container: createRootContainer() }
    )
    const closeButton = screen.getByRole('img', { name: 'close' })
    fireEvent.click(closeButton)
    expect(handleCloseMock).toBeCalled()
  })
  it('should render an information subheader with the page title', () => {
    renderWithReduxAndTheme(
      <BrowserRouter>
        <BaseLayer
          isOpen
          handleClose={() => {}}
          id="extrato-conta"
          title="Conta de investimento"
        />
      </BrowserRouter>,
      { container: createRootContainer() }
    )
    const subheader = screen.getByTestId('subheader')
    expect(subheader).toBeInTheDocument()
    expect(subheader).toHaveStyleRule('background-color', '#555861')
    expect(subheader).toHaveStyleRule('height', '56px')
    expect(screen.getByText(/extrato de/i)).toBeInTheDocument()
    expect(screen.getByTestId('text-investment-account')).toBeInTheDocument()
  })
  it('should contain ambima component', () => {
    renderWithReduxAndTheme(
      <BrowserRouter>
        <BaseLayer
          isOpen
          handleClose={() => {}}
          id="extrato-conta"
          title="Conta de investimento"
        />
      </BrowserRouter>,
      { container: createRootContainer() }
    )
    expect(screen.getByTestId('ambima')).toBeInTheDocument()
  })
})
