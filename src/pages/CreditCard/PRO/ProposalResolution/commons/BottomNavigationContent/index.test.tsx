import React from 'react'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { render } from 'testUtils'
import theme from 'styles/theme'

import BottomNavigationContent from '.'

describe('BottomNavigationContent component', () => {
  it('should be exists', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <BottomNavigationContent />
      </ThemeProvider>
    )
    expect(getByTestId('bottomNavigationContent')).toBeVisible()
  })

  it('should have buttons', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <BottomNavigationContent />
      </ThemeProvider>
    )

    expect(getByText('Início')).toBeVisible()
    expect(getByText('Funil de vendas')).toBeVisible()
  })
})
