import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import TableFilterDrawer from '.'
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

describe('TableFilterDrawer (fund) tests', () => {
  it('should exists', () => {
    expect(TableFilterDrawer).toBeDefined()
  })
  it('should be a drawer component', () => {
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={{ quotaEater: false, redeem: false, apply: false }}
        interval={{ startDate: '', endDate: ''}}
        selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={() => {}}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    expect(screen.getByTestId('extract-filter-drawer')).toBeInTheDocument()
  })
  it('should have a header with 2 buttons and logo', () => {
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={{ quotaEater: false, redeem: false, apply: false }}
        interval={{ startDate: '', endDate: ''}}
        selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={() => {}}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    expect(screen.getByRole('button', { name: 'arrowleft' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'close' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Logo Conquista Beta' })).toBeInTheDocument()
  })
  test('header should behave correclty', () => {
    const handleCloseMock = jest.fn()
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={{ quotaEater: false, redeem: false, apply: false }}
        interval={{ startDate: '', endDate: ''}}
        selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={() => {}}
        onHandleClose={handleCloseMock}
      />,
      { container: createRootContainer() }
    )
    fireEvent.click(screen.getByRole('button', { name: 'arrowleft' }))
    fireEvent.click(screen.getByRole('button', { name: 'close' }))
    expect(handleCloseMock).toHaveBeenCalledTimes(2)
  })
  it('should have a footer with 3 buttons', () => {
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={{ quotaEater: false, redeem: false, apply: false }}
        interval={{ startDate: '', endDate: ''}}
        selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={() => {}}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    expect(screen.getByRole('button', { name: /aplicar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /limpar/i })).toBeInTheDocument()
  })
  it('should have button filters', () => {
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={{ quotaEater: false, redeem: false, apply: false }}
        interval={{ startDate: '', endDate: ''}}
        selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={() => {}}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    expect(screen.getByRole('button', { name: /últimos 7 dias/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /últimos 30 dias/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /período específico/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /aplicação/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /resgate/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /come-cotas/i })).toBeInTheDocument()
  })
  test('the filter buttons should behave correclty: "Últimos 7 dias"', () => {
    const handleSelectIntervalMock = jest.fn()
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={{ quotaEater: false, redeem: false, apply: false }}
        interval={{ startDate: '', endDate: ''}}
        selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={handleSelectIntervalMock}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    const lastSevenDaysButton = screen.getByRole('button', { name: /últimos 7 dias/i })
    fireEvent.click(lastSevenDaysButton)
    expect(handleSelectIntervalMock).toHaveBeenCalled()
  })
  test('the filter buttons should behave correclty: "Últimos 30 dias"', () => {
    const handleSelectIntervalMock = jest.fn()
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={{ quotaEater: false, redeem: false, apply: false }}
        interval={{ startDate: '', endDate: ''}}
        selectedInterval={INTERVAL_SELECT_OPTIONS.MONTH_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={handleSelectIntervalMock}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    const lastThirtyDaysButton = screen.getByRole('button', { name: /últimos 30 dias/i })
    fireEvent.click(lastThirtyDaysButton)
    expect(handleSelectIntervalMock).toHaveBeenCalled()
  })
  test('the filter buttons should behave correclty: "Período específico"', () => {
    const handleSelectIntervalMock = jest.fn()
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={{ quotaEater: false, redeem: false, apply: false }}
        interval={{ startDate: '', endDate: ''}}
        selectedInterval={INTERVAL_SELECT_OPTIONS.SPECIFIC_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={handleSelectIntervalMock}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    const specificPeriodButton = screen.getByRole('button', { name: /período específico/i })
    fireEvent.click(specificPeriodButton)
    expect(specificPeriodButton).toHaveStyleRule('border-color', '#00ADEF')
    expect(handleSelectIntervalMock).toHaveBeenCalled()
    expect(screen.getByRole('textbox', { name: /Data inicial/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /Data final/i })).toBeInTheDocument()
    // expect(screen.getByRole('application', { name: /Calendar/i })).toBeInTheDocument()
  })
  test('Datepicker should show when focusing an input: "Data inicial"', () => {
    const handleSelectIntervalMock = jest.fn()
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={{ quotaEater: false, redeem: false, apply: false }}
        interval={{ startDate: '', endDate: ''}}
        selectedInterval={INTERVAL_SELECT_OPTIONS.SPECIFIC_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={handleSelectIntervalMock}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    const specificPeriodButton = screen.getByRole('button', { name: /período específico/i })
    fireEvent.click(specificPeriodButton)
    fireEvent.focus(screen.getByRole('textbox', { name: /Data inicial/i }))
    expect(screen.getByRole('application', { name: /Calendar/i })).toBeInTheDocument()
  })
  test('Date inputs should behave correclty', () => {
    const handleSelectIntervalMock = jest.fn()
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={{ quotaEater: false, redeem: false, apply: false }}
        interval={{ startDate: '', endDate: ''}}
        selectedInterval={INTERVAL_SELECT_OPTIONS.SPECIFIC_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={handleSelectIntervalMock}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    const specificPeriodButton = screen.getByRole('button', { name: /período específico/i })
    fireEvent.click(specificPeriodButton)
    fireEvent.focus(screen.getByRole('textbox', { name: 'Data inicial'}))
    fireEvent.change(screen.getByRole('textbox', { name: 'Data inicial'}), { target: { value: '28/09/2020'}})
    fireEvent.focus(screen.getByRole('textbox', { name: 'Data inicial'}))
    fireEvent.change(screen.getByRole('textbox', { name: 'Data final'}), { target: { value: '10/10/2020'}})
    fireEvent.focusOut(screen.getByRole('textbox', { name: 'Data final'}))
    expect(screen.getByRole('textbox', { name: 'Data inicial'})).toHaveValue('28/09/2020')
    expect(screen.getByRole('textbox', { name: 'Data final'})).toHaveValue('10/10/2020')
  })
  test('the filter buttons should behave correclty: "Aplicação"', () => {
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={{ quotaEater: false, redeem: false, apply: false }}
        interval={{ startDate: '', endDate: ''}}
        selectedInterval={INTERVAL_SELECT_OPTIONS.MONTH_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={() => {}}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    const applyButton = screen.getByRole('button', { name: /aplicação/i })
    fireEvent.click(applyButton)
    expect(applyButton).toHaveStyleRule('border-color', '#00ADEF')
  })
  test('the filter buttons should behave correclty: "Resgate"', () => {
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={{ quotaEater: false, redeem: false, apply: false }}
        interval={{ startDate: '', endDate: ''}}
        selectedInterval={INTERVAL_SELECT_OPTIONS.MONTH_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={() => {}}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    const redeemButton = screen.getByRole('button', { name: /resgate/i })
    fireEvent.click(redeemButton)
    expect(redeemButton).toHaveStyleRule('border-color', '#00ADEF')
  })
  test('the filter buttons should behave correclty: "Come-Cotas"', () => {
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={{ quotaEater: false, redeem: false, apply: false }}
        interval={{ startDate: '', endDate: ''}}
        selectedInterval={INTERVAL_SELECT_OPTIONS.MONTH_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={() => {}}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    const quotaEaterButton = screen.getByRole('button', { name: /come-cotas/i })
    fireEvent.click(quotaEaterButton)
    expect(quotaEaterButton).toHaveStyleRule('border-color', '#00ADEF')
  })
  it('should behave correclty the clear filters button', () => {
    const handleClearFiltersMock = jest.fn()
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={{ quotaEater: false, redeem: false, apply: false }}
        interval={{ startDate: '', endDate: ''}}
        selectedInterval={INTERVAL_SELECT_OPTIONS.MONTH_INTERVAL_SELECT_OPTION}
        handleClearFilters={handleClearFiltersMock}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={() => {}}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    const clearButton = screen.getByRole('button', { name: /limpar/i })
    fireEvent.click(clearButton)
    expect(handleClearFiltersMock).toHaveBeenCalled()
  })
  it('should behave correclty the apply filters button', () => {
    const handleFiltersMock = jest.fn()
    const handleIntervalMock = jest.fn()
    const handleCloseMock = jest.fn()

    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={{ quotaEater: true, redeem: false, apply: false }}
        interval={{ startDate: '', endDate: ''}}
        selectedInterval={INTERVAL_SELECT_OPTIONS.MONTH_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={handleFiltersMock}
        handleInterval={handleIntervalMock}
        handleSelectInterval={() => {}}
        onHandleClose={handleCloseMock}
      />,
      { container: createRootContainer() }
    )
    const applyButton = screen.getByRole('button', { name: /aplicar/i })
    fireEvent.click(applyButton)
    expect(handleFiltersMock).toHaveBeenCalled()
    expect(handleIntervalMock).toHaveBeenCalled()
    expect(handleCloseMock).toHaveBeenCalled()
  })
})