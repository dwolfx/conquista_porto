import React from 'react'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import theme from 'styles/theme'

import ManagementConsortiumBuilding from 'pages/ConsortiumBuilding/Management'

const INITIAL_STATE = {
  consortiumBuilding: {
    data: [
      {
        Id: 1,
        Cota: 300,
        Descricao: 'string',
        DescricaoBem: 'string',
        Grupo: 'x398',
        PontosGanhos: 0,
        QuantidadeParcelasContratadas: 12,
        QuantidadeParcelasPagas: 9,
        StatusConsorcio: 'Contemplado',
        UrlProposta: 'string',
        ValorContratado: 40000,
        ValorPago: 0,
        ValorParcelaAtual: 675,
        ValorQuitacao: 27200,
      },
    ],
  },
}
const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

it('ManagementConsortiumBuilding renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <ManagementConsortiumBuilding history={{ push: () => {} }} />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
