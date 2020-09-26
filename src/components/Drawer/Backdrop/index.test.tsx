import { fireEvent } from '@testing-library/dom'
import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import Backdrop from './index'

describe('Backdrop component', () => {
  it('should render component', () => {
    let backdropIsOpen = true
    const setBackdropOpenState = (state: boolean) => (backdropIsOpen = state)

    let portalRoot = document.getElementById('root')
    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }

    renderWithReduxAndTheme(
      <Backdrop
        isOpen={backdropIsOpen}
        handleClose={() => setBackdropOpenState(false)}
      >
        Backdrop content
      </Backdrop>,
      { container: portalRoot }
    )

    expect(screen.getByText('Backdrop content')).toBeDefined()
  })

  it('should open and close backdrop', () => {
    let backdropIsOpen = true
    const setBackdropOpenState = (state: boolean) => (backdropIsOpen = state)

    let portalRoot = document.getElementById('root')
    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }

    renderWithReduxAndTheme(
      <>
        <Backdrop
          isOpen={backdropIsOpen}
          handleClose={() => setBackdropOpenState(false)}
        >
          Backdrop content
        </Backdrop>
        ,
        <div
          data-testid="open-backdrop"
          onClick={() => setBackdropOpenState(true)}
        />
      </>,
      { container: portalRoot }
    )

    fireEvent.click(screen.getByTestId('open-backdrop'))
    expect(screen.getByText('Backdrop content')).toBeDefined()
  })
})
