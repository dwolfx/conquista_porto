import React from 'react'
import renderer, { act } from 'react-test-renderer'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import theme from 'styles/theme'

import ConsortiumVehicle from 'pages/ConsortiumVehicle'

const INITIAL_STATE = {}
const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

it('ConsortiumVehicle renders correctly', () => {
  let root

  act(() => {
    root = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <ConsortiumVehicle />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    )
  })

  expect(root.toJSON()).toMatchSnapshot()
})
