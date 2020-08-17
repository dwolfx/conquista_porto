import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import theme from 'styles/theme'

import CreditCard from '../../../pages/CreditCard'

const INITIAL_STATE = {}

const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

it('CreditCard renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <CreditCard />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
