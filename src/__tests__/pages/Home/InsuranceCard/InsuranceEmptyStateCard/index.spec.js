import React from 'react'
import renderer from 'react-test-renderer'

import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import {
  LifeInsuranceEmptyStateCard,
  TripInsuranceEmptyStateCard,
} from 'pages/Home/InsuranceCard/InsuranceEmptyStateCard'

// REF: https://thoughtbot.com/blog/mocking-react-components-with-jest
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useHistory: () => [],
}))

describe('InsuranceCard', () => {
  describe('LifeInsuranceEmptyStateCard', () => {
    it('Renders correctly', () => {
      const tree = renderer
        .create(
          <ThemeProvider theme={theme}>
            <LifeInsuranceEmptyStateCard />
          </ThemeProvider>
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
  describe('TripInsuranceEmptyStateCard', () => {
    it('Renders correctly', () => {
      const tree = renderer
        .create(
          <ThemeProvider theme={theme}>
            <TripInsuranceEmptyStateCard />
          </ThemeProvider>
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
