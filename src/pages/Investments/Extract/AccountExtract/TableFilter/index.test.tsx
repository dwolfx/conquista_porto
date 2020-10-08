import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import TableFilter from '.'

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

const dateMock = {
  startDate: '',
  endDate: ''
}

describe('TableFilter tests', () => {
  it('should exists', () => {
    expect(TableFilter).toBeDefined()
  })
  it('should have the select period input', () => {
    renderWithReduxAndTheme(
    <MemoryRouter>
      <TableFilter 
        handleFilters={() => {}}
        filters={{ entry: false, withdraw: false }} 
        handleInterval={() => {}}
        interval={{ startDate: '', endDate: '' }}
      />
    </MemoryRouter>
    , { container: createRootContainer() })
    expect(screen.getByTestId('select-period')).toBeInTheDocument()
  })
  it('should have button filters', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter 
          handleFilters={() => {}} 
          filters={{ entry: false, withdraw: false }} 
          handleInterval={() => {}}
          interval={{ startDate: '', endDate: '' }}
        />
      </MemoryRouter>
      , { container: createRootContainer() })
    expect(screen.getByRole('button', { name: /entrada/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /retirada/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /limpar filtros/i })).toBeInTheDocument()
  })
  test('the button "entrada" should behave correclty', () => {
    const handleFiltersMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter 
          handleFilters={handleFiltersMock}
          filters={{ entry: true, withdraw: false }}
          handleInterval={() => {}}
          interval={{ startDate: '', endDate: '' }}
        />
      </MemoryRouter>
      , { container: createRootContainer() })
      const entryButton = screen.getByRole('button', { name: /entrada/i })
      fireEvent.click(entryButton)
      expect(entryButton).toHaveStyleRule('border-color', '#00ADEF')
      expect(handleFiltersMock).toHaveBeenCalled()
    })
  test('the button "retirada" should behave correclty', () => {
    const handleFiltersMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          handleFilters={handleFiltersMock}
          filters={{ entry: false, withdraw: true }}
          handleInterval={() => {}}
          interval={{ startDate: '', endDate: '' }}
        />
      </MemoryRouter>
      , { container: createRootContainer() })
      const withdrawButton = screen.getByRole('button', { name: /retirada/i })
      fireEvent.click(withdrawButton)
      expect(withdrawButton).toHaveStyleRule('border-color', '#00ADEF')
      expect(handleFiltersMock).toHaveBeenCalled()
  })
  it('should clean filters button behaves', () => {
    const handleFiltersMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          handleFilters={handleFiltersMock}
          filters={{ entry: false, withdraw: false }}
          handleInterval={() => {}}
          interval={{ startDate: '', endDate: '' }}
        />
      </MemoryRouter>, { container: createRootContainer() }
    )
    const clearButton = screen.getByRole('button', { name: /limpar filtros/i })
    fireEvent.click(clearButton)
    expect(handleFiltersMock).toHaveBeenCalled()
  })
  it('should select the correct period filters', () => {
    const handleIntervalMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          handleFilters={() => {}}
          filters={{ entry: false, withdraw: false }}
          handleInterval={handleIntervalMock}
          interval={{ startDate: '', endDate: '' }}
        />
      </MemoryRouter>, { container: createRootContainer() }
    )
    expect(screen.getByTestId('select-value').innerHTML).toEqual('Últimos 7 dias')
    fireEvent.click(screen.getByTestId('select-period'))
    fireEvent.click(screen.getByText(/Últimos 30 dias/i))
    expect(handleIntervalMock).toHaveBeenCalled()
    expect(screen.getByTestId('select-value').innerHTML).toEqual('Últimos 30 dias')
  })
  it('should select the especific period filter and datepicker should show', () => {
    const handleIntervalMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          handleFilters={() => {}}
          filters={{ entry: false, withdraw: false }}
          handleInterval={handleIntervalMock}
          interval={{ startDate: '', endDate: '' }}
        />
      </MemoryRouter>, { container: createRootContainer() }
    )
    expect(screen.getByTestId('select-value').innerHTML).toEqual('Últimos 7 dias')
    fireEvent.click(screen.getByTestId('select-period'))
    fireEvent.click(screen.getByText(/Período Específico/i))
    expect(screen.getByRole('application', { name: /Calendar/i })).toBeInTheDocument()
  })
  it('should show the datepicker and close', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          handleFilters={() => {}}
          filters={{ entry: false, withdraw: false }}
          handleInterval={() => {}}
          interval={{ startDate: '', endDate: '' }}
        />
      </MemoryRouter>, { container: createRootContainer() }
    )
    expect(screen.getByTestId('select-value').innerHTML).toEqual('Últimos 7 dias')
    fireEvent.click(screen.getByTestId('select-period'))
    fireEvent.click(screen.getByText(/Período Específico/i))
    expect(screen.getByRole('application', { name: /Calendar/i })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'button close modal' }))
    expect(screen.queryByRole('application', { name: /Calendar/i })).toBeFalsy()
  })
  it('should show the datepicker and chose some date and apply', () => {
    const handleIntervalMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          handleFilters={() => {}}
          filters={{ entry: false, withdraw: false }}
          handleInterval={handleIntervalMock}
          interval={{ startDate: '', endDate: '' }}
        />
      </MemoryRouter>, { container: createRootContainer() }
    )
    expect(screen.getByTestId('select-value').innerHTML).toEqual('Últimos 7 dias')
    fireEvent.click(screen.getByTestId('select-period'))
    fireEvent.click(screen.getByText(/Período Específico/i))
    expect(screen.getByRole('application', { name: /Calendar/i })).toBeInTheDocument()
    fireEvent.change(screen.getByRole('textbox', { name: 'Data inicial'}), { target: { value: '28/09/2020'}})
    fireEvent.change(screen.getByRole('textbox', { name: 'Data final'}), { target: { value: '10/10/2020'}})
    fireEvent.click(screen.getByRole('button', { name: /Aplicar/i }))
    expect(handleIntervalMock).toHaveBeenCalled()
    expect(screen.getByText('28/09/2020 - 10/10/2020')).toBeInTheDocument()
  })
})
