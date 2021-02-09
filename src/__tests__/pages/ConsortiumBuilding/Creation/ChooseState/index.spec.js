import React from 'react'
import renderer, { act } from 'react-test-renderer'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import theme from 'styles/theme'
import ChooseState from 'pages/ConsortiumBuilding/Creation/ChooseState'
import consortiumBuildingStates from 'mocks/consortiumBuildingStates.json'

const INITIAL_STATE = {
  consortiumBuildingStates: {
    data: consortiumBuildingStates,
    isLoading: false,
    hasError: false,
  },
  fluxManagement: { stack: [], form: {} },
}
const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

beforeAll(() => {
  ReactDOM.createPortal = jest.fn(element => element)
})

afterEach(() => {
  ReactDOM.createPortal.mockClear()
})
it('ChooseState - Consortium Building - renders correctly', () => {
  let root

  act(() => {
    root = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <ChooseState />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    )
  })

  expect(root.toJSON()).toMatchSnapshot()
})
