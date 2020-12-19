import React from 'react'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import theme from 'styles/theme'

import ProposalResolutionFail from '.'

describe('ProposalResolutionFail component', () => {
  it('should be exists', () => {
    renderWithReduxAndTheme(
      <ThemeProvider theme={theme}>
        <ProposalResolutionFail />
      </ThemeProvider>
    )

    expect(screen.getByTestId('proposalResolutionFail')).toBeVisible()
  })

  it('should have content', () => {
    renderWithReduxAndTheme(
      <ThemeProvider theme={theme}>
        <ProposalResolutionFail />
      </ThemeProvider>
    )

    expect(
      screen.getByText('Não foi possível enviar a proposta.')
    ).toBeVisible()
    expect(
      screen.getByText('Tente novamente mais tarde, por favor.')
    ).toBeVisible()
  })
})
