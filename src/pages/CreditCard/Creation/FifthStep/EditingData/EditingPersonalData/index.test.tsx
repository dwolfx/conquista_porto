import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
import userEvent from '@testing-library/user-event'

import EditingPersonalData from '.'

import * as t from './types'

const defaultStore = {
  customerProfile: {
    data: {
      customerEmail: 'email@sciensa.com.br',
      cpfCnpj: '88888888888',
      customerBirthdate: '1989-06-29T00:00:00-03:00',
      customerAreaCode: '11',
      customerPhoneNumber: '997257249',
    },
  },
}

const formData = {
  personalData: {
    email: 'teste@email.com',
    CPF: '99999999999',
    birthDate: '1989-06-29T00:00:00-03:00',
    phone: '11999999999',
    documentType: 'Passaporte',
    documentNumber: '99888877x',
    effectiveDate: '2020-06-20T00:00:00-03:00',
    issuingBody: 'SSP/SP',
    city: 'Rio de Janeiro',
    civilStatus: 'solteiro',
    gender: 'feminino',
    profession: 'arquiteto',
    mothersName: 'Dona Florinda',
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

const setup = (initialState: t.ICustomerProfile) => {
  const store = storeFactory(initialState)
  return renderWithReduxAndTheme(
    <EditingPersonalData
      isOpen
      handleClose={() => {}}
      formData={formData}
      setFormData={() => {}}
    />,
    { store, container: createRootContainer() }
  )
}

describe('EditingPersonalData component', () => {
  it('should exists', () => {
    expect(EditingPersonalData).toBeDefined()
  })
  it('should render Title', () => {
    const { getByText } = renderWithReduxAndTheme(
      <EditingPersonalData
        isOpen
        handleClose={() => {}}
        formData={formData}
        setFormData={() => {}}
      />,
      { container: createRootContainer() }
    )

    expect(getByText(/alterar dados pessoais/i)).toBeDefined()
  })
  it('should render customer data', () => {
    const { getByText } = setup(defaultStore)

    expect(getByText(/e-mail/i)).toBeDefined()
    expect(getByText(/email@sciensa\.com\.br/i)).toBeDefined()
    expect(getByText(/cpf/i)).toBeDefined()
    expect(getByText(/888.888.888-88/i)).toBeDefined()
    expect(getByText(/data de nascimento/i)).toBeDefined()
    expect(getByText(/29\/06\/1989/i)).toBeDefined()
    expect(getByText(/celular/i)).toBeDefined()
    expect(getByText(/\(11\) 9 9725-7249/i)).toBeDefined()
  })
  describe('Buttons tests', () => {
    it(`should trigger 'ALTERAR NO PERFIL' button`, () => {
      setup(defaultStore)

      //@ts-expect-error
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
    it(`should trigger 'SALVAR ALTERAÇÕES' button`, () => {
      const handleClose = jest.fn()
      const setFormData = jest.fn()

      const store = storeFactory(defaultStore)
      renderWithReduxAndTheme(
        <EditingPersonalData
          isOpen
          handleClose={handleClose}
          formData={formData}
          setFormData={setFormData}
        />,
        {
          store,
          container: createRootContainer(),
        }
      )

      const saveButton = screen.getByRole('button', {
        name: /SALVAR ALTERAÇÕES/i,
      })
      userEvent.click(saveButton)

      expect(handleClose).toHaveBeenCalled()
      expect(setFormData).toHaveBeenCalled()
    })
    it(`should trigger 'close' button`, () => {
      const handleClose = jest.fn()

      const store = storeFactory(defaultStore)
      renderWithReduxAndTheme(
        <EditingPersonalData
          isOpen
          handleClose={handleClose}
          formData={formData}
          setFormData={() => {}}
        />,
        {
          store,
          container: createRootContainer(),
        }
      )

      const closeButton = screen.getByText(/close/i)
      userEvent.click(closeButton)

      expect(handleClose).toHaveBeenCalled()
    })
  })
  it('should render loading state', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <EditingPersonalData
        isOpen
        handleClose={() => {}}
        formData={formData}
        setFormData={() => {}}
      />,
      { container: createRootContainer() }
    )

    expect(getByTestId(/loading-bar/i)).toBeDefined()
  })
  describe('Text inputs tests', () => {
    it('should render cityInput correctly', () => {
      setup(defaultStore)

      const cityInput = screen.getByTestId('cidade')
      // @ts-expect-error:
      cityInput.setSelectionRange(0, 14)
      userEvent.type(cityInput, '{backspace}Natal')
      expect(cityInput).toHaveValue('Natal')
    })
    it('should render motherNameInput correctly', () => {
      setup(defaultStore)

      const cityInput = screen.getByTestId('nome da mãe')
      // @ts-expect-error:
      cityInput.setSelectionRange(0, 28)
      userEvent.type(cityInput, '{backspace}Bruxa do 71')
      expect(cityInput).toHaveValue('Bruxa do 71')
    })
    it('should render inputs without formData', () => {
      const store = storeFactory(defaultStore)
      renderWithReduxAndTheme(
        <EditingPersonalData
          isOpen
          handleClose={() => {}}
          formData={{}}
          setFormData={() => {}}
        />,
        { store, container: createRootContainer() }
      )

      const cityInput = screen.getByTestId('cidade')
      expect(cityInput).toHaveValue('São Paulo')

      const motherNameInput = screen.getByTestId('nome da mãe')
      expect(motherNameInput).toHaveValue('')
    })
  })
  it('should render modal', () => {
    window.resizeTo(400, 600)

    const { getByText } = setup(defaultStore)

    expect(getByText(/alterar dados pessoais/i)).toBeDefined()
  })
})
