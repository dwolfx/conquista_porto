import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import ManagementCreditCard from '../../../../pages/CreditCard/Management'

it('ManagementCreditCard renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <ManagementCreditCard history={{ push: () => {} }} />
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
