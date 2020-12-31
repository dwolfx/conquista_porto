import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { storeFactory } from 'setupTests'
import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import AmountsToBeSettledExtract from '.'

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
    codigo_banco: '420',
  },
  transacoes: {
    transacao: [
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
    ],
  },
}

describe('AccountExtract tests', () => {
  it('should exists', () => {
    expect(AmountsToBeSettledExtract).toBeDefined()
  })
  it('should contains 1 card in the body', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <AmountsToBeSettledExtract isOpen handleClose={() => {}} />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(
      screen.getByTestId('table-amounts-to-be-settled-extract')
    ).toBeInTheDocument()
  })
  test('filter functions should reflect on buttons', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <AmountsToBeSettledExtract isOpen handleClose={() => {}} />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    const clearFiltersButton = screen.getByRole('button', {
      name: /limpar filtros/i,
    })
    const applicationButton = screen.getByRole('button', { name: /aplicação/i })
    const redeemButton = screen.getByRole('button', { name: /resgate/i })
    fireEvent.click(applicationButton)
    fireEvent.click(redeemButton)
    fireEvent.click(clearFiltersButton)
    expect(applicationButton).toHaveStyleRule('border-color', '#DDDDDD')
    expect(redeemButton).toHaveStyleRule('border-color', '#DDDDDD')
  })
  it('should render with store', () => {
    // atualizar quando existir informações sobre o serviço de Saldo a liquidar
    const store = storeFactory({
      bankExtract: {
        data: extractsMock,
        isLoading: false,
        isLayerOpen: true,
        hasError: false,
      },
    })
    renderWithReduxAndTheme(
      <MemoryRouter>
        <AmountsToBeSettledExtract isOpen handleClose={() => {}} />
      </MemoryRouter>,
      { container: createRootContainer(), store }
    )
    expect(store.getState().bankExtract.data).toBeDefined()
  })
  it('should render mobile filter components', () => {
    window.resizeTo(400, 600)

    renderWithReduxAndTheme(
      <MemoryRouter>
        <AmountsToBeSettledExtract isOpen handleClose={() => {}} />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(screen.getByRole('button', { name: 'filter' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'filter' }))
    expect(screen.getByTestId('extract-filter-drawer')).toBeInTheDocument()
  })
  it('should close filter drawer', () => {
    window.resizeTo(400, 600)

    renderWithReduxAndTheme(
      <MemoryRouter>
        <AmountsToBeSettledExtract isOpen handleClose={() => {}} />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(screen.getByRole('button', { name: 'filter' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'filter' }))
    fireEvent.click(screen.getByRole('button', { name: 'close' }))
    expect(screen.queryByTestId('extract-filter-drawer')).toBeFalsy()
  })
})
