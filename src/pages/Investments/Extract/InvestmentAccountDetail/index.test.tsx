import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'
import { storeFactory } from 'setupTests'

import mock from 'store/modules/BankData/mock.json'
import InvestmentAccountDetail from '.'

describe('Investment account detail', () => {
  it('component should exist', () => {
    expect(InvestmentAccountDetail).toBeDefined()
  })
  it('should show InvestmentAccountDetail loading component', () => {
    const store = storeFactory({
      bankData: {
        data: null,
        status: '',
        hasError: false,
        isLoading: true,
      },
    })
    renderWithReduxAndTheme(<InvestmentAccountDetail />, { store })
    expect(
      screen.getByText('Buscando informações da conta de investimento...')
    ).toBeInTheDocument()
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
  it('should show InvestmentAccountDetail error component', () => {
    const store = storeFactory({
      bankData: {
        data: {},
        isLoading: false,
        hasError: true,
        status: '',
      },
    })
    renderWithReduxAndTheme(<InvestmentAccountDetail />, { store })

    expect(screen.getByText('Não foi possível carregar as informações da conta de investimento.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument()
  })
  it('should trigger useEffect', () => {
    const store = storeFactory({
      bankData: {
        data: null,
        status: '',
        hasError: false,
        isLoading: false,
      },
    })

    renderWithReduxAndTheme(<InvestmentAccountDetail />, { store })

    expect(
      screen.getByText('Buscando informações da conta de investimento...')
    ).toBeInTheDocument()
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
  it('should trigger onClick', () => {
    const store = storeFactory({
      bankData: {
        data: {},
        status: '',
        hasError: true,
        isLoading: false,
      },
    })

    renderWithReduxAndTheme(<InvestmentAccountDetail />, { store })
    const buttonElement = screen.getByRole('button', { name: /tentar novamente/i })

    fireEvent.click(buttonElement)

    expect(
      screen.getByText('Buscando informações da conta de investimento...')
    ).toBeInTheDocument()
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
  it('should show InvestmentAccountDetail component', () => {
    const store = storeFactory({
      bankData: {
        data: mock,
        status: '',
        hasError: false,
        isLoading: false,
      },
    })
    renderWithReduxAndTheme(<InvestmentAccountDetail />, { store })

    expect(screen.getByText('Conta de investimento')).toBeInTheDocument()
    expect(screen.getByText('Banco')).toBeInTheDocument()
    expect(screen.getByText('Agência')).toBeInTheDocument()
    expect(screen.getByText('Conta')).toBeInTheDocument()
    expect(screen.getByText('CPF')).toBeInTheDocument()
    expect(screen.getByText('Favorecido')).toBeInTheDocument()
  })
})

