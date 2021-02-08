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
          dataNascimento: '31/05/2000',
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
}

describe('CompanionInfoCard component', () => {
  it('should exists', () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(<CompanionInfoCard />, {
      store,
    })
    expect(CompanionInfoCard).toBeDefined()
  })
  it(`should render companion name`, () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(<CompanionInfoCard />, {
      store,
    })

    expect(screen.getByText('Nome Acompanhante 1')).toBeDefined()
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
              email: '',
              dataNascimento: '',
              sexo: '',
              numeroCpf: '',
              digitoCpf: '',
              isResidePais: false,
              celularDDD: '',
              celularNumero: '',
              contato: {
                nome: '',
                celularDDD: '',
                celularNumero: '',
              },
              endereco: {
                tipo: '',
                logradouro: '',
                bairro: '',
                cidade: '',
                uf: '',
                complemento: '',
                numero: '',
                numeroCep: '',
                complementoCep: '',
              },
              numeroCpfResponsavel: '',
              digitoCpfResponsavel: '',
              codigoPaisResidente: '',
            },
          ],
        },
      },
    })
    renderWithReduxAndTheme(<CompanionInfoCard />, {
      store,
    })

    expect(screen.getByText('Não preenchido')).toBeDefined()
  })
  it(`should render error if form is empty`, () => {
    const store = storeFactory({
      fluxManagement: {
        stack: [],
        form: {
          acompanhantes: [{}],
        },
      },
    })
    renderWithReduxAndTheme(<CompanionInfoCard />, {
      store,
    })

    expect(screen.getByText('Não preenchido')).toBeDefined()
  })
})
