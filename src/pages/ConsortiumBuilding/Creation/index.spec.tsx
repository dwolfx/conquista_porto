import React from 'react'

import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { renderWithReduxAndTheme } from 'testUtils'
import { storeFactory } from 'setupTests'
import theme from 'styles/theme'

import ConsortiumBuildingCreation from '.'

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

describe('Consortium Building creation', () => {
  it('should exists', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <ThemeProvider theme={theme}>
        <ConsortiumBuildingCreation isOpen closeHandler={fn} />
      </ThemeProvider>,
      { store, container: createRootContainer() }
    )
    expect(getByTestId('consortium-building-layer')).toBeVisible()
  })

  it('should instantiate first step', () => {
    renderWithReduxAndTheme(
      <ThemeProvider theme={theme}>
        <ConsortiumBuildingCreation isOpen closeHandler={fn} />
      </ThemeProvider>,
      { store, container: createRootContainer() }
    )
    expect(store.getState().fluxManagement.stack).toHaveLength(1)
  })
})
