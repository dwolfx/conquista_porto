import React from 'react'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { render } from 'testUtils'
import theme from 'styles/theme'

import ProposalResolutionSuccess from '.'

describe('ProposalResolutionSuccess component', () => {
  it('should be exists', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ProposalResolutionSuccess />
      </ThemeProvider>
    )
    expect(getByTestId('proposalResolutionSuccess')).toBeVisible()
  })

  it('should have content', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ProposalResolutionSuccess />
      </ThemeProvider>
    )
    expect(getByText('Proposta enviada com sucesso')).toBeVisible()
  })
})
