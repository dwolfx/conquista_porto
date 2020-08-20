import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import theme from 'styles/theme'
import LifeInsuranceManagement from 'pages/LifeInsurance/Management'
import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

const INITIAL_STATE = {
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
        Beneficiarios: {
          Beneficiario: [
            {
              Percentual: '50',
              Nome: 'LAURA PASQUARELLI GARRASTAZU',
            },
            {
              Percentual: '50',
              Nome: 'LORENZO PASQUARELLI GARRASTAZU',
            },
          ],
        },
        DtFinalVigencia: '2020-11-25-03:00',
        GruposCobertura: {
          GrupoCobertura: [
            {
              CoberturasRisco: {
                CoberturaRisco: [
                  {
                    CapitalSegurado: '1319626.71',
                    Nome: 'Morte',
                  },
                  {
                    CapitalSegurado: '3235.32',
                    Nome: 'Assistência Funeral - Familiar',
                  },
                ],
              },
              Nome: 'Equilíbrio Financeiro Familiar',
            },
            {
              CoberturasRisco: {
                CoberturaRisco: {
                  CapitalSegurado: '12000.00',
                  Nome: 'Capitalização',
                },
              },
              Nome: 'Outros',
            },
            {
              CoberturasRisco: {
                CoberturaRisco: [
                  {
                    CapitalSegurado: '1319626.71',
                    Nome: 'Antecipação Especial por Doença',
                  },
                  {
                    CapitalSegurado: '1319626.71',
                    Nome: 'Invalidez Permanente Total ou Parcial por Acidente',
                  },
                ],
              },
              Nome: 'Imprevistos',
            },
          ],
        },
        Sucursal: '1',
        parcelas: {
          parcela: [
            {
              numero: '1',
              valor: '612.73',
            },
            {
              numero: '2',
              valor: '612.73',
            },
            {
              numero: '3',
              valor: '612.73',
            },
            {
              numero: '4',
              valor: '612.73',
            },
            {
              numero: '5',
              valor: '612.73',
            },
            {
              numero: '6',
              valor: '612.73',
            },
            {
              numero: '7',
              valor: '612.73',
            },
            {
              numero: '8',
              valor: '612.73',
            },
            {
              numero: '9',
              valor: '612.73',
            },
            {
              numero: '10',
              valor: '612.73',
            },
            {
              numero: '11',
              valor: '612.73',
            },
          ],
        },
        Ramo: '1391',
        DtInicioVigencia: '2019-11-26-03:00',
        Nome: 'Trianual - Vida e Acidentes Pessoais Individual',
        NomeSegurado: 'FERNANDA HAYDEE PASQUARELLI',
        Apolice: {
          LinkDownload:
            'http://vidanova/servicosvida/obterApolice?param=MSwxMzkxLDEzNTgwMSw1OCwzMzQ4MDA3',
        },
        descricaoFormaPagamento: 'CARTAO PORTO SEGURO',
      },
    ],
  },
}
const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

const waitForComponentToPaint = async () => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
  })
}

beforeAll(() => {
  // eslint-disable-next-line no-unused-vars
  ReactDOM.createPortal = jest.fn((element, node) => element)
})

afterEach(() => {
  ReactDOM.createPortal.mockClear()
})

it('LifeInsurance/Management renders correctly', () => {
  const wrapper = render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <LifeInsuranceManagement />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )

  waitForComponentToPaint()

  expect(wrapper).toMatchSnapshot()
})
