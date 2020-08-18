import React from 'react'
import renderer from 'react-test-renderer'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { ThemeProvider } from 'styled-components'
import theme from '../../../styles/theme'

import SectionTwo from '../../../pages/Home/SectionTwo'

const INITIAL_STATE = {
  auth: {
    cpf: '11111111111',
  },
  objective: {
    objectives: {},
    isLoadingList: true,
    hasError: false,
    isLoading: false,
  },
  suitability: { isLoading: true },
}

beforeEach(() => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789)
})

afterEach(() => {
  jest.spyOn(global.Math, 'random').mockRestore()
})
// global.Math.random = () => 0.5

const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

const onRedirect = () => {}

// REF: https://thoughtbot.com/blog/mocking-react-components-with-jest
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useHistory: () => [],
}))

jest.mock('../../../pages/Home/InvestmentSection', () => ({
  __esModule: true,
  default: () => [],
}))

describe('SectionOne', () => {
  it('Renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <SectionTwo onRedirect={onRedirect} />
          </ThemeProvider>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
