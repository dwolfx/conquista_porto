import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
import userEvent from '@testing-library/user-event'

import PoliticallyExposedPersonCard from '.'

import * as t from '../types'

const defaultStore: {
  fluxManagement: { stack: React.ReactElement[]; form: {} }
  customerProfile: t.ICustomerProfileState
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
  customerProfile: {
    data: {
      cpfCnpj: '36275312807',
      customerName: 'Rubao',
      customerEmail: 'ricardo.eufrasio@portoseguro.com.br',
      customerState: 'SP',
      customerBirthdate: '1981-11-11T00:00:00-03:00',
      customerPhoneNumber: '996229303',
      customerAreaCode: '11',
      customerGender: 'M',
    },
    status: '',
    isLoading: false,
    hasError: false,
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

describe('PoliticallyExposedPersonCard component', () => {
  it('should exists', () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(<PoliticallyExposedPersonCard />, {
      store,
      container: createRootContainer(),
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
      container: createRootContainer(),
    })

    expect(screen.getByRole('heading', { name: /Não/i })).toBeDefined()
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
      container: createRootContainer(),
    })

    expect(screen.getByText('Não preenchido')).toBeDefined()
  })
  it(`should trigger drawer`, () => {
    const store = storeFactory({
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
      customerProfile: {
        data: {
          cpfCnpj: '36275312807',
          customerName: 'Rubao',
          customerEmail: 'ricardo.eufrasio@portoseguro.com.br',
          customerState: 'SP',
          customerBirthdate: '1981-11-11T00:00:00-03:00',
          customerPhoneNumber: '996229303',
          customerAreaCode: '11',
          customerGender: 'M',
        },
        status: '',
        isLoading: false,
        hasError: false,
      },
    })
    renderWithReduxAndTheme(<PoliticallyExposedPersonCard />, {
      store,
      container: createRootContainer(),
    })

    const button = screen.getByText('ALTERAR')
    userEvent.click(button)

    expect(
      screen.getAllByText('Alterar pessoa politicamente exposta')
    ).toBeDefined()

    expect(screen.getByTestId('cpf')).toHaveValue('000.000.001-91')
    expect(screen.getByTestId('nome completo')).toHaveValue(
      'Nome Pessoa Exposta'
    )
    expect(screen.getByTestId('select-option-input-undefined')).toHaveValue(
      'Companheiro(a)'
    )

    userEvent.click(screen.getByText('close.svg'))
  })
})
