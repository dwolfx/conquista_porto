import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
import userEvent from '@testing-library/user-event'

import AddressCard from '.'

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    document.body.appendChild(container)
  }
  return container
}

const defaultStore: {
  fluxManagement: { stack: React.ReactElement[]; form: {} }
} = {
  fluxManagement: {
    stack: [],
    form: {
      passageiroPrincipal: {
        endereco: {
          tipo: 'Rua',
          logradouro: 'Rua Augusta',
          bairro: 'Penha',
          cidade: 'São Paulo',
          uf: 'SP',
          complemento: '',
          numero: '123A',
          numeroCep: '01419',
          complementoCep: '001',
        },
      },
    },
  },
}

describe('AddressCard component', () => {
  it('should exists', () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(<AddressCard setHasEmptyData={() => {}} />, {
      store,
      container: createRootContainer(),
    })
    expect(AddressCard).toBeDefined()
  })
  it(`should render 'complemento' value`, () => {
    const store = storeFactory({
      fluxManagement: {
        stack: [],
        form: {
          passageiroPrincipal: {
            endereco: {
              tipo: 'Rua',
              logradouro: 'Rua Augusta',
              bairro: 'Penha',
              cidade: 'São Paulo',
              uf: 'SP',
              complemento: 'teste',
              numero: '123A',
              numeroCep: '01419',
              complementoCep: '001',
            },
          },
        },
      },
    })
    renderWithReduxAndTheme(<AddressCard setHasEmptyData={() => {}} />, {
      store,
      container: createRootContainer(),
    })

    expect(
      screen.getByText('Rua Augusta, 123A - teste - Penha - São Paulo - SP')
    ).toBeDefined()
  })
  it(`should trigger drawer`, () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(<AddressCard setHasEmptyData={() => {}} />, {
      store,
      container: createRootContainer(),
    })

    const button = screen.getByText('ALTERAR')
    userEvent.click(button)
    userEvent.click(screen.getByText('close.svg'))
    userEvent.click(button)

    expect(screen.getAllByText('Alterar endereço')).toBeDefined()
  })
})
