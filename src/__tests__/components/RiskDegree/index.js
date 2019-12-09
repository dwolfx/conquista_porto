import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import RiskDegree from 'components/RiskDegree'

describe('RiskDegree', () => {
  it('RiskDegree to render without any active colors', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <RiskDegree />
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('RiskDegree to render with active colors', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <RiskDegree actives={[1, 2]} />
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
