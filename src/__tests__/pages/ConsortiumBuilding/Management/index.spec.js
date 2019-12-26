import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import theme from 'styles/theme'

import ManagementConsortiumBuilding from 'pages/ConsortiumBuilding/Management'

const INITIAL_STATE = {
  consortiumBuilding: {
    data: [
      {
        id: 1,
        cota: 300,
        descricao: 'string',
        descricaoBem: 'string',
        grupo: 'x398',
        pontosGanhos: 0,
        quantidadeParcelasContratadas: 12,
        quantidadeParcelasPagas: 9,
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

it('ManagementConsortiumBuilding renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ManagementConsortiumBuilding history={{ push: () => {} }} />
        </ThemeProvider>
      </Provider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
