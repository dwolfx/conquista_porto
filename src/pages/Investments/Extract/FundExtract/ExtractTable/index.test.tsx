import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import ExtractTable from '.'

const extractsMock = [
  {
    "tipo": "Retirada",
    "data": "2019-09-03T00:00:00-03:00",
    "valor": "100"
  },
  {
    "tipo": "Retirada",
    "data": "2019-07-03T00:00:00-03:00",
    "valor": "500"
  },
  {
    "tipo": "Retirada",
    "data": "2019-08-27T00:00:00-03:00",
    "valor": "100"
  },
  {
    "tipo": "Retirada",
    "data": "2019-09-03T00:00:00-03:00",
    "valor": "100"
  },
  {
    "tipo": "Retirada",
    "data": "2019-07-03T00:00:00-03:00",
    "valor": "500"
  }
]

describe('Extract Table (Fund) tests', () => {
  it('should exists', () => {
    expect(ExtractTable).toBeDefined()
  })
  it('should render correctly', () => {
    renderWithReduxAndTheme(
      <ExtractTable
        extracts={extractsMock}
        isLoading={false}
        hasError={false}
        request={{}}
      />
    )
    expect(screen.getByText('DATA DA TRANSAÇÃO')).toBeInTheDocument()
    expect(screen.getByText('TIPO')).toBeInTheDocument()
    expect(screen.getByText('VALOR')).toBeInTheDocument()
  })
  it('should render loading component', () => {
    renderWithReduxAndTheme(
      <ExtractTable 
        extracts={[]}
        isLoading={true}
        hasError={false}
        request={{}}
      />
    )
    expect(
      screen.getByText('Buscando movimentações da conta de investimento...')
    ).toBeInTheDocument()
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
  it('should render error component', () => {
    renderWithReduxAndTheme(
      <ExtractTable 
        extracts={[]}
        isLoading={false}
        hasError
        request={{}}
      />
    )
    expect(
      screen.getByText('Não foi possível carregar as movimentações da conta de investimento. Por favor, tente novamente.')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument()
  })
  it('should verify StyledDate', () => {
    renderWithReduxAndTheme(
      <ExtractTable 
        extracts={extractsMock}
        isLoading={false}
        hasError={false}
        request={{}}
      />
    )
    expect(screen.getAllByTestId('styled-date')[0]).toHaveStyle('padding: 21px 0 21px 14px')
  })
  it('should dispatch request on the button click', () => {
    const { rerender } = renderWithReduxAndTheme(
      <ExtractTable 
        extracts={[]}
        isLoading={false}
        hasError
        request={{}}
      />
    )

    const buttonElement = screen.getByRole('button', { name: /tentar novamente/i })
    fireEvent.click(buttonElement)
    rerender(
      <ExtractTable 
        extracts={[]}
        isLoading
        hasError={false}
        request={{}}
      />
    )
    expect(
      screen.getByText('Buscando movimentações da conta de investimento...')
    ).toBeInTheDocument()
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
})