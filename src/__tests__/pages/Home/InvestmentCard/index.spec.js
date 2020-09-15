import React from 'react'
import renderer from 'react-test-renderer'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import InvestmentCard from 'pages/Home/InvestmentCard'

const INITIAL_STATE = {
  bankData: {
    data: {},
    hasError: false,
    isLoading: false,
  },
  suitabilityInfo: {
    data: {},
    hasError: false,
    isLoading: false,
  },
  consolidatedPosition: {
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

describe('InvestmentCard', () => {
  it('Renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <InvestmentCard />
          </ThemeProvider>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
