import React from 'react'
import renderer from 'react-test-renderer'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import InsuranceCard from 'pages/Home/InsuranceCard'

const INITIAL_STATE = {
  lifeInsurance: {
    data: {},
    hasError: false,
    isLoading: false,
  },
  tripInsurance: {
    data: {},
    hasError: false,
    isLoading: false,
  },
}

const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

// REF: https://thoughtbot.com/blog/mocking-react-components-with-jest
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useHistory: () => [],
}))

describe('InsuranceCard', () => {
  it('Renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <InsuranceCard />
          </ThemeProvider>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
