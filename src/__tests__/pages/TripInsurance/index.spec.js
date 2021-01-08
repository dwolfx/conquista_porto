import React from 'react'
import ReactDOM from 'react-dom'
import renderer, { act } from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import theme from 'styles/theme'

import TripInsurance from 'pages/TripInsurance'

const INITIAL_STATE = {
  fluxManagement: { stack: [], form: {} },
}
const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

beforeAll(() => {
  // eslint-disable-next-line no-unused-vars
  ReactDOM.createPortal = jest.fn((element, node) => element)
})

afterEach(() => {
  ReactDOM.createPortal.mockClear()
})

it('TripInsurance renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <TripInsurance />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
