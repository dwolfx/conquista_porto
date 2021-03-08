import React from 'react'

import 'jest-styled-components'
import { renderWithReduxAndTheme, screen, createRootContainer } from 'testUtils'
import userEvent from '@testing-library/user-event'
import { storeFactory } from 'setupTests'

import Declarations from '.'

const store = storeFactory({
  fluxManagement: {
    form: {},
    stack: [],
  },
})

describe('Declaration Building creation', () => {
  it('should exists', () => {
    renderWithReduxAndTheme(<Declarations />, {
      store,
      container: createRootContainer(),
    })
    expect(Declarations).toBeDefined()
  })

  it('should button exist', () => {
    renderWithReduxAndTheme(<Declarations />, {
      store,
      container: createRootContainer(),
    })
    expect(
      screen.getByRole('button', { name: 'continuar' })
    ).toBeInTheDocument()
  })

  it('should enable button when checked', () => {
    renderWithReduxAndTheme(<Declarations />, {
      store,
      container: createRootContainer(),
    })

    expect(screen.getByRole('button', { name: 'continuar' })).toBeDisabled()

    userEvent.click(
      screen.getByRole('checkbox', {
        name: 'Confirmo que li e concordo com todas as informações.',
      })
    )

    expect(screen.getByRole('button', { name: 'continuar' })).toBeEnabled()
    expect(
      screen.getByRole('checkbox', {
        name: 'Confirmo que li e concordo com todas as informações.',
      })
    ).toBeChecked()
  })
})
