import React from 'react'
import moment from 'moment'
import { MemoryRouter, HashRouter } from 'react-router-dom'
import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import { INTERVAL_SELECT_OPTIONS } from '../constants'

import ExtractFilter from '.'

import * as t from '../types'

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
  initialDate: moment()
    .subtract(7, 'days')
    .format('YYYY-MM-DD'),
  finalDate: moment().format('YYYY-MM-DD'),
}

const initialFilters: t.IAllocationType[] = []

describe('ExtractFilter tests', () => {
  it('should exists', () => {
    expect(ExtractFilter).toBeDefined()
  })
  it('should have the select period input', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <ExtractFilter
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
        <ExtractFilter
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
      screen.getByRole('button', { name: 'vínculo ao objetivo' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'desvínculo do objetivo' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'limpar filtros' })
    ).toBeInTheDocument()
  })
  it('should clean filters button behaves', () => {
    const handleCleanFiltersMock = jest.fn()
    renderWithReduxAndTheme(
      <MemoryRouter>
        <ExtractFilter
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
})
