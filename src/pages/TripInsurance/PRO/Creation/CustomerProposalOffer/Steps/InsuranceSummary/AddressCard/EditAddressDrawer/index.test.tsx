import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import EditAddressDrawer from './index'
import { storeFactory } from 'setupTests'

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    document.body.appendChild(container)
  }
  return container
}

const defaultStore = {
  fluxManagement: {
    form: {
      passageiroPrincipal: {
        nome: 'Nome Passageiro Principal',
        email: 'email@principal.com',
        dataNascimento: '20/12/1980',
        sexo: 'M',
        numeroCpf: '000000001',
        digitoCpf: '91',
        isResidePais: true,
        celularDDD: '11',
        celularNumero: '965543221',
        contato: {
          nome: 'Contato Do Passageiro Principal',
          celularDDD: '11',
          celularNumero: '932216554',
        },
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

const setup = (initialState: {}) => {
  const store = storeFactory(initialState)
  return renderWithReduxAndTheme(
    <EditAddressDrawer isOpen handleClose={() => {}} />,
    { store, container: createRootContainer() }
  )
}

describe('Address drawer component', () => {
  it('should exists', () => {
    expect(EditAddressDrawer).toBeDefined()
  })

  it('should be show the address data on input', () => {
    setup(defaultStore)

    const {
      numeroCep,
      complementoCep,
      cidade,
      bairro,
      logradouro,
      uf,
      numero,
    } = defaultStore.fluxManagement.form.passageiroPrincipal.endereco
    const cep = `${numeroCep}-${complementoCep}`

    expect(screen.getByDisplayValue(cep)).toBeVisible()
    expect(screen.getByDisplayValue(cidade)).toBeVisible()
    expect(screen.getByDisplayValue(bairro)).toBeVisible()
    expect(screen.getByDisplayValue(logradouro)).toBeVisible()
    expect(screen.getByDisplayValue(uf)).toBeVisible()
    expect(screen.getByDisplayValue(numero)).toBeVisible()
  })

  it('Button should be enabled', () => {
    setup(defaultStore)
    expect(screen.getByText('SALVAR ALTERAÇÕES')).not.toBeDisabled()
  })

  it('Button should be disabled when at least one required input is empty', () => {
    const storeMock = {
      fluxManagement: {
        ...defaultStore.fluxManagement,
        form: {
          ...defaultStore.fluxManagement.form,
          passageiroPrincipal: {
            ...defaultStore.fluxManagement.form.passageiroPrincipal,
            endereco: {
              ...defaultStore.fluxManagement.form.passageiroPrincipal.endereco,
              bairro: '',
            },
          },
        },
      },
    }
    setup(storeMock)
    expect(
      screen.getByText('SALVAR ALTERAÇÕES').closest('button')
    ).toBeDisabled()
  })
})
