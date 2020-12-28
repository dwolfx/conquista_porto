import React from 'react'

import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { renderWithReduxAndTheme } from 'testUtils'
import { storeFactory } from 'setupTests'
import theme from 'styles/theme'

import { fireEvent } from '@testing-library/dom'
import TripInsuranceCreation from '.'
import { WhiteContent } from './styles'

const fn = jest.fn()

const store = storeFactory({
  fluxManagement: {
    form: {},
    stack: [],
  },
})

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

describe('Trip Insurance creation', () => {
  it('should exists', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <ThemeProvider theme={theme}>
        <TripInsuranceCreation isOpen closeHandler={fn} />
      </ThemeProvider>,
      { store, container: createRootContainer() }
    )
    expect(getByTestId('trip-insurance-layer')).toBeVisible()
  })

  it('should instantiate first step', () => {
    renderWithReduxAndTheme(
      <ThemeProvider theme={theme}>
        <TripInsuranceCreation isOpen closeHandler={fn} />
      </ThemeProvider>,
      { store, container: createRootContainer() }
    )
    expect(store.getState().fluxManagement.stack).toHaveLength(1)
  })

  it('should pop array when length > 1 and close when length === 1', () => {
    const storeA = storeFactory({
      fluxManagement: {
        form: {},
        stack: ['test', 'test2'],
      },
    })
    const { getByRole } = renderWithReduxAndTheme(
      <ThemeProvider theme={theme}>
        <TripInsuranceCreation isOpen closeHandler={fn} />
      </ThemeProvider>,
      { store: storeA, container: createRootContainer() }
    )
    fireEvent.click(getByRole('img', { name: /arrowleft/i }))
    expect(storeA.getState().fluxManagement.stack).toHaveLength(1)
    fireEvent.click(getByRole('img', { name: /arrowleft/i }))
    expect(fn).toHaveBeenCalled()
  })

  it('should be able to render WhiteContent', () => {
    renderWithReduxAndTheme(<WhiteContent />)
    // eslint-disable-next-line no-unused-expressions
    expect(WhiteContent).toBeVisible
  })
})
