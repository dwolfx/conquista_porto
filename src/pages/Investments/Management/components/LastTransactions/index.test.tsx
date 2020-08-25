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
  describe('Extract page', () => {
    it('goes to extract page', () => {
      const store = storeFactory()
      let locationLocal: RouteProps['location']
      const data: ITransaction[] = [
        {
          id_carteira: 51380129,
          id_operacao: 10608373,
          data_operacao: 1591758000000,
          tipo_operacao: 'Aplicação',
          data_liquidacao: 1591758000000,
          valor_bruto: 111.11,
        },
        {
          id_carteira: 51380129,
          id_operacao: 10590482,
          data_operacao: 1582686000000,
          tipo_operacao: 'Aplicação',
          data_liquidacao: 1582686000000,
          valor_bruto: 45000.0,
        },
      ]

      const { getByTestId } = renderWithReduxAndTheme(
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
        { store }
      )

      store.dispatch(GetLastTransactionDataSuccess(data))
      fireEvent.click(screen.getByText('ver extrato'))
      expect(locationLocal!.pathname).toBe('/investimentos/extrato')
    })
  })
})
