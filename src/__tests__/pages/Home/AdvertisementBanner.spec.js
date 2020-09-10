import React from 'react'
import renderer from 'react-test-renderer'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'
import AdvertisementBanner from 'pages/Home/AdvertisementBanner'
import { tipsBanner } from 'pages/Home/bannerData'

const INITIAL_STATE = {
  auth: {
    cpf: '11111111111',
  },
  rewardsRecommendations: {
    data: tipsBanner[0],
  },
}

const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

// REF: https://thoughtbot.com/blog/mocking-react-components-with-jest
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useHistory: () => [],
}))

describe('AdvertisementBanner', () => {
  it('Renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <AdvertisementBanner />
          </ThemeProvider>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
