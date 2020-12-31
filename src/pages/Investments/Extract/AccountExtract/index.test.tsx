import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { storeFactory } from 'setupTests'
import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import AccountExtract from '.'

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

const extractsMock = {
  conta: {
    'xsi:type': 'ns3:ContaPortoSeguroType',
    conta: '47',
    cpf: '030302151',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    digito_conta: '0',
    nome_titular: 'Código Conquista',
    agencia: '0001',
    titular: 'Código Conquista',
    codigo_banco: '420'
  },
  transacoes: {
    transacao: [
      {
        tipo: 'Entrada',
        data: '2019-09-03T00:00:00-03:00',
        valor: '100'
      },
      {
        tipo: 'Entrada',
        data: '2019-07-03T00:00:00-03:00',
        valor: '500'
      },
      {
        tipo: 'Retirada',
        data: '2019-08-27T00:00:00-03:00',
        valor: '100'
      },
      {
        tipo: 'Entrada',
        data: '2019-09-03T00:00:00-03:00',
        valor: '100'
      },
      {
        tipo: 'Entrada',
        data: '2019-07-03T00:00:00-03:00',
        valor: '500'
      },
      {
        tipo: 'Retirada',
        data: '2019-08-27T00:00:00-03:00',
        valor: '100'
      },
      {
        tipo: 'Entrada',
        data: '2019-09-03T00:00:00-03:00',
        valor: '100'
      },
      {
        tipo: 'Entrada',
        data: '2019-07-03T00:00:00-03:00',
        valor: '500'
      },
      {
        tipo: 'Retirada',
        data: '2019-08-27T00:00:00-03:00',
        valor: '100'
      },
      {
        tipo: 'Entrada',
        data: '2019-09-03T00:00:00-03:00',
        valor: '100'
      },
      {
        tipo: 'Entrada',
        data: '2019-07-03T00:00:00-03:00',
        valor: '500'
      },
      {
        tipo: 'Retirada',
        data: '2019-08-27T00:00:00-03:00',
        valor: '100'
      },
      {
        tipo: 'Entrada',
        data: '2019-09-03T00:00:00-03:00',
        valor: '100'
      },
      {
        tipo: 'Entrada',
        data: '2019-07-03T00:00:00-03:00',
        valor: '500'
      },
      {
        tipo: 'Retirada',
        data: '2019-08-27T00:00:00-03:00',
        valor: '100'
      }
    ]
  }
}

describe('AccountExtract tests', () => {
  it('should exists', () => {
    expect(AccountExtract).toBeDefined()
  })
  it('should contains 2 cards in the body', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <AccountExtract isOpen handleClose={() => {}} />
      </MemoryRouter>, { container: createRootContainer() }
    )
    expect(screen.getByTestId('card-account-info')).toBeInTheDocument()
    expect(screen.getByTestId('table-account-Base')).toBeInTheDocument()
  })
  test('filter functions should reflect on buttons', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <AccountExtract isOpen handleClose={() => {}} />
      </MemoryRouter>, { container: createRootContainer() }
    )
    const clearFiltersButton = screen.getByRole('button', { name: /limpar filtros/i })
    const entryButton = screen.getByRole('button', { name: /entrada/i })
    const withdrawButton = screen.getByRole('button', { name: /retirada/i })
    fireEvent.click(entryButton)
    fireEvent.click(withdrawButton)
    fireEvent.click(clearFiltersButton)
    expect(entryButton).toHaveStyleRule('border-color', '#DDDDDD')
    expect(withdrawButton).toHaveStyleRule('border-color', '#DDDDDD')
  })
  it('should render with store', () => {
    const store = storeFactory({
      bankExtract: {
        data: extractsMock,
        isLoading: false,
        isLayerOpen: true,
        hasError: false,
      }
    })
    renderWithReduxAndTheme(
      <MemoryRouter>
        <AccountExtract isOpen handleClose={() => {}} />
      </MemoryRouter>, { container: createRootContainer(), store }
    )
    expect(store.getState().bankExtract.data).toBeDefined()
  })
  it('should render mobile components', () => {
    window.resizeTo(400, 600)

    renderWithReduxAndTheme(
      <MemoryRouter>
        <AccountExtract isOpen handleClose={() => {}} />
      </MemoryRouter>, { container: createRootContainer()}
    )
    expect(screen.getByRole('button', { name: 'filter' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'filter' }))
    expect(screen.getByTestId('extract-filter-drawer')).toBeInTheDocument()
  })
  it('should close filter drawer', () => {
    window.resizeTo(400, 600)

    renderWithReduxAndTheme(
      <MemoryRouter>
        <AccountExtract isOpen handleClose={() => {}} />
      </MemoryRouter>, { container: createRootContainer()}
    )
    expect(screen.getByRole('button', { name: 'filter' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'filter' }))
    fireEvent.click(screen.getByRole('button', { name: 'close' }))
    expect(screen.queryByTestId('extract-filter-drawer')).toBeFalsy()
  })
})
