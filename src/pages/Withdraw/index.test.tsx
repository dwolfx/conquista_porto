import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { storeFactory } from 'setupTests'
import { renderWithReduxAndTheme } from 'testUtils'

import WithdrawFlow from './index'

describe('Withdraw flow', () => {
  it('should start with 2 loadings on screen, input and next button disabled', () => {
    const store = storeFactory({
      withdraw: {
        hasErrorDetails: false,
        isLoadingDetails: true,
        detailsData: {},
        hasErrorSummary: false,
        isLoadingSummary: false,
        summaryData: {},
      },
    })

    let portalRoot = document.getElementById('root')

    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }

    renderWithReduxAndTheme(
      <MemoryRouter>
        <WithdrawFlow />
      </MemoryRouter>,
      { store, container: portalRoot }
    )

    expect(screen.queryByTestId('loading-spinner')).toBeDefined()
    expect(screen.queryByTestId('loading-bar')).toBeDefined()
    expect(screen.queryByRole('button', { name: 'Próximo' })).toBeDisabled()
  })
})
