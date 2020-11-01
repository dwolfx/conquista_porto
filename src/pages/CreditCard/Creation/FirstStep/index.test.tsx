import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'

import FirstStep from './'
import userEvent from '@testing-library/user-event'

interface IDefaultStore {
  creditCard: {
    clientData: {
      cpfCnpj: string
      dataNascimento: string
      dddNumeroTelefone: number
      emailCliente: string
      numeroTelefone: number
    },
    isClientDataLoading: boolean
  }
}
const defaultStore: IDefaultStore = {
  creditCard: {
    clientData: {
      cpfCnpj: '00000000191',
      dataNascimento: '1987-11-25T00:00:00-03:00',
      dddNumeroTelefone: 11,
      emailCliente: 'blablabla@whiskas.com',
      numeroTelefone: 40028922,
    },
    isClientDataLoading: false
  },
}

const setup = (initialState: IDefaultStore) => {
  const store = storeFactory(initialState)
  return renderWithReduxAndTheme(<FirstStep onNextStep={() => {}} />, { store })
}

describe('CreditCard FirstStep tests', () => {
  it('should exists', () => {
    expect(FirstStep).toBeDefined()
  })
  it('should render Title', () => {
    setup(defaultStore)

    expect(screen.getByText(/confirme as informações abaixo/i)).toBeDefined()
  })
  it('should show Loading', () => {
    const mockStore = {
      creditCard: {
        clientData: null,
        isClientDataLoading: true,
      }
    }

    const store = storeFactory(mockStore)
    renderWithReduxAndTheme(<FirstStep onNextStep={() => {}} />, { store })

    expect(screen.getByTestId('loading-bar')).toBeDefined()
  })

  describe('Test user data', () => {
    it('should render E-mail', () => {
      const { getByText } = setup(defaultStore)

      expect(getByText(/e-mail/i)).toBeDefined()
      expect(getByText(/blablabla@whiskas\.com/i)).toBeDefined()
    })
    it(`should render 'CPF' field and value`, () => {
      const { getByText } = setup(defaultStore)

      expect(getByText(/cpf/i)).toBeDefined()
      expect(getByText(/000.000.001-91/i)).toBeDefined()
    })
    it(`should render 'Data de Nascimento' field and value`, () => {
      const { getByText } = setup(defaultStore)

      expect(getByText(/data de nascimento/i)).toBeDefined()
      expect(getByText(/25\/11\/1987/i)).toBeDefined()
    })
    it(`should render 'Celular' field and value with 8 numbers`, () => {
      const { getByText } = setup(defaultStore)

      expect(getByText(/celular/i)).toBeDefined()
      expect(getByText(/\(11\) 4002-8922/i)).toBeDefined()
    })
    it(`should render 'Celular' field and value with 9 numbers`, () => {
      const storeMock: IDefaultStore = {
        creditCard: {
          clientData: {
            cpfCnpj: '00000000191',
            dataNascimento: '1987-11-25T00:00:00-03:00',
            dddNumeroTelefone: 11,
            emailCliente: 'blablabla@whiskas.com',
            numeroTelefone: 940028922,
          },
          isClientDataLoading: false
        },
      }

      const store = storeFactory(storeMock)
      const { getByText } = renderWithReduxAndTheme(
        <FirstStep onNextStep={() => {}} />,
        { store }
      )

      expect(getByText(/celular/i)).toBeDefined()
      expect(getByText(/\(11\) 9 4002-8922/i)).toBeDefined()
    })
  })
  it('should render footer text', () => {
    setup(defaultStore)

    expect(
      screen.getByText(
        /não se preocupe, a solicitação só será enviada após informarmos o cartão disponível para você./i
      )
    ).toBeDefined()
  })
  describe('Buttons tests', () => {
    it(`should trigger 'ALTERAR NO PERFIL' button`, () => {
      const mockStore = {
        creditCard: {
          clientData: {
            cpfCnpj: '00000000191',
            dataNascimento: '1987-11-25T00:00:00-03:00',
            dddNumeroTelefone: 11,
            emailCliente: 'blablabla@whiskas.com',
            numeroTelefone: 40028922,
          },
          isClientDataLoading: false,
        }
      }

      const store = storeFactory(mockStore)
      renderWithReduxAndTheme(<FirstStep onNextStep={() => {}} />, { store })

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
    it(`should trigger 'CONFIRMAR' button`, () => {
      const onNextStepMock = jest.fn()
      const mockStore = {
        creditCard: {
          clientData: {
            cpfCnpj: '00000000191',
            dataNascimento: '1987-11-25T00:00:00-03:00',
            dddNumeroTelefone: 11,
            emailCliente: 'blablabla@whiskas.com',
            numeroTelefone: 40028922,
            codigoEstadoCivil: 1,
            numeroDocumento: 123,
            nomeCliente: 'Jose',
          },
          isClientDataLoading: false,
        }
      }

      const store = storeFactory(mockStore)
      renderWithReduxAndTheme(<FirstStep onNextStep={onNextStepMock} />, { store })

      const confirmButton = screen.getByRole('button', { name: /confirmar/i })

      userEvent.click(confirmButton)

      expect(confirmButton).toBeEnabled()
    })
  })
})
