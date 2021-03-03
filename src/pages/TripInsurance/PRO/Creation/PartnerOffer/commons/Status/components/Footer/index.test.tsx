import React from 'react'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import theme from 'styles/theme'

import BottomNavigationContent from '.'

describe('BottomNavigationContent component', () => {
  it('should exists', () => {
    renderWithReduxAndTheme(
      <ThemeProvider theme={theme}>
        <BottomNavigationContent />
      </ThemeProvider>
    )
    expect(screen.getByTestId('footer')).toBeVisible()
  })

  it('should have buttons', () => {
    renderWithReduxAndTheme(
      <ThemeProvider theme={theme}>
        <BottomNavigationContent />
      </ThemeProvider>
    )

    expect(screen.getByText('Início')).toBeVisible()
    expect(screen.getByText('Funil de vendas')).toBeVisible()
  })
})
