import React from 'react'
import renderer from 'react-test-renderer'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { ThemeProvider } from 'styled-components'
import theme from '../../../styles/theme'

import SectionOne from '../../../pages/Home/SectionOne'

const INITIAL_STATE = {
  auth: {
    cpf: '11111111111',
  },
  vehicleFinancing: {
    data: {},
    hasError: false,
    isLoading: false,
  },
  creditCard: {
    data: {},
    hasError: false,
    isLoading: false,
  },
  consortiumVehicle: {
    data: {},
    hasError: false,
    isLoading: false,
  },
  consortiumBuilding: {
    data: {},
    hasError: false,
    isLoading: false,
  },
  consolidatedPosition: {
    data: {},
    hasError: false,
    isLoading: false,
  },
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

const handleFetchInvestments = () => {}

// REF: https://thoughtbot.com/blog/mocking-react-components-with-jest
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useHistory: () => [],
}))

jest.mock('../../../pages/Home/InvestmentSection', () => ({
  __esModule: true,
  default: () => [],
}))

jest.mock('../../../pages/Home/ProductItemGenerator.js', () => ({
  __esModule: true,
  default: () => [],
}))

describe('SectionOne', () => {
  it('Renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <SectionOne onFetchInvestments={handleFetchInvestments} />
          </ThemeProvider>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
