import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import consortiumBuildingJobsMock from 'mocks/consortiumBuildingJobs.json'
import { createStore } from 'redux'
import userEvent from '@testing-library/user-event'
import FinacialCard from '.'

const label = {
  profession: 'Profissão',
  grossMonthlyIncome: 'Renda mensal bruta',
}

const data = {
  profession: '',
  grossMonthlyIncome: '',
}

const reducerMock = {
  jobsConsortiumBuilding: {
    data: consortiumBuildingJobsMock,
    hasError: false,
    isLoading: false,
  },
}

describe('Finacial Card component tests', () => {
  const storeMock = (state = reducerMock) => state
  const store = createStore(storeMock)

  it('should exists', () => {
    expect(FinacialCard).toBeDefined()
  })

  it('should selected item', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <FinacialCard financialData={[data, jest.fn()]} label={label} />,
      { store }
    )

    const select = getByTestId('select-Profissão')
    userEvent.click(select)
    const option = screen.getByTestId('option-Abastecedor')
    userEvent.click(option)
    expect(select).toBeVisible()
  })
})
