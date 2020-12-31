import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'
import { storeFactory } from 'setupTests'

import mock from 'store/modules/BankData/mock.json'
import InvestmentAccountDetail from '.'

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    container.setAttribute('role', 'main')
    document.body.appendChild(container)
  }
  return container
}

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
  it('should show InvestmentAccountDetail Tablet component', () => {
    const store = storeFactory({
      bankData: {
        data: mock,
        status: '',
        hasError: false,
        isLoading: false,
      },
    })
    window.resizeTo(981, 600)
    renderWithReduxAndTheme(<InvestmentAccountDetail />, { store })

    expect(screen.getByText('Conta de investimento')).toBeInTheDocument()
    expect(screen.getByText('Banco')).toBeInTheDocument()
    expect(screen.getByText('Agência')).toBeInTheDocument()
    expect(screen.getByText('Conta')).toBeInTheDocument()
    expect(screen.getByText('CPF')).toBeInTheDocument()
    expect(screen.getByText('Favorecido')).toBeInTheDocument()
  })
  it('should show InvestmentAccountDetail Mobile component', () => {
    const store = storeFactory({
      bankData: {
        data: mock,
        status: '',
        hasError: false,
        isLoading: false,
      },
    })
    window.resizeTo(400, 600)
    renderWithReduxAndTheme(<InvestmentAccountDetail />, { store, container: createRootContainer() })

    expect(screen.getAllByText('Conta de investimento')).toHaveLength(2)
    expect(screen.getByRole('button', { name: /info-account-detail/i })).toBeInTheDocument()
  })
  it('should show modal on Mobile', () => {
    const store = storeFactory({
      bankData: {
        data: mock,
        status: '',
        hasError: false,
        isLoading: false,
      },
    })
    window.resizeTo(400, 600)
    renderWithReduxAndTheme(<InvestmentAccountDetail />, { store, container: createRootContainer() })

    const button = screen.getByRole('button', { name: /info-account-detail/i })
    fireEvent.click(button)
    expect(screen.getByText('Banco')).toBeInTheDocument()
    expect(screen.getByText('Agência')).toBeInTheDocument()
    expect(screen.getByText('Conta')).toBeInTheDocument()
    expect(screen.getByText('CPF')).toBeInTheDocument()
    expect(screen.getByText('Favorecido')).toBeInTheDocument()
  })
  it('should close modal on Mobile', () => {
    const store = storeFactory({
      bankData: {
        data: mock,
        status: '',
        hasError: false,
        isLoading: false,
      },
    })
    window.resizeTo(400, 600)
    renderWithReduxAndTheme(<InvestmentAccountDetail />, { store, container: createRootContainer() })

    const button = screen.getByRole('button', { name: /info-account-detail/i })
    fireEvent.click(button)
    fireEvent.click(screen.getByRole('img', { name: 'close' }))

    expect(screen.getAllByText('Conta de investimento')).toHaveLength(2)
    expect(screen.getByRole('button', { name: /info-account-detail/i })).toBeInTheDocument()
  })
})

