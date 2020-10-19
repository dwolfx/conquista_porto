import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { renderWithReduxAndTheme } from 'testUtils'
import ExtractMovimentFund from '.'
import { IExtractFund } from './types'
import { MemoryRouter } from 'react-router-dom'

describe('ExtractMovimentFund component', () => {
  const fund: IExtractFund[] = [
    {
      transaction_date: '01/01/2020',
      transaction_type: 'INVEST',
      value: 9000,
      transaction_status: 'DONE',
      processed_transaction_date: '01/01/2020',
    },
  ]

  it('should be render', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <MemoryRouter>
        <ExtractMovimentFund extractFund={fund} />
      </MemoryRouter>
    )

    expect(getByTestId('ExtractMovimentFund')).toBeTruthy()
  })
})
