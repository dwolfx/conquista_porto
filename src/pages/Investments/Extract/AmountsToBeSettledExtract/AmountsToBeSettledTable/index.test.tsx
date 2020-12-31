import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import AmountsToBeSettledTable from '.'
import AmountsToBeSettleTableMobile from './Mobile'

const extractsMock = [
  {
    nome: 'Vinci Seleção FIA',
    tipo: 'Aplicação',
    data: '2019-09-03T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Absolute Pace Long Biasec FIC FIA',
    tipo: 'Aplicação',
    data: '2019-07-03T00:00:00-03:00',
    valor: '500',
  },
  {
    nome: 'Alaska Black Institucional FIA',
    tipo: 'Resgate',
    data: '2019-08-27T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Itaú Dist. Long Bias FIC FIA',
    tipo: 'Aplicação',
    data: '2019-09-03T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Vinci Seleção FIA',
    tipo: 'Aplicação',
    data: '2019-07-03T00:00:00-03:00',
    valor: '500',
  },
  {
    nome: 'Absolute Pace Long Biasec FIC FIA',
    tipo: 'Resgate',
    data: '2019-08-27T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Alaska Black Institucional FIA',
    tipo: 'Aplicação',
    data: '2019-09-03T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Itaú Dist. Long Bias FIC FIA',
    tipo: 'Aplicação',
    data: '2019-07-03T00:00:00-03:00',
    valor: '500',
  },
  {
    nome: 'Vinci Seleção FIA',
    tipo: 'Resgate',
    data: '2019-08-27T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Absolute Pace Long Biasec FIC FIA',
    tipo: 'Aplicação',
    data: '2019-09-03T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Alaska Black Institucional FIA',
    tipo: 'Aplicação',
    data: '2019-07-03T00:00:00-03:00',
    valor: '500',
  },
  {
    nome: 'Itaú Dist. Long Bias FIC FIA',
    tipo: 'Resgate',
    data: '2019-08-27T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Vinci Seleção FIA',
    tipo: 'Aplicação',
    data: '2019-09-03T00:00:00-03:00',
    valor: '100',
  },
  {
    nome: 'Absolute Pace Long Biasec FIC FIA',
    tipo: 'Aplicação',
    data: '2019-07-03T00:00:00-03:00',
    valor: '500',
  },
  {
    nome: 'Alaska Black Institucional FIA',
    tipo: 'Resgate',
    data: '2019-08-27T00:00:00-03:00',
    valor: '100',
  },
]

describe('AmountsToBeSettledTable tests', () => {
  describe('Desktop and Tablet Horizontal', () => {
    it('should exists', () => {
      expect(AmountsToBeSettledTable).toBeDefined()
    })
    it('should render correctly', () => {
      renderWithReduxAndTheme(
        <AmountsToBeSettledTable
          extracts={extractsMock}
          isLoading={false}
          hasError={false}
          request={{}}
        />
      )
      expect(screen.getByText('DATA DA TRANSAÇÃO')).toBeInTheDocument()
      expect(screen.getByText('FUNDO')).toBeInTheDocument()
      expect(screen.getByText('TIPO')).toBeInTheDocument()
      expect(screen.getByText('VALOR')).toBeInTheDocument()
    })
    it('should render loading component', () => {
      renderWithReduxAndTheme(
        <AmountsToBeSettledTable
          extracts={[]}
          isLoading={true}
          hasError={false}
          request={{}}
        />
      )
      expect(
        screen.getByText('Buscando saldos a liquidar...')
      ).toBeInTheDocument()
      expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
    })
    it('should render error component', () => {
      renderWithReduxAndTheme(
        <AmountsToBeSettledTable
          extracts={[]}
          isLoading={false}
          hasError
          request={{}}
        />
      )
      expect(
        screen.getByText(
          'Não foi possível carregar os saldos a liquidar. Por favor, tente novamente.'
        )
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /tentar novamente/i })
      ).toBeInTheDocument()
    })
    it('should verify StyledDate', () => {
      renderWithReduxAndTheme(
        <AmountsToBeSettledTable
          extracts={extractsMock}
          isLoading={false}
          hasError={false}
          request={{}}
        />
      )
      expect(screen.getAllByTestId('styled-date')[0]).toHaveStyle(
        'padding: 21px 0 21px 14px'
      )
    })
    it('should dispatch request on the button click', () => {
      const { rerender } = renderWithReduxAndTheme(
        <AmountsToBeSettledTable
          extracts={[]}
          isLoading={false}
          hasError
          request={{}}
        />
      )

      const buttonElement = screen.getByRole('button', {
        name: /tentar novamente/i,
      })
      fireEvent.click(buttonElement)
      rerender(
        <AmountsToBeSettledTable
          extracts={[]}
          isLoading
          hasError={false}
          request={{}}
        />
      )
      expect(
        screen.getByText('Buscando saldos a liquidar...')
      ).toBeInTheDocument()
      expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
    })
  })
  describe('Tablet Vertical', () => {
    it('should render tablet vertical component', () => {
      window.resizeTo(700, 600)
      renderWithReduxAndTheme(
        <AmountsToBeSettledTable
          extracts={extractsMock}
          isLoading={false}
          hasError={false}
          request={{}}
        />
      )
      expect(screen.getAllByText('Data da transação')).toHaveLength(8)
      expect(screen.getAllByText('Fundo')).toHaveLength(8)
      expect(screen.getAllByText('Tipo')).toHaveLength(8)
      expect(screen.getAllByText('Valor')).toHaveLength(8)
    })
    it('should render tablet vertical empty state', () => {
      window.resizeTo(700, 600)
      renderWithReduxAndTheme(
        <AmountsToBeSettledTable
          extracts={[]}
          isLoading={false}
          hasError={false}
          request={{}}
        />
      )
      expect(
        screen.getByText(
          'Não existem valores a liquidar até o presente momento.'
        )
      ).toBeInTheDocument()
    })
    it('should render tablet vertical error state', () => {
      window.resizeTo(700, 600)
      renderWithReduxAndTheme(
        <AmountsToBeSettledTable
          extracts={[]}
          isLoading={false}
          hasError
          request={{}}
        />
      )
      expect(
        screen.getByText(
          'Não foi possível carregar a lista de valores a liquidar. Por favor, tente novamente.'
        )
      ).toBeInTheDocument()
    })
    it('should render tablet vertical loading state', () => {
      window.resizeTo(700, 600)
      const { rerender } = renderWithReduxAndTheme(
        <AmountsToBeSettledTable
          extracts={[]}
          isLoading
          hasError={false}
          request={{}}
        />
      )
      expect(
        screen.getByText('Buscando informações dos saldos a liquidar…')
      ).toBeInTheDocument()
      expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
    })
    it('should render tablet vertical and render more items when button is clicked', () => {
      window.resizeTo(700, 600)

      const { rerender } = renderWithReduxAndTheme(
        <AmountsToBeSettledTable
          extracts={extractsMock}
          isLoading={false}
          hasError={false}
          request={{}}
        />
      )
      const button = screen.getByRole('button', { name: /carregar mais/i })

      expect(screen.getAllByTestId('table-account-extract')).toHaveLength(8)
      expect(screen.getByTestId('button-wrapper')).toHaveStyle(
        'margin-top: 14px'
      )

      fireEvent.click(button)

      rerender(
        <AmountsToBeSettledTable
          extracts={extractsMock}
          isLoading={false}
          hasError={false}
          request={{}}
        />
      )

      expect(screen.getAllByTestId('table-account-extract')).toHaveLength(15)
    })
    it('should trigger dispatch on error component tablet vertical', () => {
      window.resizeTo(700, 600)
      const { rerender } = renderWithReduxAndTheme(
        <AmountsToBeSettledTable
          extracts={[]}
          isLoading={false}
          hasError={true}
          request={{}}
        />
      )
      const button = screen.getByRole('button', { name: /tentar novamente/i })

      fireEvent.click(button)

      rerender(
        <AmountsToBeSettledTable
          extracts={[]}
          isLoading
          hasError={false}
          request={{}}
        />
      )
      expect(
        screen.getByText('Buscando informações dos saldos a liquidar…')
      ).toBeInTheDocument()
      expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
    })
  })
  describe('Mobile', () => {
    it('should render mobile empty state', () => {
      window.resizeTo(400, 600)
      renderWithReduxAndTheme(
        <AmountsToBeSettleTableMobile
          extracts={[]}
          isLoading={false}
          hasError={false}
          request={{}}
        />
      )
      expect(
        screen.getByText(
          'Não existem valores a liquidar até o presente momento.'
        )
      ).toBeInTheDocument()
    })
    it('should render mobile error state', () => {
      window.resizeTo(400, 600)
      renderWithReduxAndTheme(
        <AmountsToBeSettleTableMobile
          extracts={[]}
          isLoading={false}
          hasError
          request={{}}
        />
      )
      expect(
        screen.getByText(
          'Não foi possível carregar a lista de valores a liquidar. Por favor, tente novamente.'
        )
      ).toBeInTheDocument()
    })
    it('should render mobile loading state', () => {
      window.resizeTo(400, 600)
      renderWithReduxAndTheme(
        <AmountsToBeSettleTableMobile
          extracts={[]}
          isLoading
          hasError={false}
          request={{}}
        />
      )
      expect(
        screen.getByText('Buscando informações dos saldos a liquidar…')
      ).toBeInTheDocument()
      expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
    })
    it('should render mobile and render more items when button is clicked', () => {
      window.resizeTo(400, 600)

      const { rerender } = renderWithReduxAndTheme(
        <AmountsToBeSettleTableMobile
          extracts={extractsMock}
          isLoading={false}
          hasError={false}
          request={{}}
        />
      )
      const button = screen.getByRole('button', { name: /carregar mais/i })

      expect(screen.getAllByTestId('table-account-extract')).toHaveLength(8)
      expect(screen.getByTestId('button-wrapper')).toHaveStyle(
        'margin-top: 14px'
      )

      fireEvent.click(button)

      rerender(
        <AmountsToBeSettleTableMobile
          extracts={extractsMock}
          isLoading={false}
          hasError={false}
          request={{}}
        />
      )

      expect(screen.getAllByTestId('table-account-extract')).toHaveLength(15)
    })
    it('should trigger dispatch on error component mobile', () => {
      window.resizeTo(400, 600)
      const { rerender } = renderWithReduxAndTheme(
        <AmountsToBeSettleTableMobile
          extracts={[]}
          isLoading={false}
          hasError={true}
          request={{}}
        />
      )
      const button = screen.getByRole('button', { name: /tentar novamente/i })

      fireEvent.click(button)

      rerender(
        <AmountsToBeSettleTableMobile
          extracts={[]}
          isLoading
          hasError={false}
          request={{}}
        />
      )
      expect(
        screen.getByText('Buscando informações dos saldos a liquidar…')
      ).toBeInTheDocument()
      expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
    })
  })
})
