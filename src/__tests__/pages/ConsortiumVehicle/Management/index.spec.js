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
        id: 1,
        cota: 650,
        descricao: 'string',
        descricaoBem: 'string',
        grupo: 'x381',
        pontosGanhos: 0,
        quantidadeParcelasContratadas: 10,
        quantidadeParcelasPagas: 2,
        statusConsorcio: 'Contemplado',
        urlProposta: 'string',
        valorContratado: 40000,
        valorPago: 0,
        valorParcelaAtual: 675,
        valorQuitacao: 27200,
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
