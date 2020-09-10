import React from 'react'

import { renderWithReduxAndTheme } from 'testUtils'
import { storeFactory } from 'setupTests'

import InsuranceCard from '.'

// REF: https://thoughtbot.com/blog/mocking-react-components-with-jest
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useHistory: () => [],
}))

const defaultStore = {
  lifeInsurance: {
    data: [
      {
        codigoFormaPagamento: '97',
        CoberturasBasicas: {
          CoberturaBasica: {
            CapitalSegurado: '1319626.71',
            Nome: 'MORTE ACIDENTAL',
          },
        },
      },
    ],
    hasError: false,
    isLoading: false,
  },
  tripInsurance: {
    data: [
      {
        codigoFormaPagamento: '62',
        CoberturasBasicas: {
          CoberturaBasica: [
            {
              CapitalSegurado: '30000.00',
              Nome: 'DESPESAS MEDICO HOSPITALARES E ODONTOLÓGICAS',
            },
            {
              CapitalSegurado: '100000.00',
              Nome: 'MORTE ACIDENTAL',
            },
          ],
        },
      },
      {
        codigoFormaPagamento: '62',
        CoberturasBasicas: {
          CoberturaBasica: [
            {
              CapitalSegurado: '10000.00',
              Nome: 'DESPESAS MEDICO HOSPITALARES E ODONTOLÓGICAS',
            },
            {
              CapitalSegurado: '80000.00',
              Nome: 'MORTE ACIDENTAL',
            },
          ],
        },
      },
      {
        codigoFormaPagamento: '62',
        CoberturasBasicas: {
          CoberturaBasica: [
            {
              CapitalSegurado: '15000.00',
              Nome: 'DESPESAS MEDICO HOSPITALARES E ODONTOLÓGICAS',
            },
            {
              CapitalSegurado: '100000.00',
              Nome: 'MORTE ACIDENTAL',
            },
          ],
        },
      },
      {
        codigoFormaPagamento: '62',
        CoberturasBasicas: {
          CoberturaBasica: [
            {
              CapitalSegurado: '10000.00',
              Nome: 'DESPESAS MEDICO HOSPITALARES E ODONTOLÓGICAS',
            },
            {
              CapitalSegurado: '80000.00',
              Nome: 'MORTE ACIDENTAL',
            },
          ],
        },
      },
      {
        codigoFormaPagamento: '62',
        CoberturasBasicas: {
          CoberturaBasica: [
            {
              CapitalSegurado: '10000.00',
              Nome: 'DESPESAS MEDICO HOSPITALARES E ODONTOLÓGICAS',
            },
            {
              CapitalSegurado: '80000.00',
              Nome: 'MORTE ACIDENTAL',
            },
          ],
        },
      },
      {
        codigoFormaPagamento: '62',
        CoberturasBasicas: {
          CoberturaBasica: [
            {
              CapitalSegurado: '10000.00',
              Nome: 'DESPESAS MEDICO HOSPITALARES E ODONTOLÓGICAS',
            },
            {
              CapitalSegurado: '80000.00',
              Nome: 'MORTE ACIDENTAL',
            },
          ],
        },
      },
      {
        codigoFormaPagamento: '97',
        CoberturasBasicas: {
          CoberturaBasica: [
            {
              CapitalSegurado: '10000.00',
              Nome: 'DESPESAS MEDICO HOSPITALARES E ODONTOLÓGICAS',
            },
            {
              CapitalSegurado: '80000.00',
              Nome: 'MORTE ACIDENTAL',
            },
          ],
        },
      },
    ],
    hasError: false,
    isLoading: false,
  },
}

const setup = (initialState: any = defaultStore) => {
  const store = storeFactory(initialState)

  return renderWithReduxAndTheme(<InsuranceCard />, { store })
}

describe('InsuranceCard', () => {
  it('should be render without errors', () => {
    const { getByText } = setup()
    expect(getByText('Seguros')).toBeDefined()
  })
})
