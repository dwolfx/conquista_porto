import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import ManagementConsortiumVehicle from '../../../../pages/ConsortiumVehicle/Management'

it('ManagementConsortiumVehicle renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <ManagementConsortiumVehicle history={{ push: () => {} }} />
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
