import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'

import PoliticallyExposedPersonCard from '.'

const defaultStore: {
  fluxManagement: { stack: React.ReactElement[]; form: {} }
} = {
  fluxManagement: {
    stack: [],
    form: {
      pessoaExposta: {
        nome: 'Nome Pessoa Exposta',
        numeroCpf: '000000001',
        digitoCpf: '91',
        grauRelacionamento: 1,
        grauParentesco: 1,
      },
    },
  },
}

describe('PoliticallyExposedPersonCard component', () => {
  it('should exists', () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(<PoliticallyExposedPersonCard />, {
      store,
    })
    expect(PoliticallyExposedPersonCard).toBeDefined()
  })
  it(`should render 'Não' if is not an exposed person`, () => {
    const store = storeFactory({
      fluxManagement: {
        stack: [],
        form: {
          pessoaExposta: {
            grauRelacionamento: 2,
          },
        },
      },
    })
    renderWithReduxAndTheme(<PoliticallyExposedPersonCard />, {
      store,
    })

    expect(screen.getByText(/Não/i)).toBeDefined()
  })
  it(`should render error`, () => {
    const store = storeFactory({
      fluxManagement: {
        stack: [],
        form: {
          pessoaExposta: {
            nome: '',
            numeroCpf: '',
            digitoCpf: '',
            grauRelacionamento: 0,
            grauParentesco: 0,
          },
        },
      },
    })
    renderWithReduxAndTheme(<PoliticallyExposedPersonCard />, {
      store,
    })

    expect(screen.getByText('Não preenchido')).toBeDefined()
  })
})
