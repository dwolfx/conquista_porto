import React from 'react'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import theme from 'styles/theme'

import ProposalResolutionSuccess from '.'

describe('ProposalResolutionSuccess component', () => {
  it('should be exists', () => {
    renderWithReduxAndTheme(
      <ThemeProvider theme={theme}>
        <ProposalResolutionSuccess customerName="Felipe Silva" />
      </ThemeProvider>
    )
    expect(screen.getByTestId('proposalResolutionSuccess')).toBeVisible()
  })

  it('should have content', () => {
    renderWithReduxAndTheme(
      <ThemeProvider theme={theme}>
        <ProposalResolutionSuccess customerName="Felipe Silva" />
      </ThemeProvider>
    )
    expect(screen.getByText('Proposta enviada com sucesso')).toBeVisible()
  })
})
