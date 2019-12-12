import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import ManagementConsortiumBuilding from '../../../../pages/ConsortiumBuilding/Management'

it('ManagementConsortiumBuilding renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <ManagementConsortiumBuilding history={{ push: () => {} }} />
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
