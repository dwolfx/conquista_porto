import React from 'react'
import renderer from 'react-test-renderer'

import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import InvestmentErrorStateCard from 'pages/Home/InvestmentCard/InvestmentErrorStateCard'

// REF: https://thoughtbot.com/blog/mocking-react-components-with-jest
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useHistory: () => [],
}))

describe('InvestmentCard', () => {
  describe('InvestmentErrorStateCard', () => {
    it('Renders correctly', () => {
      const tree = renderer
        .create(
          <ThemeProvider theme={theme}>
            <InvestmentErrorStateCard onRetry={() => {}} />
          </ThemeProvider>
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
