import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
import userEvent from '@testing-library/user-event'

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
    renderWithReduxAndTheme(
      <ClientContactDetailsCard setHasEmptyData={() => {}} />,
      {
        store,
      }
    )
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
    renderWithReduxAndTheme(
      <ClientContactDetailsCard setHasEmptyData={() => {}} />,
      {
        store,
      }
    )

    expect(screen.getAllByText('Não preenchido')).toHaveLength(2)
  })
  it(`should trigger 'ALTERAR NO PERFIL' button`, () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(
      <ClientContactDetailsCard setHasEmptyData={() => {}} />,
      { store }
    )

    //@ts-expect-error
    delete window.location as {}
    window.location = {
      ...window.location,
      href: '/',
    }

    const updateAtProfileButton = screen.getByText(/alterar no perfil/i)

    userEvent.click(updateAtProfileButton)

    expect(
      window.location.href.includes('portaldecliente/conquista/perfil?r=true')
    ).toBeTruthy()
  })
})
