import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'
import { storeFactory } from 'setupTests'

import ExtractTable from '.'
import ExtractTableMobile from './Mobile'

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

describe('ExtractTable tests', () => {
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
  it('should render mobile empty state', () => {
    window.resizeTo(400, 600)
    const { rerender } = renderWithReduxAndTheme(
      <ExtractTableMobile
        extracts={[]}
        isLoading={false}
        hasError={false}
        request={{}}
      />
    )
    expect(screen.getByText('A sua conta de investimento não foi movimentada até o presente momento.')).toBeInTheDocument()
  })
  it('should render mobile error state', () => {
    window.resizeTo(400, 600)
    const { rerender } = renderWithReduxAndTheme(
      <ExtractTableMobile
        extracts={[]}
        isLoading={false}
        hasError
        request={{}}
      />
    )
    expect(screen.getByText('Não foi possível carregar a lista de fundos. Por favor, tente novamente.')).toBeInTheDocument()
  })
  it('should render mobile loading state', () => {
    window.resizeTo(400, 600)
    const { rerender } = renderWithReduxAndTheme(
      <ExtractTableMobile
        extracts={[]}
        isLoading
        hasError={false}
        request={{}}
      />
    )
    expect(
      screen.getByText('Buscando informações dos fundos de investimento…')
    ).toBeInTheDocument()
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
  it('should render mobile and render more when button is clicked', () => {
    window.resizeTo(400, 600)
    const mock = [
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" }]

    const { rerender } = renderWithReduxAndTheme(
      <ExtractTableMobile
        extracts={mock}
        isLoading={false}
        hasError={false}
        request={{}}
      />
    )
    const button = screen.getByRole('button', { name: /carregar mais/i })

    expect(screen.getAllByTestId('table-account-extract')).toHaveLength(8)
    expect(screen.getByTestId('button-wrapper')).toHaveStyle('margin-top: 14px')

    fireEvent.click(button)

    rerender(
      <ExtractTableMobile
        extracts={mock}
        isLoading={false}
        hasError={false}
        request={{}}
      />
    )

    expect(screen.getAllByTestId('table-account-extract')).toHaveLength(12)

  })
  it('should trigger dispatch on error component mobile', () => {
    window.resizeTo(400, 600)
    const { rerender } = renderWithReduxAndTheme(
      <ExtractTableMobile
        extracts={[]}
        isLoading={false}
        hasError={true}
        request={{}}
      />
    )
    const button = screen.getByRole('button', { name: /tentar novamente/i })

    fireEvent.click(button)

    rerender(
      <ExtractTableMobile
        extracts={[]}
        isLoading
        hasError={false}
        request={{}}
      />
    )
    expect(
      screen.getByText('Buscando informações dos fundos de investimento…')
    ).toBeInTheDocument()
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
  it('should render tablet component', () => {
    window.resizeTo(700, 600)
    renderWithReduxAndTheme(
      <ExtractTable
        extracts={extractsMock}
        isLoading={false}
        hasError={false}
        request={{}}
      />
    )
    expect(screen.getAllByText('Data da transação')).toHaveLength(5)
    expect(screen.getAllByText('Tipo')).toHaveLength(5)
    expect(screen.getAllByText('Valor')).toHaveLength(5)
  })
  it('should render tablet empty state', () => {
    window.resizeTo(700, 600)
    const { rerender } = renderWithReduxAndTheme(
      <ExtractTable
        extracts={[]}
        isLoading={false}
        hasError={false}
        request={{}}
      />
    )
    expect(screen.getByText('A sua conta de investimento não foi movimentada até o presente momento.')).toBeInTheDocument()
  })
  it('should render tablet error state', () => {
    window.resizeTo(700, 600)
    const { rerender } = renderWithReduxAndTheme(
      <ExtractTable
        extracts={[]}
        isLoading={false}
        hasError
        request={{}}
      />
    )
    expect(screen.getByText('Não foi possível carregar a lista de fundos. Por favor, tente novamente.')).toBeInTheDocument()
  })
  it('should render tablet loading state', () => {
    window.resizeTo(700, 600)
    const { rerender } = renderWithReduxAndTheme(
      <ExtractTable
        extracts={[]}
        isLoading
        hasError={false}
        request={{}}
      />
    )
    expect(
      screen.getByText('Buscando informações dos fundos de investimento…')
    ).toBeInTheDocument()
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
  it('should render tablet and render more when button is clicked', () => {
    window.resizeTo(700, 600)
    const mock = [
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" },
      { data: "2019-09-03T00:00:00-03:00", tipo: "Entrada", valor: "100" }]

    const { rerender } = renderWithReduxAndTheme(
      <ExtractTable
        extracts={mock}
        isLoading={false}
        hasError={false}
        request={{}}
      />
    )
    const button = screen.getByRole('button', { name: /carregar mais/i })

    expect(screen.getAllByTestId('table-account-extract')).toHaveLength(8)
    expect(screen.getByTestId('button-wrapper')).toHaveStyle('margin-top: 14px')

    fireEvent.click(button)

    rerender(
      <ExtractTable
        extracts={mock}
        isLoading={false}
        hasError={false}
        request={{}}
      />
    )

    expect(screen.getAllByTestId('table-account-extract')).toHaveLength(12)

  })
  it('should trigger dispatch on error component tablet', () => {
    window.resizeTo(700, 600)
    const { rerender } = renderWithReduxAndTheme(
      <ExtractTable
        extracts={[]}
        isLoading={false}
        hasError={true}
        request={{}}
      />
    )
    const button = screen.getByRole('button', { name: /tentar novamente/i })

    fireEvent.click(button)

    rerender(
      <ExtractTable
        extracts={[]}
        isLoading
        hasError={false}
        request={{}}
      />
    )
    expect(
      screen.getByText('Buscando informações dos fundos de investimento…')
    ).toBeInTheDocument()
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
})
