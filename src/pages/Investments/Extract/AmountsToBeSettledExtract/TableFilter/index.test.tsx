import React from 'react'
import moment from 'moment'
import { MemoryRouter } from 'react-router-dom'
import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import { INTERVAL_SELECT_OPTIONS } from '../../constants'

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

const initialInterval = {
  startDate: moment()
    .subtract(7, 'days')
    .format('YYYY-MM-DD'),
  endDate: moment().format('YYYY-MM-DD'),
}

const initialFilters = {
  application: false,
  redeem: false,
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
          filters={initialFilters}
          handleInterval={() => {}}
          interval={initialInterval}
          handleClearFilters={() => {}}
          handleSelectInterval={() => {}}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(screen.getByTestId('select-period')).toBeInTheDocument()
  })
  it('should have button filters', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          handleFilters={() => {}}
          filters={initialFilters}
          handleInterval={() => {}}
          interval={initialInterval}
          handleClearFilters={() => {}}
          handleSelectInterval={() => {}}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(
      screen.getByRole('button', { name: /aplicação/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /resgate/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /limpar filtros/i })
    ).toBeInTheDocument()
  })
  test('the button "aplicação" should behave correctly', () => {
    const handleFiltersMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          handleFilters={handleFiltersMock}
          filters={{ ...initialFilters, application: true }}
          handleInterval={() => {}}
          interval={initialInterval}
          handleClearFilters={() => {}}
          handleSelectInterval={() => {}}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    const applicationButton = screen.getByRole('button', { name: /aplicação/i })
    fireEvent.click(applicationButton)
    expect(applicationButton).toHaveStyleRule('border-color', '#00ADEF')
    expect(handleFiltersMock).toHaveBeenCalled()
  })
  test('the button "resgate" should behave correctly', () => {
    const handleFiltersMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          handleFilters={handleFiltersMock}
          filters={{ ...initialFilters, redeem: true }}
          handleInterval={() => {}}
          interval={initialInterval}
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
  it('should clean filters buttons', () => {
    const handleCleanFiltersMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          handleFilters={() => {}}
          filters={initialFilters}
          handleInterval={() => {}}
          interval={initialInterval}
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
  it('should select the correct period filters', () => {
    const handleSelectIntervalMock = jest.fn()
    const { rerender } = renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          handleFilters={() => {}}
          filters={initialFilters}
          handleInterval={() => {}}
          interval={initialInterval}
          handleClearFilters={() => {}}
          handleSelectInterval={handleSelectIntervalMock}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(screen.getByTestId('select-value').innerHTML).toEqual(
      'Últimos 7 dias'
    )
    fireEvent.click(screen.getByTestId('select-period'))
    fireEvent.click(screen.getByText(/Últimos 30 dias/i))
    rerender(
      <MemoryRouter>
        <TableFilter
          handleFilters={() => {}}
          filters={initialFilters}
          handleInterval={() => {}}
          interval={initialInterval}
          handleClearFilters={() => {}}
          handleSelectInterval={handleSelectIntervalMock}
          selectedInterval={
            INTERVAL_SELECT_OPTIONS.MONTH_INTERVAL_SELECT_OPTION
          }
        />
      </MemoryRouter>
    )
    expect(handleSelectIntervalMock).toHaveBeenCalled()
    expect(screen.getByTestId('select-value').innerHTML).toEqual(
      'Últimos 30 dias'
    )
  })
  it('should select the especific period filter and datepicker should be showed', () => {
    const handleIntervalMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          handleFilters={() => {}}
          filters={initialFilters}
          handleInterval={handleIntervalMock}
          interval={initialInterval}
          handleClearFilters={() => {}}
          handleSelectInterval={() => {}}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(screen.getByTestId('select-value').innerHTML).toEqual(
      'Últimos 7 dias'
    )
    fireEvent.click(screen.getByTestId('select-period'))
    fireEvent.click(screen.getByText(/Período Específico/i))
    expect(
      screen.getByRole('application', { name: /Calendar/i })
    ).toBeInTheDocument()
  })
  it('should show the datepicker and close', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          handleFilters={() => {}}
          filters={initialFilters}
          handleInterval={() => {}}
          interval={initialInterval}
          handleClearFilters={() => {}}
          handleSelectInterval={() => {}}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(screen.getByTestId('select-value').innerHTML).toEqual(
      'Últimos 7 dias'
    )
    fireEvent.click(screen.getByTestId('select-period'))
    fireEvent.click(screen.getByText(/Período Específico/i))
    expect(
      screen.getByRole('application', { name: /Calendar/i })
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'button close modal' }))
    expect(screen.queryByRole('application', { name: /Calendar/i })).toBeFalsy()
  })
  it('should show the datepicker and choose some date and apply', () => {
    const handleIntervalMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <TableFilter
          handleFilters={() => {}}
          filters={initialFilters}
          handleInterval={handleIntervalMock}
          interval={initialInterval}
          handleClearFilters={() => {}}
          handleSelectInterval={() => {}}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(screen.getByTestId('select-value').innerHTML).toEqual(
      'Últimos 7 dias'
    )
    fireEvent.click(screen.getByTestId('select-period'))
    fireEvent.click(screen.getByText(/Período Específico/i))
    expect(
      screen.getByRole('application', { name: /Calendar/i })
    ).toBeInTheDocument()
    fireEvent.change(screen.getByRole('textbox', { name: 'Data inicial' }), {
      target: { value: '28/09/2020' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Data final' }), {
      target: { value: '10/10/2020' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Aplicar/i }))
    expect(handleIntervalMock).toHaveBeenCalled()
    expect(screen.getByText('28/09/2020 - 10/10/2020')).toBeInTheDocument()
  })
})
