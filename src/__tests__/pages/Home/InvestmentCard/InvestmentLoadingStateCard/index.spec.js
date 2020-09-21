import React from 'react'
import renderer from 'react-test-renderer'

import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import InvestmentLoadingStateCard from 'pages/Home/InvestmentCard/InvestmentLoadingStateCard'

// REF: https://thoughtbot.com/blog/mocking-react-components-with-jest
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useHistory: () => [],
}))

describe('Home', () => {
  describe('InvestmentCard', () => {
    describe('InvestmentLoadingStateCard', () => {
      it('Renders correctly', () => {
        const tree = renderer
          .create(
            <ThemeProvider theme={theme}>
              <InvestmentLoadingStateCard />
            </ThemeProvider>
          )
          .toJSON()
        expect(tree).toMatchSnapshot()
      })
    })
  })
})
