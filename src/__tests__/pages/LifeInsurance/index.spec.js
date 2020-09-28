import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import theme from 'styles/theme'
import LifeInsurance from 'pages/LifeInsurance'

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/seguro-vida',
    search: '',
    hash: '',
    state: null,
    key: '0987654321',
  }),
}))

const waitForComponentToPaint = async () => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
  })
}

it('LifeInsurance renders correctly', () => {
  const wrapper = render(
    <ThemeProvider theme={theme}>
      <LifeInsurance />
    </ThemeProvider>
  )

  waitForComponentToPaint()

  expect(wrapper).toMatchSnapshot()
})
