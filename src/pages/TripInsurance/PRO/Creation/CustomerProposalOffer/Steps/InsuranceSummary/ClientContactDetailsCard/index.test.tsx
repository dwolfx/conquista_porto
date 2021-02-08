import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'

import ClientContactDetailsCard from '.'

const defaultStore: {
  fluxManagement: { stack: React.ReactElement[]; form: {} }
} = {
  fluxManagement: {
    stack: [],
    form: {
      passageiroPrincipal: {
        email: 'email@principal.com',
        celularDDD: '11',
        celularNumero: '965543221',
      },
    },
  },
}

describe('ClientContactDetailsCard component', () => {
  it('should exists', () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(<ClientContactDetailsCard />, {
      store,
    })
    expect(ClientContactDetailsCard).toBeDefined()
  })
  it(`should render error`, () => {
    const store = storeFactory({
      fluxManagement: {
        stack: [],
        form: {
          passageiroPrincipal: {
            email: '',
            celularDDD: '',
            celularNumero: '',
          },
        },
      },
    })
    renderWithReduxAndTheme(<ClientContactDetailsCard />, {
      store,
    })

    expect(screen.getAllByText('Não preenchido')).toHaveLength(2)
  })
})
