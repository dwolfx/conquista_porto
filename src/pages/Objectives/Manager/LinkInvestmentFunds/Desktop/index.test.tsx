import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { renderWithReduxAndTheme } from 'testUtils'
import LinkInvestmentFunds from '.'
import { ILinkableFunds } from '../types'
import { MemoryRouter } from 'react-router-dom'

describe('LinkInvestmentFunds Desktop component', () => {
  const funds: ILinkableFunds[] = []

  it('should be render', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <MemoryRouter>
        <LinkInvestmentFunds funds={funds} />
      </MemoryRouter>
    )

    expect(getByTestId('linkInvestmentFunds')).toBeTruthy()
  })
})
