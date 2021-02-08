import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'

import AddressCard from '.'

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
    renderWithReduxAndTheme(<AddressCard />, {
      store,
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
    renderWithReduxAndTheme(<AddressCard />, {
      store,
    })

    expect(
      screen.getByText('Rua Augusta, 123A - teste - Penha - São Paulo - SP')
    ).toBeDefined()
  })
})
