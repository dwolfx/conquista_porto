import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import theme from 'styles/theme'

import ManagementCreditCard from '../../../../pages/CreditCard/Management'

const INITIAL_STATE = {
  data: [],
}
const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

it('ManagementCreditCard renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ManagementCreditCard history={{ push: () => {} }} />
        </ThemeProvider>
      </Provider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
