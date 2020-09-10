import React from 'react'
import renderer from 'react-test-renderer'

import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import {
  LifeInsuranceLoadingStateCard,
  TripInsuranceLoadingStateCard,
} from 'pages/Home/InsuranceCard/InsuranceLoadingStateCard'

describe('InsuranceCard', () => {
  describe('LifeInsuranceLoadingStateCard', () => {
    it('Renders correctly', () => {
      const tree = renderer
        .create(
          <ThemeProvider theme={theme}>
            <LifeInsuranceLoadingStateCard />
          </ThemeProvider>
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
  describe('TripInsuranceLoadingStateCard', () => {
    it('Renders correctly', () => {
      const tree = renderer
        .create(
          <ThemeProvider theme={theme}>
            <TripInsuranceLoadingStateCard />
          </ThemeProvider>
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
