import React from 'react'
import { renderWithReduxAndTheme, screen, act } from 'testUtils'
import { storeFactory } from 'setupTests'
import userEvent from '@testing-library/user-event'

import ContactInfoAccidentsCaseDrawer from './index'

const defaultStore: {
  fluxManagement: { stack: React.ReactElement[]; form: {} }
} = {
  fluxManagement: {
    stack: [],
    form: {
      passageiroPrincipal: {
        contato: {
          nome: 'Contato Do Passageiro Principal',
          celularDDD: '88',
          celularNumero: '944443333',
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

const setup = (initialState: {}) => {
  const store = storeFactory(initialState)
  return renderWithReduxAndTheme(
    <ContactInfoAccidentsCaseDrawer isOpen handleClose={() => {}} />,
    { store, container: createRootContainer() }
  )
}

describe('ContactInfoAccidentsCaseDrawer component', () => {
  it('should exists', () => {
    expect(ContactInfoAccidentsCaseDrawer).toBeDefined()
  })
  it('should render Title', () => {
    setup(defaultStore)
    expect(
      screen.getByText(/Alterar contato em caso de acidente/i)
    ).toBeDefined()
  })
  it('should render input with name value', () => {
    setup(defaultStore)
    expect(screen.getByTestId('nome')).toHaveValue(
      'Contato Do Passageiro Principal'
    )
  })
  it('should update input name value', () => {
    setup(defaultStore)

    const NameInput = screen.getByTestId('nome') as HTMLInputElement
    NameInput.setSelectionRange(0, 32)
    userEvent.type(NameInput, '{backspace}Novo Nome Teste')

    expect(NameInput).toHaveValue('Novo Nome Teste')
  })
  it('should render input with phone number value', () => {
    setup(defaultStore)
    expect(screen.getByTestId('telefone')).toHaveValue('(88) 9 4444-3333')
  })
  it('should update input phone number value', () => {
    setup(defaultStore)

    const NameInput = screen.getByTestId('telefone') as HTMLInputElement
    NameInput.setSelectionRange(0, 16)
    userEvent.type(NameInput, '{backspace}12345678901')

    expect(NameInput).toHaveValue('(12) 3 4567-8901')
  })
  it('should render inputs with empty value', () => {
    const defaultStore: {
      fluxManagement: { stack: React.ReactElement[]; form: {} }
    } = {
      fluxManagement: {
        stack: [],
        form: {
          passageiroPrincipal: {},
        },
      },
    }
    setup(defaultStore)
    expect(screen.getByTestId('nome')).toHaveValue('')
    expect(screen.getByTestId('telefone')).toHaveValue('')
  })
  it('should trigger error input with invalid phone number', () => {
    setup(defaultStore)

    const phoneNumberInput = screen.getByTestId('telefone') as HTMLInputElement
    phoneNumberInput.setSelectionRange(0, 16)
    userEvent.type(phoneNumberInput, '{backspace}12345678')

    userEvent.tab()

    expect(screen.getByText('Telefone Inválido.')).toBeDefined()
  })
  describe('Buttons tests', () => {
    it(`should trigger modal 'close' button`, () => {
      const store = storeFactory({})
      const handleClose = jest.fn()
      renderWithReduxAndTheme(
        <ContactInfoAccidentsCaseDrawer isOpen handleClose={handleClose} />,
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
        <ContactInfoAccidentsCaseDrawer isOpen handleClose={handleClose} />,
        { container: createRootContainer() }
      )
      const closeButton = screen.getByText(/close/i)
      userEvent.click(closeButton)
      expect(handleClose).toHaveBeenCalled()
    })
    it(`should trigger 'salvar alterações' button`, () => {
      const store = storeFactory(defaultStore)
      const handleClose = jest.fn()
      renderWithReduxAndTheme(
        <ContactInfoAccidentsCaseDrawer isOpen handleClose={handleClose} />,
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
      screen.getByText(/Alterar contato em caso de acidente/i)
    ).toBeDefined()
  })
})
