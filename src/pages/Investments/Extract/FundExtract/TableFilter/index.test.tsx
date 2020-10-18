import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import TableFilter from '.'
import { INTERVAL_SELECT_OPTIONS } from '../../constants'

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

describe('TableFilter tests', () => {
  it('should exists', () => {
    expect(TableFilter).toBeDefined()
  })
  it('should have the select period input', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          filters={{ quotaEater: false, redeem: false, apply: false }}
          handleFilters={() => {}}
          handleClearFilters={() => {}}
          handleInterval={() => {}}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
          handleSelectInterval={() => {}}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(screen.getByTestId('select-period')).toBeInTheDocument()
  })
  it('should select the correct period filters', () => {
    const handleSelectIntervalMock = jest.fn()
    const { rerender } = renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          filters={{ quotaEater: false, redeem: false, apply: false }}
          handleFilters={() => {}}
          handleClearFilters={() => {}}
          handleInterval={() => {}}
          handleSelectInterval={handleSelectIntervalMock}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(screen.getByTestId('select-value').innerHTML).toEqual('Últimos 7 dias')
    fireEvent.click(screen.getByTestId('select-period'))
    fireEvent.click(screen.getByText(/Últimos 30 dias/i))
    rerender(
      <MemoryRouter>
        <TableFilter
          filters={{ quotaEater: false, redeem: false, apply: false }}
          handleFilters={() => {}}
          handleClearFilters={() => {}}
          handleInterval={() => {}}
          handleSelectInterval={handleSelectIntervalMock}
          selectedInterval={INTERVAL_SELECT_OPTIONS.MONTH_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>
    )
    expect(handleSelectIntervalMock).toHaveBeenCalled()
    expect(screen.getByTestId('select-value').innerHTML).toEqual('Últimos 30 dias')
  })
  it('should select the especific period filter and datepicker should show', () => {
    const handleIntervalMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          filters={{ quotaEater: false, redeem: false, apply: false }}
          handleFilters={() => {}}
          handleClearFilters={() => {}}
          handleInterval={handleIntervalMock}
          handleSelectInterval={() => {}}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
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
          filters={{ quotaEater: false, redeem: false, apply: false }}
          handleFilters={() => {}}
          handleClearFilters={() => {}}
          handleInterval={() => {}}
          handleSelectInterval={() => {}}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
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
          filters={{ quotaEater: false, redeem: false, apply: false }}
          handleFilters={() => {}}
          handleClearFilters={() => {}}
          handleInterval={handleIntervalMock}
          handleSelectInterval={() => {}}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
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
  it('should have button filters', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter 
          filters={{ quotaEater: false, redeem: false, apply: false }}
          handleFilters={() => {}}
          handleClearFilters={() => {}}
          handleInterval={() => {}}
          handleSelectInterval={() => {}}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(screen.getByRole('button', { name: /aplicação/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /resgate/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /come-cotas/i })).toBeInTheDocument()
  })
  test('the button "aplicação" should behave correclty', () => {
    const handleFiltersMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter 
          handleFilters={handleFiltersMock}
          filters={{ apply: true, quotaEater: false, redeem: false }} 
          handleInterval={() => {}}
          handleClearFilters={() => {}}
          handleSelectInterval={() => {}}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    const applyButton = screen.getByRole('button', { name: /aplicação/i })
    fireEvent.click(applyButton)
    expect(applyButton).toHaveStyleRule('border-color', '#00ADEF')
    expect(handleFiltersMock).toHaveBeenCalled()
  })
  test('the button "resgate" should behave correclty', () => {
    const handleFiltersMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter 
          handleFilters={handleFiltersMock}
          filters={{ apply: false, quotaEater: false, redeem: true }} 
          handleInterval={() => {}}
          handleClearFilters={() => {}}
          handleSelectInterval={() => {}}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    const redeemButton = screen.getByRole('button', { name: /resgate/i })
    fireEvent.click(redeemButton)
    expect(redeemButton).toHaveStyleRule('border-color', '#00ADEF')
    expect(handleFiltersMock).toHaveBeenCalled()
  })
  test('the button "come-cotas" should behave correclty', () => {
    const handleFiltersMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter 
          handleFilters={handleFiltersMock}
          filters={{ apply: false, quotaEater: true, redeem: false }} 
          handleInterval={() => {}}
          handleClearFilters={() => {}}
          handleSelectInterval={() => {}}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    const quotaEaterButton = screen.getByRole('button', { name: /come-cotas/i })
    fireEvent.click(quotaEaterButton)
    expect(quotaEaterButton).toHaveStyleRule('border-color', '#00ADEF')
    expect(handleFiltersMock).toHaveBeenCalled()
  })
  it('should clean filters button behaves', () => {
    const handleCleanFiltersMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter 
          handleFilters={() => {}}
          filters={{ apply: true, quotaEater: false, redeem: true }} 
          handleInterval={() => {}}
          handleClearFilters={handleCleanFiltersMock}
          handleSelectInterval={() => {}}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    const clearButton = screen.getByRole('button', { name: /limpar filtros/i })
    fireEvent.click(clearButton)
    expect(handleCleanFiltersMock).toHaveBeenCalled()
  })
})