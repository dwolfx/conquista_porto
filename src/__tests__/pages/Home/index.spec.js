import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import theme from 'styles/theme'

import Home from 'pages/Home'

// REF: https://thoughtbot.com/blog/mocking-react-components-with-jest
jest.mock('pages/Home/SectionOne.js', () => ({
  __esModule: true,
  default: () => <div></div>,
}))

jest.mock('pages/Home/SectionTwo.js', () => ({
  __esModule: true,
  default: () => <div></div>,
}))

jest.mock('pages/Home/AdvertisementBanner.js', () => ({
  __esModule: true,
  default: () => <div></div>,
}))

jest.mock('pages/Home/PointsSection', () => ({
  __esModule: true,
  default: () => <div></div>,
}))

const INITIAL_STATE = {
  auth: {
    cpf: '11111111111',
  },
  points: {
    data: {},
    isLoading: false,
  },
  suitability: {
    data: {},
    isLoading: false,
  },
  objective: {
    objectives: [],
    hasError: false,
    isLoadingList: false,
  },
}

const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

const location = {
  state: {
    scrollGoal: false,
  },
}

describe('Home', () => {
  it('Renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <MemoryRouter>
              <Home location={location} />
            </MemoryRouter>
          </ThemeProvider>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
