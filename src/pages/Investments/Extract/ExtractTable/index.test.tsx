import React from 'react'
import { storeFactory } from 'setupTests'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'
import mock from 'store/modules/BankExtract/mock.json'

import ExtractTable from '.'

describe('ExtractTable tests', () => {
  it('should exists', () => {
    expect(ExtractTable).toBeDefined()
  })
  it('should render correctly', () => {
    const store = storeFactory({
      bankExtract: {
        data: mock,
        isLayerOpen: false,
        isLoading: false,
        hasError: false,
      }
    })
    renderWithReduxAndTheme(<ExtractTable />, { store })
    expect(screen.getByText('DATA DA TRANSAÇÃO')).toBeInTheDocument()
    expect(screen.getByText('TIPO')).toBeInTheDocument()
    expect(screen.getByText('VALOR')).toBeInTheDocument()
  })
  it('should render loading component', () => {
    const store = storeFactory({
      bankExtract: {
        data: {},
        isLayerOpen: false,
        isLoading: true,
        hasError: false,
      }
    })
    renderWithReduxAndTheme(<ExtractTable />, { store })
    expect(
      screen.getByText('Buscando movimentações da conta de investimento...')
    ).toBeInTheDocument()
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
  it('should render error component', () => {
    const store = storeFactory({
      bankExtract: {
        data: {},
        isLayerOpen: false,
        isLoading: false,
        hasError: true,
      }
    })
    renderWithReduxAndTheme(<ExtractTable />, { store })
    expect(
      screen.getByText('Não foi possível carregar as movimentações da conta de investimento. Por favor, tente novamente.')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument()
  })
  it('should trigger useEffect', () => {
    const store = storeFactory({
      bankExtract: {
        data: {},
        isLayerOpen: true,
        isLoading: false,
        hasError: false,
      }
    })
    renderWithReduxAndTheme(<ExtractTable />, { store })
    expect(
      screen.getByText('Buscando movimentações da conta de investimento...')
    ).toBeInTheDocument()
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()

  })
  it('should verify StyledDate', () => {
    const store = storeFactory({
      bankExtract: {
        data: mock,
        isLayerOpen: false,
        isLoading: false,
        hasError: false,
      }
    })
    renderWithReduxAndTheme(<ExtractTable />, { store })
    expect(screen.getAllByTestId('styled-date')[0]).toHaveStyle('padding: 21px 0 21px 14px')
  })
  it('should dispatch request on the button click', () => {
    const store = storeFactory({
      bankExtract: {
        data: {},
        isLayerOpen: false,
        isLoading: false,
        hasError: true,
      }
    })
    renderWithReduxAndTheme(<ExtractTable />, { store })

    const buttonElement = screen.getByRole('button', { name: /tentar novamente/i })
    fireEvent.click(buttonElement)
    expect(
      screen.getByText('Buscando movimentações da conta de investimento...')
    ).toBeInTheDocument()
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
})
