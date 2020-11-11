import React from 'react'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { render, RenderResult } from 'testUtils'
import theme from 'styles/theme'

import ProposalResolutionFail from '.'

describe('ProposalResolutionFail component', () => {
  it('should be exists', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ProposalResolutionFail />
      </ThemeProvider>
    )

    expect(getByTestId('proposalResolutionFail')).toBeVisible()
  })

  it('should have content', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ProposalResolutionFail />
      </ThemeProvider>
    )

    expect(getByText('Não foi possível enviar a proposta.')).toBeVisible()
    expect(getByText('Tente novamente mais tarde, por favor.')).toBeVisible()
  })
})
