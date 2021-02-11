import React from 'react'
import { renderWithReduxAndTheme, screen, act } from 'testUtils'
import { storeFactory } from 'setupTests'
import userEvent from '@testing-library/user-event'

import EditClientDataDrawer from './index'

const defaultStore = {
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
    <EditClientDataDrawer isOpen handleClose={() => {}} />,
    { store, container: createRootContainer() }
  )
}

describe('EditClientDataDrawer component', () => {
  it('should exists', () => {
    expect(EditClientDataDrawer).toBeDefined()
  })
  it('should render Title', () => {
    setup(defaultStore)
    expect(screen.getByText(/alterar dados do contratante/i)).toBeDefined()
  })
  it('should render Name', () => {
    setup(defaultStore)
    expect(screen.getByText(/nome/i)).toBeDefined()
    expect(screen.getByText(/rubao/i)).toBeDefined()
  })
  it('should render CPF', () => {
    setup(defaultStore)
    expect(screen.getByText(/cpf/i)).toBeDefined()
    expect(screen.getByText(/362.753.128-07/i)).toBeDefined()
  })
  it('should render Birth date', () => {
    setup(defaultStore)
    expect(screen.getByText(/data de nascimento/i)).toBeDefined()
    expect(screen.getByText(/11\/11\/1981/i)).toBeDefined()
  })
  it(`should render 'Masculino'`, () => {
    setup(defaultStore)
    expect(screen.getByText(/sexo/i)).toBeDefined()
    expect(screen.getByText(/masculino/i)).toBeDefined()
  })
  it(`should render 'Feminino'`, () => {
    const storeMock = {
      customerProfile: {
        ...defaultStore.customerProfile,
        data: {
          ...defaultStore.customerProfile.data,
          customerGender: 'F',
        },
      },
    }

    setup(storeMock)
    expect(screen.getByText(/sexo/i)).toBeDefined()
    expect(screen.getByText(/feminino/i)).toBeDefined()
  })
  it('should render Radio options', () => {
    setup(defaultStore)

    const firstOption = screen.getByLabelText(/sim/i)
    const secondOption = screen.getByLabelText(/não/i)

    expect(secondOption).toBeChecked()

    userEvent.click(firstOption)

    expect(firstOption).toBeChecked()

    userEvent.click(secondOption)

    expect(secondOption).toBeChecked()
  })
  describe('Buttons tests', () => {
    it(`should trigger 'ALTERAR NO PERFIL' button`, () => {
      setup(defaultStore)

      // @ts-expect-error
      delete window.location
      window.location = {
        ...window.location,
        href: '/',
      }

      const updateAtProfileButton = screen.getByRole('button', {
        name: /alterar no perfil/i,
      })
      userEvent.click(updateAtProfileButton)

      expect(
        window.location.href.includes('portaldecliente/conquista/perfil?r=true')
      ).toBeTruthy()
    })
    it(`should trigger modal 'close' button`, () => {
      const store = storeFactory({})

      const handleClose = jest.fn()

      renderWithReduxAndTheme(
        <EditClientDataDrawer isOpen handleClose={handleClose} />,
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
        <EditClientDataDrawer isOpen handleClose={handleClose} />,
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
        <EditClientDataDrawer isOpen handleClose={handleClose} />,
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

    expect(screen.getByText(/alterar dados do contratante/i)).toBeDefined()
  })
  it('should render modal with loading state', () => {
    window.resizeTo(400, 600)

    setup({
      customerProfile: {
        data: {},
        isLoading: true,
      },
    })

    act(() => window.resizeTo(400, 600))

    expect(
      screen.getByText(/aguarde, estamos buscando suas informações.../i)
    ).toBeDefined()
  })
})
