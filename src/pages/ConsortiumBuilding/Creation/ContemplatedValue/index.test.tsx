import React from 'react'
import { screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import { renderWithReduxAndTheme } from 'testUtils'
import { createStore } from 'redux'
import { formatMoneyDecimal } from 'helpers'
import ContemplatedValue from '.'

const reducerMock = {
  contemplated: {
    data: {
      codigo_produto: 1,
      valor_minimo_parcela: 300,
      valor_maximo_parcela: 3200,
      valor_minimo_credito: 20000,
      valor_maximo_credito: 200000,
    },
    isLoading: false,
    status: '',
  },
  fluxManagement: {
    stack: [],
  },
}

describe('ContemplatedValue', () => {
  const storeMock = (state = reducerMock) => state
  const store = createStore(storeMock)

  it('Should exist', () => {
    expect(ContemplatedValue).toBeDefined()
  })

  it('Should show error message if the value not belong to interval', () => {
    const { getByTestId } = renderWithReduxAndTheme(<ContemplatedValue />, {
      store,
    })

    const input = getByTestId('financial-application-money-input')
    fireEvent.change(input, { target: { value: '10.000,00' } })

    expect(
      screen.getByText(
        `O valor deve ser entre R$ ${reducerMock.contemplated.data &&
          formatMoneyDecimal(
            reducerMock.contemplated.data.valor_minimo_credito * 100
          )} e R$ ${reducerMock.contemplated.data &&
          formatMoneyDecimal(
            reducerMock.contemplated.data.valor_maximo_credito * 100
          )}`
      )
    ).toBeInTheDocument()
  })

  it('Should enable button if the value belong to interval', async () => {
    const { getByTestId } = renderWithReduxAndTheme(<ContemplatedValue />, {
      store,
    })

    const input = getByTestId('financial-application-money-input')
    fireEvent.change(input, { target: { value: '50.000,00' } })
    expect(screen.getByText('Simular').closest('button')).not.toBeDisabled()
  })

  it('Should button be disabled if the value is out of the interval', async () => {
    const { getByTestId } = renderWithReduxAndTheme(<ContemplatedValue />, {
      store,
    })

    const input = getByTestId('financial-application-money-input')
    fireEvent.change(input, { target: { value: '100.000.000,00' } })
    expect(screen.getByText('Simular').closest('button')).toBeDisabled()
  })
})
