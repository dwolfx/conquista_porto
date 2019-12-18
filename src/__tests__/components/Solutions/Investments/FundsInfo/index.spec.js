import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import FundsInfo from '../../../../../components/Solutions/Investments/FundsInfo'

it('FundsInfo renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <FundsInfo />
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
