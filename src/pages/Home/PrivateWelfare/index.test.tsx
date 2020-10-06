import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent, act } from 'testUtils'
import { MemoryRouter, RouteProps, Route } from 'react-router-dom'
import { storeFactory } from 'setupTests'
import { truncateString } from 'helpers'

import mock from 'store/modules/PrivateWelfare/mock.json'
import PrivateWelfareSection from '.'
import { IPrivateWelfare } from 'store/modules/PrivateWelfare/types'

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
const filteredMock = mock.filter(pv => pv.status !== 'ERR')

describe('PrivateWelfareSection - Home', () => {
  it('component should exist', () => {
    expect(PrivateWelfareSection).toBeDefined()
  })
  it('should show PrivateWelfareLoadingState component', () => {
    const store = storeFactory({
      privateWelfare: {
        isLoading: true,
        hasError: false,
        data: null,
        isEmpty: false,
      },
    })
    renderWithReduxAndTheme(
      <MemoryRouter>
        <PrivateWelfareSection />
      </MemoryRouter>,
      { store }
    )
    expect(
      screen.getByText('Aguarde, estamos buscando suas informações...')
    ).toBeInTheDocument()
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
  it('should show PrivateWelfareErrorState component', () => {
    const errorStore = storeFactory({
      privateWelfare: {
        data: {},
        isLoading: false,
        hasError: true,
        isEmpty: false,
      },
      auth: {
        cpf: '13150747619',
      },
    })
    renderWithReduxAndTheme(
      <MemoryRouter>
        <PrivateWelfareSection />
      </MemoryRouter>,
      { store: errorStore }
    )

    expect(
      screen.getByText(
        'Desculpe, não foi possível carregar suas informações. Aguarde alguns instantes e tente novamente.'
      )
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument()
  })
  it('should be able to render EmptyState properly', () => {
    const store = storeFactory({
      privateWelfare: {
        data: [],
        isLoading: false,
        hasError: false,
        isEmpty: true,
      },
      auth: {
        cpf: '13150747619',
      },
    })
    renderWithReduxAndTheme(
      <MemoryRouter>
        <PrivateWelfareSection />
      </MemoryRouter>, { store })

    expect(screen.getByText('Viver melhor hoje e amanhã')).toBeInTheDocument()
  })
  it('should show PrivateWelfare component', () => {
    const store = storeFactory({
      privateWelfare: {
        data: filteredMock,
        isLoading: false,
        hasError: false,
        isEmpty: false,
      },
      auth: {
        cpf: '13150747619',
      },
    })
    renderWithReduxAndTheme(
      <MemoryRouter>
        <PrivateWelfareSection />
      </MemoryRouter>, { store })

    expect(screen.getAllByText('Produto')).toHaveLength(1)
    expect(screen.getAllByText('Saldo bruto')).toHaveLength(1)
    expect(screen.getAllByText('Contribuição mensal')).toHaveLength(1)
    expect(screen.getAllByText('Tributação')).toHaveLength(1)
    expect(screen.getByRole('button', { name: /gerenciar/i })).toBeInTheDocument()
  })
  it('should redirect to private welfare page', () => {
    const store = storeFactory({
      privateWelfare: {
        data: filteredMock,
        isLoading: false,
        hasError: false,
        isEmpty: false,
      },
      auth: {
        cpf: '13150747619',
      },
    })
    let locationLocal: RouteProps['location']
    renderWithReduxAndTheme(
      <MemoryRouter initialEntries={['/']}>
        <PrivateWelfareSection />
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
    fireEvent.click(screen.getByRole('button', { name: /gerenciar/i }))
    expect(locationLocal!.pathname).toBe('/previdencia-privada')
  })
  it('should be able to dispatch action on useEffect', () => {
    const store = storeFactory({
      privateWelfare: {
        data: null,
        isLoading: false,
        hasError: false,
        isEmpty: false,
      },
      auth: {
        cpf: '13150747619',
      },
    })

    renderWithReduxAndTheme(
      <MemoryRouter>
        <PrivateWelfareSection />
      </MemoryRouter>,
      { store }
    )

    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
  it('should show Popover Ballance message', () => {
    const store = storeFactory({
      privateWelfare: {
        data: filteredMock,
        isLoading: false,
        hasError: false,
        isEmpty: false,
      },
      auth: {
        cpf: '13150747619',
      },
    })
    renderWithReduxAndTheme(
      <MemoryRouter>
        <PrivateWelfareSection />
      </MemoryRouter>, { store, container: createRootContainer() })
    const infoBallancePopoverElement = screen.getByRole('button', { name: 'info-ballance' })
    fireEvent.mouseOver(infoBallancePopoverElement)
    expect(screen.getByText('Valor disponível em conta, sem desconto de taxas e impostos.')).toBeInTheDocument()
  })
  it('should show Popover Contibution message', () => {
    const store = storeFactory({
      privateWelfare: {
        data: filteredMock,
        isLoading: false,
        hasError: false,
        isEmpty: false,
      },
      auth: {
        cpf: '13150747619',
      },
    })
    renderWithReduxAndTheme(
      <MemoryRouter>
        <PrivateWelfareSection />
      </MemoryRouter>, { store, container: createRootContainer() })
    const infoContributionPopoverElement = screen.getByRole('button', { name: 'info-contribution' })
    fireEvent.mouseOver(infoContributionPopoverElement)
    expect(screen.getByText('Aplicação de um mesmo valor todos os meses.')).toBeInTheDocument()
  })
  it('should show Popover Taxes message', () => {
    const store = storeFactory({
      privateWelfare: {
        data: filteredMock,
        isLoading: false,
        hasError: false,
        isEmpty: false,
      },
      auth: {
        cpf: '13150747619',
      },
    })
    renderWithReduxAndTheme(
      <MemoryRouter>
        <PrivateWelfareSection />
      </MemoryRouter>, { store, container: createRootContainer() })
    const infoTaxPopoverElement = screen.getByRole('button', { name: 'info-tax' })
    fireEvent.mouseOver(infoTaxPopoverElement)
    expect(screen.getByText('O valor do tributo a ser cobrado aumenta de acordo com a renda.')).toBeInTheDocument()
  })
  it('should render mobile correctly', () => {
    const store = storeFactory({
      privateWelfare: {
        data: filteredMock,
        isLoading: false,
        hasError: false,
        isEmpty: false,
      },
      auth: {
        cpf: '13150747619',
      },
    })
    window.resizeTo(400, 600)
    renderWithReduxAndTheme(
      <MemoryRouter>
        <PrivateWelfareSection />
      </MemoryRouter>,
      { store, container: createRootContainer() }
    )

    const infoBallancePopoverElement = screen.getByRole('button', { name: 'info-ballance' })
    const infoContributionPopoverElement = screen.getByRole('button', {
      name: 'info-contribution',
    })
    const infoTaxPopoverElement = screen.getByRole('button', {
      name: 'info-tax',
    })



    fireEvent.mouseOver(infoBallancePopoverElement)
    expect(screen.getByText('Valor disponível em conta, sem desconto de taxas e impostos.')).toBeInTheDocument()

    fireEvent.mouseOver(infoContributionPopoverElement)
    expect(screen.getByText('Aplicação de um mesmo valor todos os meses.')).toBeInTheDocument()

    fireEvent.mouseOver(infoTaxPopoverElement)
    expect(screen.getByText('O valor do tributo a ser cobrado aumenta de acordo com a renda.')).toBeInTheDocument()

    expect(screen.getByText('Produto')).toBeInTheDocument()
    expect(screen.getByText('Saldo bruto')).toBeInTheDocument()
    expect(screen.getByText('Contribuição mensal')).toBeInTheDocument()
    expect(screen.getByText('Tributação')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /gerenciar/i })
    ).toBeInTheDocument()
  })
  it('should redirect to private welfare page on mobile', () => {
    const store = storeFactory({
      privateWelfare: {
        data: filteredMock,
        isLoading: false,
        hasError: false,
        isEmpty: false,
      },
      auth: {
        cpf: '13150747619',
      },
    })
    let locationLocal: RouteProps['location']
    window.resizeTo(400, 600)
    renderWithReduxAndTheme(
      <MemoryRouter initialEntries={['/']}>
        <PrivateWelfareSection />
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
    fireEvent.click(screen.getByRole('button', { name: /gerenciar/i }))
    expect(locationLocal!.pathname).toBe('/previdencia-privada')
  })
  it('should be able to truncate name correctly on all devices', () => {
    const store = storeFactory({
      privateWelfare: {
        data: filteredMock,
        isLoading: false,
        hasError: false,
        isEmpty: false,
      },
      auth: {
        cpf: '13150747619',
      },
    })
    window.resizeTo(979, 600)
    renderWithReduxAndTheme(
      <MemoryRouter>
        <PrivateWelfareSection />
      </MemoryRouter>,
      { store }
    )
    const [privateWelfare] = store.getState().privateWelfare.data as IPrivateWelfare[]
    const [fund] = privateWelfare.benefits.reserves.funds
    const { fundName } = fund
    let textElements = screen.getByText(fundName)

    expect(textElements).toBeInTheDocument()

    act(() => {
      window.resizeTo(981, 600)
    })

    textElements = screen.getByText(truncateString(fundName, 30))
    expect(textElements).toBeInTheDocument()
  })
})

