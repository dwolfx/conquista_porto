import React from 'react'
import { MemoryRouter, Route, RouteProps } from 'react-router-dom'

import {
  GetBankExtractFundFailure,
  GetBankExtractFundSuccess,
} from 'store/modules/BankExtractFund/action'
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

      store.dispatch(GetBankExtractFundFailure())
      expect(getByTestId('lasttransations-error-component')).toBeInTheDocument()
    })
    it('should retry the request and get loading again', () => {
      const store = storeFactory()
      const { getByTestId, getByText } = renderWithProviders(store)
      store.dispatch(GetBankExtractFundFailure())
      expect(getByTestId('lasttransations-error-component')).toBeInTheDocument()

      fireEvent.click(getByText('Tentar novamente'))
      expect(
        getByTestId('lasttransations-loading-component')
      ).toBeInTheDocument()
    })
  })
  describe('Loading state', () => {
    it('should render the loading component when request has started', () => {
      const { getByTestId } = renderWithProviders()
      expect(
        getByTestId('lasttransations-loading-component')
      ).toBeInTheDocument()
    })
  })
  describe('Extract page', () => {
    it('goes to extract page', () => {
      const store = storeFactory()
      let locationLocal: RouteProps['location']
      const data = [
        {
          fundos: {
            fundo: [],
          },
          operacoes: {
            operacao: [
              {
                data_operacao: '2020-04-13T00:00:00-03:00',
                data_liquidacao: '2020-04-13T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '1000.00',
                tipo_movimentacao_operacao: '1',
                id_carteira: 51380060,
                id_operacao: '10606545062',
              },
              {
                data_operacao: '2020-04-13T00:00:00-03:00',
                data_liquidacao: '2020-04-13T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '1000.00',
                tipo_movimentacao_operacao: '1',
                id_carteira: 51380060,
                id_operacao: '10606455645062',
              },
            ],
          },
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

      store.dispatch(GetBankExtractFundSuccess(data))
      fireEvent.click(screen.getByText('ver extrato'))
      expect(locationLocal!.pathname).toBe('/investimentos/extrato')
    })
  })
})
