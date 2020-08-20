import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'
import LifeInsurance from 'pages/LifeInsurance'

const waitForComponentToPaint = async wrapper => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
    wrapper.update()
  })
}

it('LifeInsurance renders correctly', () => {
  const wrapper = renderer.create(
    <ThemeProvider theme={theme}>
      <LifeInsurance />
    </ThemeProvider>
  )

  waitForComponentToPaint(wrapper)

  expect(wrapper.toJSON()).toMatchSnapshot()
})
