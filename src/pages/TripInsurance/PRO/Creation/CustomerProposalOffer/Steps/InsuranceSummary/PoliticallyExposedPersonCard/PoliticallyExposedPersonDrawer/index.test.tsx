import React from 'react'
import { renderWithReduxAndTheme, screen, act } from 'testUtils'
import { storeFactory } from 'setupTests'
import userEvent from '@testing-library/user-event'

import PoliticallyExposedPersonDrawer from './index'

import * as t from '../../types'

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

const setup = (initialState: {}) => {
  const store = storeFactory(initialState)
  return renderWithReduxAndTheme(
    <PoliticallyExposedPersonDrawer isOpen handleClose={() => {}} />,
    { store, container: createRootContainer() }
  )
}

describe('PoliticallyExposedPersonDrawer component', () => {
  it('should exists', () => {
    expect(PoliticallyExposedPersonDrawer).toBeDefined()
  })
  it('should render Title', () => {
    setup(defaultStore)
    expect(
      screen.getByText(/Alterar pessoa politicamente exposta/i)
    ).toBeDefined()
  })
  it('should render input with kinship value', () => {
    setup(defaultStore)
    expect(screen.getByTestId('select-option-input-undefined')).toHaveValue(
      'Companheiro(a)'
    )
  })
  it('should render input with name value', () => {
    setup(defaultStore)
    expect(screen.getByTestId('nome completo')).toHaveValue(
      'Nome Pessoa Exposta'
    )
  })
  it('should render input with CPF value', () => {
    setup(defaultStore)
    expect(screen.getByTestId('cpf')).toHaveValue('000.000.001-91')
  })
  it('should render Radio options', () => {
    setup(defaultStore)

    const firstOption = screen.getByLabelText(/sim/i)
    const secondOption = screen.getByLabelText(/não/i)

    expect(firstOption).toBeChecked()

    userEvent.click(secondOption)

    expect(secondOption).toBeChecked()

    userEvent.click(firstOption)

    expect(firstOption).toBeChecked()
  })
  it(`should not render inputs if it's not a exposed person`, () => {
    const store = storeFactory({
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
        isLoading: false,
      },
      fluxManagement: {
        stack: [],
        form: {
          pessoaExposta: {
            nome: '',
            numeroCpf: '',
            digitoCpf: '',
            grauRelacionamento: 2,
            grauParentesco: 0,
          },
        },
      },
    })

    renderWithReduxAndTheme(
      <PoliticallyExposedPersonDrawer isOpen handleClose={() => {}} />,
      { store, container: createRootContainer() }
    )

    const secondOption = screen.getByLabelText(/não/i)

    expect(secondOption).toBeChecked()
  })
  describe('Buttons tests', () => {
    it(`should trigger modal 'close' button`, () => {
      const store = storeFactory({})

      const handleClose = jest.fn()

      renderWithReduxAndTheme(
        <PoliticallyExposedPersonDrawer isOpen handleClose={handleClose} />,
        { store, container: createRootContainer() }
      )

      act(() => window.resizeTo(400, 600))

      const closeButton = screen.getByText(/close/i)
      userEvent.click(closeButton)
      expect(handleClose).toHaveBeenCalled()
    })
    it(`should trigger drawer 'close' button`, () => {
      const handleClose = jest.fn()

      renderWithReduxAndTheme(
        <PoliticallyExposedPersonDrawer isOpen handleClose={handleClose} />,
        { container: createRootContainer() }
      )
      const closeButton = screen.getByText(/close/i)
      userEvent.click(closeButton)
      expect(handleClose).toHaveBeenCalled()
    })
    it(`should trigger drawer 'salvar alterações' button`, () => {
      const store = storeFactory(defaultStore)
      const handleClose = jest.fn()

      renderWithReduxAndTheme(
        <PoliticallyExposedPersonDrawer isOpen handleClose={handleClose} />,
        { store, container: createRootContainer() }
      )
      userEvent.click(
        screen.getByRole('button', {
          name: /SALVAR ALTERAÇÕES/i,
        })
      )

      expect(handleClose).toHaveBeenCalled()
    })
  })

  it('should render modal', () => {
    window.resizeTo(400, 600)

    setup(defaultStore)

    act(() => window.resizeTo(400, 600))

    expect(
      screen.getByText(/Alterar pessoa politicamente exposta/i)
    ).toBeDefined()
  })
  it('should render modal with loading state', () => {
    window.resizeTo(400, 600)

    setup({
      customerProfile: {
        data: {},
        isLoading: true,
      },
      fluxManagement: {
        stack: [],
        form: {
          pessoaExposta: {
            nome: '',
            numeroCpf: '',
            digitoCpf: '',
            grauRelacionamento: 2,
            grauParentesco: 0,
          },
        },
      },
    })

    act(() => window.resizeTo(400, 600))

    expect(
      screen.getByText(/aguarde, estamos buscando suas informações.../i)
    ).toBeDefined()
  })
})
