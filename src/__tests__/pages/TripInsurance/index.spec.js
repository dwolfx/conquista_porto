import React from 'react'
import renderer, { act } from 'react-test-renderer'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import theme from 'styles/theme'

import TripInsurance from 'pages/TripInsurance'

const INITIAL_STATE = {}
const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

const waitForComponentToPaint = async wrapper => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
    wrapper.update()
  })
}

it('TripInsurance renders correctly', () => {
  const wrapper = renderer.create(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <TripInsurance />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )

  waitForComponentToPaint(wrapper)

  expect(wrapper.toJSON()).toMatchSnapshot()
})
