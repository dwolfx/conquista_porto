import React from 'react'

import { renderWithReduxAndTheme, act, screen } from 'testUtils'
import userEvent from '@testing-library/user-event'

import ComparativeModal from './index'

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    document.body.appendChild(container)
  }
  return container
}

const setup = () =>
  renderWithReduxAndTheme(<ComparativeModal isOpen handleClose={() => {}} />, {
    container: createRootContainer(),
  })

describe('EditingCardData component', () => {
  it('should exists', () => {
    expect(ComparativeModal).toBeDefined()
  })
  it(`should trigger 'CLOSE' button`, () => {
    const handleClose = jest.fn()

    setup()

    renderWithReduxAndTheme(
      <ComparativeModal isOpen handleClose={handleClose} />,
      {
        container: createRootContainer(),
      }
    )

    const closeButton = screen.getByText(/close/i)
    userEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalled()
  })
  it('should render Table component', () => {
    setup()

    expect(screen.getByText(/comparativo de coberturas/i)).toBeDefined()
  })
  it('should render Tabs component', () => {
    setup()

    act(() => {
      window.resizeTo(400, 600)
    })

    expect(screen.getByText(/planos brasil/i)).toBeDefined()
  })
})
