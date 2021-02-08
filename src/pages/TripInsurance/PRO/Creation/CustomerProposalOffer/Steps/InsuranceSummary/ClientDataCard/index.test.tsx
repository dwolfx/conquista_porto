import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
// import userEvent from '@testing-library/user-event'

import ClientDataCard from '.'
import userEvent from '@testing-library/user-event'

const defaultStore: {
  fluxManagement: { stack: React.ReactElement[]; form: {} }
} = {
  fluxManagement: {
    stack: [],
    form: {
      passageiroPrincipal: {
        nome: 'Nome Passageiro Principal',
        numeroCpf: '000000001',
        digitoCpf: '91',
        dataNascimento: '20/12/1980',
        sexo: 'M',
        isResidePais: true,
      },
    },
  },
}

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    document.body.appendChild(container)
  }
  return container
}

describe('ClientDataCard component', () => {
  it('should exists', () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(<ClientDataCard />, {
      store,
      container: createRootContainer(),
    })
    expect(ClientDataCard).toBeDefined()
  })
  it(`should render error`, () => {
    const store = storeFactory({
      fluxManagement: {
        stack: [],
        form: {
          passageiroPrincipal: {
            nome: '',
            numeroCpf: '',
            digitoCpf: '',
            dataNascimento: '',
            sexo: '',
            isResidePais: false,
          },
        },
      },
    })
    renderWithReduxAndTheme(<ClientDataCard />, {
      store,
      container: createRootContainer(),
    })

    expect(screen.getAllByText('Não preenchido')).toHaveLength(5)
  })
  it(`should render 'Feminino'`, () => {
    const store = storeFactory({
      fluxManagement: {
        stack: [],
        form: {
          passageiroPrincipal: {
            nome: '',
            numeroCpf: '',
            digitoCpf: '',
            dataNascimento: '',
            sexo: 'F',
            isResidePais: false,
          },
        },
      },
    })
    renderWithReduxAndTheme(<ClientDataCard />, {
      store,
      container: createRootContainer(),
    })

    expect(screen.getAllByText('Feminino')).toBeDefined()
  })
  it(`should trigger drawer`, () => {
    const store = storeFactory({
      fluxManagement: {
        stack: [],
        form: {
          passageiroPrincipal: {
            nome: '',
            numeroCpf: '',
            digitoCpf: '',
            dataNascimento: '',
            sexo: '',
            isResidePais: false,
          },
        },
      },
    })
    renderWithReduxAndTheme(<ClientDataCard />, {
      store,
      container: createRootContainer(),
    })

    const button = screen.getByText('ALTERAR')
    userEvent.click(button)

    expect(screen.getAllByText('Alterar dados do contratante')).toBeDefined()

    userEvent.click(screen.getByText('close.svg'))
  })
})
