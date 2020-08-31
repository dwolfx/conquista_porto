import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
// import LifeInsurance from 'pages/LifeInsurance/Management'

it('LifeInsurance renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        {/* <LifeInsurance history={{ push: () => {} }} /> */}
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
