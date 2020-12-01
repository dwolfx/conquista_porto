import React from 'react'

import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { render, renderWithReduxAndTheme } from 'testUtils'
import { storeFactory } from 'setupTests'
import theme from 'styles/theme'

import TripInsuranceCreation from '.'
import { fireEvent } from '@testing-library/dom'

const fn = jest.fn()

const store = storeFactory({
  fluxManagement: {
    form: {},
    stack: []
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
        <TripInsuranceCreation isOpen={true} closeHandler={fn}/>
      </ThemeProvider>, { store, container: createRootContainer() }
    )
    expect(getByTestId('trip-insurance-layer')).toBeVisible()
  })

  it('should instantiate first step', () => {
    renderWithReduxAndTheme(
      <ThemeProvider theme={theme}>
        <TripInsuranceCreation isOpen={true} closeHandler={fn} />
      </ThemeProvider>, { store, container: createRootContainer() }
    )
    expect(store.getState().fluxManagement.stack).toHaveLength(1)
  })

  it('should pop array when length > 1 and close when length === 1', () => {
    const storeA = storeFactory({
      fluxManagement: {
        form: {},
        stack: ['test', 'test2']
      },
    })
    const { getByRole } = renderWithReduxAndTheme(
      <ThemeProvider theme={theme}>
        <TripInsuranceCreation isOpen={true} closeHandler={fn} />
      </ThemeProvider>, { store: storeA, container: createRootContainer() }
    )
    fireEvent.click(getByRole('img', { name: /arrowleft/i }))
    expect(storeA.getState().fluxManagement.stack).toHaveLength(1)
    fireEvent.click(getByRole('img', { name: /arrowleft/i }))
    expect(fn).toHaveBeenCalled()
  })
})
