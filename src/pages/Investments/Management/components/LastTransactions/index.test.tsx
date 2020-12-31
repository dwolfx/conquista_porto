import React from 'react'
import { MemoryRouter, Route, RouteProps } from 'react-router-dom'

import {
  GetLastTransactionDataSuccess,
  GetLastTransactionDataFailure,
} from 'store/modules/Investment/LastTransaction/action'
import ITransaction from 'store/modules/Investment/LastTransaction/iTransaction'
import { renderWithReduxAndTheme, fireEvent, screen } from 'testUtils'
import { storeFactory } from 'setupTests'

import LastTransations from '.'

const renderWithProviders = (customStore?: any) => {
  let locationLocal: RouteProps['location']
  return renderWithReduxAndTheme(
    <MemoryRouter initialEntries={['/investimentos/visualizar']}>
      <LastTransations />
      <Route
        path="*"
        render={({ location }) => {
          locationLocal = location
          return null
        }}
      />
    </MemoryRouter>,
    { store: customStore }
  )
}

describe('LastTransactions', () => {
  describe('Error Retry', () => {
    it('should render the error component when request has failed', () => {
      const store = storeFactory()
      const { getByTestId } = renderWithProviders(store)

      store.dispatch(GetLastTransactionDataFailure())
      expect(getByTestId('lasttransations-error-component')).toBeInTheDocument()
    })
    it('should retry the request and get loading again', () => {
      const store = storeFactory({ investmentPosition: { idFund: '1' } })
      const { getByTestId, getByText } = renderWithProviders(store)
      store.dispatch(GetLastTransactionDataFailure())
      expect(getByTestId('lasttransations-error-component')).toBeInTheDocument()

      fireEvent.click(getByText('Tentar novamente'))
      expect(
        getByTestId('lasttransations-loading-component')
      ).toBeInTheDocument()
    })
  })
  describe('Loading state', () => {
    it('should render the loading component when request has started', () => {
      const store = storeFactory({ investmentPosition: { idFund: '1' } })
      const { getByTestId } = renderWithProviders(store)
      expect(
        getByTestId('lasttransations-loading-component')
      ).toBeInTheDocument()
    })
  })
})
