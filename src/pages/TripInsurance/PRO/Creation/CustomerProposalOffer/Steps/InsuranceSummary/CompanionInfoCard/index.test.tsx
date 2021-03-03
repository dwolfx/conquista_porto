import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'

import CompanionInfoCard from '.'

const defaultStore: {
  fluxManagement: { stack: React.ReactElement[]; form: {} }
} = {
  fluxManagement: {
    stack: [],
    form: {
      acompanhantes: [
        {
          nome: 'Nome Acompanhante 1',
          email: 'email@acompanhante1.com',
          dataNascimento: '31/05/1990',
          sexo: 'F',
          numeroCpf: '111111111',
          digitoCpf: '22',
          isResidePais: true,
          celularDDD: '11',
          celularNumero: '987985465',
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
          id: 1,
          status: true,
          numeroCpfResponsavel: '111111111',
          digitoCpfResponsavel: '22',
          codigoPaisResidente: '28',
          pessoaExposta: {
            nome: 'Nome Pessoa Exposta',
            numeroCpf: '000000001',
            digitoCpf: '91',
            grauRelacionamento: 1,
            grauParentesco: 1,
          },
        },
        {
          nome: 'Nome Acompanhante 2',
          email: 'email@acompanhante2.com',
          dataNascimento: '31/05/1930',
          sexo: 'M',
          numeroCpf: '111111111',
          digitoCpf: '22',
          isResidePais: true,
          celularDDD: '11',
          celularNumero: '987985465',
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
          id: 2,
          status: true,
          numeroCpfResponsavel: '111111111',
          digitoCpfResponsavel: '22',
          codigoPaisResidente: '28',
          pessoaExposta: {
            nome: 'Nome Pessoa Exposta',
            numeroCpf: '000000001',
            digitoCpf: '91',
            grauRelacionamento: 1,
            grauParentesco: 1,
          },
        },
      ],
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

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    document.body.appendChild(container)
  }
  return container
}

describe('CompanionInfoCard component', () => {
  it('should exists', () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(<CompanionInfoCard />, {
      store,
      container: createRootContainer(),
    })
    expect(CompanionInfoCard).toBeDefined()
  })
  it(`should render the name of companions that the age is less or equal than 70`, () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(<CompanionInfoCard />, {
      store,
      container: createRootContainer(),
    })
    expect(screen.getByText('Nome Acompanhante 1')).toBeDefined()
  })
  it(`should render the name of companions that the age is more than 70`, () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(<CompanionInfoCard isCompanionOverSeventy />, {
      store,
      container: createRootContainer(),
    })
    expect(screen.getByText('Nome Acompanhante 2')).toBeDefined()
  })
  it(`should render error`, () => {
    const store = storeFactory({
      fluxManagement: {
        stack: [],
        form: {
          acompanhantes: [
            {
              nome: '',
              email: 'email@acompanhante1.com',
              dataNascimento: '31/05/1990',
              sexo: 'F',
              numeroCpf: '',
              digitoCpf: '',
              isResidePais: true,
              celularDDD: '11',
              celularNumero: '987985465',
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
              id: 1,
              status: true,
              numeroCpfResponsavel: '111111111',
              digitoCpfResponsavel: '22',
              codigoPaisResidente: '28',
              pessoaExposta: {
                nome: 'Nome Pessoa Exposta',
                numeroCpf: '000000001',
                digitoCpf: '91',
                grauRelacionamento: 1,
                grauParentesco: 1,
              },
            },
          ],
        },
      },
    })
    renderWithReduxAndTheme(<CompanionInfoCard />, {
      store,
      container: createRootContainer(),
    })
    expect(screen.getByText('Não preenchido')).toBeDefined()
  })
})
