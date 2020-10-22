import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'

import FirstStep from './'
import userEvent from '@testing-library/user-event'

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

const setup = (initialState: t.ICustomerProfile) => {
  const store = storeFactory(initialState)
  return renderWithReduxAndTheme(<FirstStep onNextStep={() => {}} />, { store })
}

describe('CreditCard FirstStep tests', () => {
  it('should exists', () => {
    expect(FirstStep).toBeDefined()
  })
  it('should render Title', () => {
    const { getByText } = renderWithReduxAndTheme(
      <FirstStep onNextStep={() => {}} />
    )

    expect(getByText(/confirme as informações abaixo/i)).toBeDefined()
  })
  describe('Test user data', () => {
    it('should render E-mail', () => {
      const { getByText } = setup(defaultStore)

      expect(getByText(/e-mail/i)).toBeDefined()
      expect(getByText(/email@sciensa\.com\.br/i)).toBeDefined()
    })
    it('should render CPF', () => {
      const { getByText } = setup(defaultStore)

      expect(getByText(/cpf/i)).toBeDefined()
      expect(getByText(/888.888.888-88/i)).toBeDefined()
    })
    it('should render Data de Nascimento', () => {
      const { getByText } = setup(defaultStore)

      expect(getByText(/data de nascimento/i)).toBeDefined()
      expect(getByText(/29\/06\/1989/i)).toBeDefined()
    })
    it('should render Celular', () => {
      const { getByText } = setup(defaultStore)

      expect(getByText(/celular/i)).toBeDefined()
      expect(getByText(/\(11\) 9 9725-7249/i)).toBeDefined()
    })
  })
  describe('Test buttons', () => {
    it(`should trigger 'ALTERAR NO PERFIL' button`, () => {
      renderWithReduxAndTheme(<FirstStep onNextStep={() => {}} />)

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
    it(`should trigger 'CONFIRMAR' button`, () => {
      const onNextStepMock = jest.fn()
      renderWithReduxAndTheme(<FirstStep onNextStep={onNextStepMock} />)

      const confirmButton = screen.getByRole('button', { name: /confirmar/i })
      userEvent.click(confirmButton)
      expect(onNextStepMock).toHaveBeenCalled()
    })
  })
  it('should render footer text', () => {
    const { getByText } = renderWithReduxAndTheme(
      <FirstStep onNextStep={() => {}} />
    )

    expect(
      getByText(
        /não se preocupe, a solicitação só será enviada após informarmos o cartão disponível para você./i
      )
    ).toBeDefined()
  })
})
