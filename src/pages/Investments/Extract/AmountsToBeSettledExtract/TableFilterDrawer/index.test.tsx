import React from 'react'
import moment from 'moment'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'
import { INTERVAL_SELECT_OPTIONS } from '../../constants'

import TableFilterDrawer from '.'

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

describe('TableFilterDrawer tests', () => {
  it('should exists', () => {
    expect(TableFilterDrawer).toBeDefined()
  })
  it('should be a drawer component', () => {
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={initialFilters}
        interval={initialInterval}
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
        filters={initialFilters}
        interval={initialInterval}
        selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={() => {}}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    expect(
      screen.getByRole('button', { name: 'arrowleft' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'close' })).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Logo Conquista Beta' })
    ).toBeInTheDocument()
  })
  it('should call handleClose at header', () => {
    const handleCloseMock = jest.fn()
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={initialFilters}
        interval={initialInterval}
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
        filters={initialFilters}
        interval={initialInterval}
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
    expect(
      screen.getByRole('button', { name: /cancelar/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /limpar/i })).toBeInTheDocument()
  })
  it('should have filter buttons', () => {
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={initialFilters}
        interval={initialInterval}
        selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={() => {}}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    expect(
      screen.getByRole('button', { name: /últimos 7 dias/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /últimos 30 dias/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /período específico/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /resgate/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /aplicação/i })
    ).toBeInTheDocument()
  })
  describe('the filter buttons should behave correctly:', () => {
    test('"Últimos 7 dias" button', () => {
      const handleSelectIntervalMock = jest.fn()
      renderWithReduxAndTheme(
        <TableFilterDrawer
          isOpen
          filters={initialFilters}
          interval={initialInterval}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
          handleClearFilters={() => {}}
          handleFilters={() => {}}
          handleInterval={() => {}}
          handleSelectInterval={handleSelectIntervalMock}
          onHandleClose={() => {}}
        />,
        { container: createRootContainer() }
      )
      const lastSevenDaysButton = screen.getByRole('button', {
        name: /últimos 7 dias/i,
      })
      fireEvent.click(lastSevenDaysButton)
      expect(handleSelectIntervalMock).toHaveBeenCalled()
    })
    test('"Últimos 30 dias" button', () => {
      const handleSelectIntervalMock = jest.fn()
      renderWithReduxAndTheme(
        <TableFilterDrawer
          isOpen
          filters={initialFilters}
          interval={initialInterval}
          selectedInterval={
            INTERVAL_SELECT_OPTIONS.MONTH_INTERVAL_SELECT_OPTION
          }
          handleClearFilters={() => {}}
          handleFilters={() => {}}
          handleInterval={() => {}}
          handleSelectInterval={handleSelectIntervalMock}
          onHandleClose={() => {}}
        />,
        { container: createRootContainer() }
      )
      const lastThirtyDaysButton = screen.getByRole('button', {
        name: /últimos 30 dias/i,
      })
      fireEvent.click(lastThirtyDaysButton)
      expect(handleSelectIntervalMock).toHaveBeenCalled()
    })
    test('"Período específico" button', () => {
      const handleSelectIntervalMock = jest.fn()
      renderWithReduxAndTheme(
        <TableFilterDrawer
          isOpen
          filters={initialFilters}
          interval={initialInterval}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
          handleClearFilters={() => {}}
          handleFilters={() => {}}
          handleInterval={() => {}}
          handleSelectInterval={handleSelectIntervalMock}
          onHandleClose={() => {}}
        />,
        { container: createRootContainer() }
      )
      const specificPeriodButton = screen.getByRole('button', {
        name: /período específico/i,
      })
      fireEvent.click(specificPeriodButton)
      expect(specificPeriodButton).toHaveStyleRule('border-color', '#00ADEF')
      expect(handleSelectIntervalMock).toHaveBeenCalled()
      expect(
        screen.getByRole('textbox', { name: /Data inicial/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: /Data final/i })
      ).toBeInTheDocument()
    })
    test('"Aplicação" button', () => {
      const handleSelectIntervalMock = jest.fn()
      renderWithReduxAndTheme(
        <TableFilterDrawer
          isOpen
          filters={initialFilters}
          interval={initialInterval}
          selectedInterval={
            INTERVAL_SELECT_OPTIONS.MONTH_INTERVAL_SELECT_OPTION
          }
          handleClearFilters={() => {}}
          handleFilters={() => {}}
          handleInterval={() => {}}
          handleSelectInterval={handleSelectIntervalMock}
          onHandleClose={() => {}}
        />,
        { container: createRootContainer() }
      )
      const applicationButton = screen.getByRole('button', {
        name: /aplicação/i,
      })
      fireEvent.click(applicationButton)
      expect(applicationButton).toHaveStyleRule('border-color', '#00ADEF')
    })
    test('"Resgate" button', () => {
      const handleSelectIntervalMock = jest.fn()
      renderWithReduxAndTheme(
        <TableFilterDrawer
          isOpen
          filters={initialFilters}
          interval={initialInterval}
          selectedInterval={
            INTERVAL_SELECT_OPTIONS.MONTH_INTERVAL_SELECT_OPTION
          }
          handleClearFilters={() => {}}
          handleFilters={() => {}}
          handleInterval={() => {}}
          handleSelectInterval={handleSelectIntervalMock}
          onHandleClose={() => {}}
        />,
        { container: createRootContainer() }
      )
      const redeemButton = screen.getByRole('button', { name: /resgate/i })
      fireEvent.click(redeemButton)
      expect(redeemButton).toHaveStyleRule('border-color', '#00ADEF')
    })
    test('"Limpar" button', () => {
      const handleClearFiltersMock = jest.fn()
      renderWithReduxAndTheme(
        <TableFilterDrawer
          isOpen
          filters={initialFilters}
          interval={initialInterval}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
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
    test('"Aplicar" button', () => {
      const handleFiltersMock = jest.fn()
      const handleIntervalMock = jest.fn()
      const handleCloseMock = jest.fn()

      renderWithReduxAndTheme(
        <TableFilterDrawer
          isOpen
          filters={initialFilters}
          interval={initialInterval}
          selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
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
  test('Datepicker should show when focusing an input: "Data inicial"', () => {
    const handleSelectIntervalMock = jest.fn()
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={initialFilters}
        interval={initialInterval}
        selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={handleSelectIntervalMock}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    const specificPeriodButton = screen.getByRole('button', {
      name: /período específico/i,
    })
    fireEvent.click(specificPeriodButton)
    fireEvent.focus(screen.getByRole('textbox', { name: /Data inicial/i }))
    expect(
      screen.getByRole('application', { name: /Calendar/i })
    ).toBeInTheDocument()
  })
  test('Date inputs should behave correclty', () => {
    const handleSelectIntervalMock = jest.fn()
    renderWithReduxAndTheme(
      <TableFilterDrawer
        isOpen
        filters={initialFilters}
        interval={initialInterval}
        selectedInterval={INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION}
        handleClearFilters={() => {}}
        handleFilters={() => {}}
        handleInterval={() => {}}
        handleSelectInterval={handleSelectIntervalMock}
        onHandleClose={() => {}}
      />,
      { container: createRootContainer() }
    )
    const specificPeriodButton = screen.getByRole('button', {
      name: /período específico/i,
    })
    fireEvent.click(specificPeriodButton)
    fireEvent.focus(screen.getByRole('textbox', { name: 'Data inicial' }))
    fireEvent.change(screen.getByRole('textbox', { name: 'Data inicial' }), {
      target: { value: '28/09/2020' },
    })
    fireEvent.focus(screen.getByRole('textbox', { name: 'Data inicial' }))
    fireEvent.change(screen.getByRole('textbox', { name: 'Data final' }), {
      target: { value: '10/10/2020' },
    })
    fireEvent.focusOut(screen.getByRole('textbox', { name: 'Data final' }))
    expect(screen.getByRole('textbox', { name: 'Data inicial' })).toHaveValue(
      '28/09/2020'
    )
    expect(screen.getByRole('textbox', { name: 'Data final' })).toHaveValue(
      '10/10/2020'
    )
  })
})
