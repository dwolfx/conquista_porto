import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import theme from 'styles/theme'

import ManagementConsortiumVehicle from 'pages/ConsortiumVehicle/Management'

const INITIAL_STATE = {
  consortiumVehicle: {
    data: [
      {
        Id: 1,
        Cota: 500,
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

it('ManagementConsortiumVehicle renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ManagementConsortiumVehicle history={{ push: () => {} }} />
        </ThemeProvider>
      </Provider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
