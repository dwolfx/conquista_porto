import React from 'react'
import { MemoryRouter, Route, RouteProps } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { renderWithReduxAndTheme, fireEvent } from 'testUtils'
import { storeFactory } from 'setupTests'

import InvestorAccountMobile from '.'

const customStore = storeFactory({
  bankData: {
    isLoading: false,
    hasError: false,
    data: {
      DadosContaPortoSeguro: {
        saldo_liquidar: '100.20',
        saldo_disponivel: '99.89',
      },
    },
  },
})

describe('InvestorAccountMobile', () => {
  describe('renders correcly', () => {
    it('shows investor ballance value', () => {
      const { getByText } = renderWithReduxAndTheme(
        <MemoryRouter>
          <InvestorAccountMobile />
        </MemoryRouter>,
        { store: customStore }
      )
      expect(getByText('R$ 99,89')).toBeDefined()
    })
    it('shows investor settle value', () => {
      const { getByText } = renderWithReduxAndTheme(
        <MemoryRouter>
          <InvestorAccountMobile />
        </MemoryRouter>,
        { store: customStore }
      )
      expect(getByText('R$ 100,20')).toBeDefined()
    })
    it('shows all buttons', () => {
      const { getByRole, getAllByRole, getByTestId } = renderWithReduxAndTheme(
        <MemoryRouter>
          <InvestorAccountMobile />
        </MemoryRouter>,
        { store: customStore }
      )
      expect(getByTestId('retirar')).toBeDefined()
      expect(getAllByRole('button', { name: 'ver extrato' })).toHaveLength(2)
    })
  })
  describe('renders correcly with 0 values', () => {
    const zeroStore = storeFactory({
      bankData: {
        isLoading: false,
        hasError: false,
        data: {
          DadosContaPortoSeguro: {
            saldo_liquidar: '0',
            saldo_disponivel: '0',
          },
        },
      },
    })
    it('shows both ballance and settle with value 0', () => {
      const { getAllByText } = renderWithReduxAndTheme(
        <MemoryRouter>
          <InvestorAccountMobile />
        </MemoryRouter>,
        { store: zeroStore }
      )
      expect(getAllByText('R$ 0,00')).toHaveLength(2)
    })
    it('hides all buttons', () => {
      renderWithReduxAndTheme(
        <MemoryRouter>
          <InvestorAccountMobile />
        </MemoryRouter>,
        { store: zeroStore }
      )

      expect(screen.queryByTestId('retirar')).toBeDisabled()
      expect(
        screen.queryByRole('button', { name: 'ver extrato' })
      ).toBeDisabled()
    })
  })
  describe('renders correcly when an error occours', () => {
    const errorStore = storeFactory({
      bankData: {
        isLoading: false,
        hasError: true,
        data: {},
      },
    })
    it('shows error message at ballance value', () => {
      const { getAllByText } = renderWithReduxAndTheme(
        <MemoryRouter>
          <InvestorAccountMobile />
        </MemoryRouter>,
        { store: errorStore }
      )
      expect(getAllByText('FALHA AO CARREGAR')).toHaveLength(2)
    })
    it('shows retry button', () => {
      const { getByTestId } = renderWithReduxAndTheme(
        <MemoryRouter>
          <InvestorAccountMobile />
        </MemoryRouter>,
        { store: errorStore }
      )
      expect(getByTestId('button-ballance-retry')).toBeDefined()
    })
  })
  describe('behaves correcly', () => {
    it('goes to ballance extract page after clicking at "view extract"', () => {
      let locationLocal: RouteProps['location']
      const { getAllByRole } = renderWithReduxAndTheme(
        <MemoryRouter initialEntries={['/investimentos/visualizar']}>
          <InvestorAccountMobile />
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
      fireEvent.click(getAllByRole('button', { name: 'ver extrato' })[0])
      expect(locationLocal!.pathname).toBe('/investimentos/extrato')
    })
    it('goes to settle extract page after clicking at "view extract"', () => {
      let locationLocal: RouteProps['location']
      const { getAllByRole } = renderWithReduxAndTheme(
        <MemoryRouter initialEntries={['/investimentos/visualizar']}>
          <InvestorAccountMobile />
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
      fireEvent.click(getAllByRole('button', { name: 'ver extrato' })[1])
      expect(locationLocal!.pathname).toBe('/investimentos/extrato')
    })
    it('reloads data when click at retry button', () => {
      const storeError = storeFactory({
        bankData: {
          data: {},
          isLoading: false,
          hasError: true,
        },
      })
      const storeSucess = storeFactory({
        bankData: {
          isLoading: false,
          hasError: false,
          data: {
            DadosContaPortoSeguro: {
              saldo_liquidar: '0',
              saldo_disponivel: '99.89',
            },
          },
        },
      })
      const { rerender, getByTestId, queryByTestId } = renderWithReduxAndTheme(
        <MemoryRouter>
          <InvestorAccountMobile />
        </MemoryRouter>,
        { store: storeError }
      )
      fireEvent.click(getByTestId('button-ballance-retry'))
      rerender(
        <MemoryRouter>
          <InvestorAccountMobile />
        </MemoryRouter>
      )
      expect(queryByTestId('button-ballance-retry')).toBeFalsy()
    })
  })
})
