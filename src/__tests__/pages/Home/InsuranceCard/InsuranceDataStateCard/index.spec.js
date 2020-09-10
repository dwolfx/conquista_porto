import React from 'react'
import renderer from 'react-test-renderer'

import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import {
  LifeInsuranceDataStateCard,
  TripInsuranceDataStateCard,
} from 'pages/Home/InsuranceCard/InsuranceDataStateCard'

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

describe('InsuranceCard', () => {
  describe('LifeInsuranceDataStateCard', () => {
    it('Renders correctly', () => {
      const tree = renderer
        .create(
          <ThemeProvider theme={theme}>
            <LifeInsuranceDataStateCard
              data={defaultStore.lifeInsurance.data[0]}
            />
          </ThemeProvider>
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
  describe('TripInsuranceDataStateCard', () => {
    it('Renders correctly', () => {
      const tree = renderer
        .create(
          <ThemeProvider theme={theme}>
            <TripInsuranceDataStateCard
              data={defaultStore.tripInsurance.data[0]}
            />
          </ThemeProvider>
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
