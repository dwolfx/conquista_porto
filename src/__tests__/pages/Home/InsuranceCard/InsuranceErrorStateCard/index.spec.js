import React from 'react'
import renderer from 'react-test-renderer'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import {
  LifeInsuranceErrorStateCard,
  TripInsuranceErrorStateCard,
} from 'pages/Home/InsuranceCard/InsuranceErrorStateCard'

const INITIAL_STATE = {
  lifeInsurance: {
    data: {},
    hasError: true,
    isLoading: false,
  },
  tripInsurance: {
    data: {},
    hasError: true,
    isLoading: false,
  },
}

const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

describe('InsuranceCard', () => {
  describe('LifeInsuranceErrorStateCard', () => {
    it('Renders correctly', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <LifeInsuranceErrorStateCard />
            </ThemeProvider>
          </Provider>
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
  describe('TripInsuranceErrorStateCard', () => {
    it('Renders correctly', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <TripInsuranceErrorStateCard />
            </ThemeProvider>
          </Provider>
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
