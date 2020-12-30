import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { renderWithReduxAndTheme } from 'testUtils'
import ExtractMovimentFund from '.'
import { IFundExtract } from 'store/modules/ObjectiveManagement/types'
import { MemoryRouter } from 'react-router-dom'

describe('ExtractMovimentFund component', () => {
  const fund: IFundExtract[] = [
    {
      value: 1000,
      transaction_date: '20/10/2020',
      transaction_type: 'Transferência entre objetivos',
      transaction_status: 'Efetivado',
      processed_transaction_date: '20/10/2020',
    },
    {
      value: 1000,
      transaction_date: '20/10/2020',
      transaction_type: 'Resgate do fundo',
      transaction_status: 'Efetivado',
      processed_transaction_date: '20/10/2020',
    },
    {
      value: 1000,
      transaction_date: '15/10/2020',
      transaction_type: 'Vinculo ao Objetivo',
      transaction_status: 'Efetivado',
      processed_transaction_date: '15/10/2020',
    },
    {
      value: -100,
      transaction_date: '20/10/2020',
      transaction_type: 'Transferência entre objetivos',
      transaction_status: 'Efetivado',
      processed_transaction_date: '20/10/2020',
    },
    {
      value: 1000,
      transaction_date: '20/10/2020',
      transaction_type: 'Transferência entre objetivos',
      transaction_status: 'Efetivado',
      processed_transaction_date: '20/10/2020',
    },
    {
      value: 1000,
      transaction_date: '20/10/2020',
      transaction_type: 'Resgate do fundo',
      transaction_status: 'Efetivado',
      processed_transaction_date: '20/10/2020',
    },
    {
      value: 1000,
      transaction_date: '15/10/2020',
      transaction_type: 'Vinculo ao Objetivo',
      transaction_status: 'Efetivado',
      processed_transaction_date: '15/10/2020',
    },
    {
      value: -100,
      transaction_date: '20/10/2020',
      transaction_type: 'Transferência entre objetivos',
      transaction_status: 'Efetivado',
      processed_transaction_date: '20/10/2020',
    },
  ]

  it('should be render', () => {
    const handleClose = jest.fn()
    const { getByTestId } = renderWithReduxAndTheme(
      <MemoryRouter>
        <ExtractMovimentFund
          extractFund={fund}
          onSuccess={handleClose}
          fundId={1}
          objectiveId="1"
          isLoading={false}
        />
      </MemoryRouter>
    )

    expect(getByTestId('ExtractMovimentFund')).toBeTruthy()
  })
})
