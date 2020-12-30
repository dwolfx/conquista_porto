import React from 'react'
import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'
import userEvent from '@testing-library/user-event'

import Select from './index'
import { TOptions } from './types'

let selected = {}

const changeSelected = (id: number, text: string) => {
  selected = {
    id,
    text,
  }
}

const options: TOptions[] = [
  {
    id: 1,
    text: 'Carro',
    name: 'Carro',
    icon: 'car2',
    onClick: () => changeSelected(1, 'Carro'),
  },
  {
    id: 2,
    text: 'Viagem',
    name: 'Viagem',
    icon: 'plane',
    onClick: () => changeSelected(2, 'Viagem'),
  },
]

describe('Select component', () => {
  it('should render component', () => {
    renderWithReduxAndTheme(
      <Select label="Selecione" selected={{}} options={options} />
    )
    expect(screen.getByText(/selecione/i)).toBeVisible()
  })

  it('should show options when component is clicked', () => {
    renderWithReduxAndTheme(
      <Select
        label="Selecione"
        selected={{}}
        options={options}
        testId="select-test"
      />
    )

    expect(screen.getByText(/selecione/i)).toBeVisible()
    expect(screen.queryByText(/car2.svg/g)).toBeNull()
    expect(screen.queryByText(/Carro/g)).toBeNull()
    expect(screen.queryByText(/plane.svg/g)).toBeNull()
    expect(screen.queryByText(/Viagem/g)).toBeNull()
    fireEvent.click(screen.getByTestId('select-option-input-select-test'))
    expect(screen.getByText(/car2.svg/g)).toBeDefined()
    expect(screen.getByText(/Carro/g)).toBeDefined()
    expect(screen.getByText(/plane.svg/g)).toBeDefined()
    expect(screen.getByText(/Viagem/g)).toBeDefined()
    fireEvent.click(screen.getByTestId('select-overlay'))
    expect(screen.queryByText(/car2.svg/g)).toBeNull()
    expect(screen.queryByText(/Carro/g)).toBeNull()
  })

  it('should select an option', () => {
    const { rerender } = renderWithReduxAndTheme(
      <Select
        label="Selecione"
        selected={selected}
        options={options}
        testId="select-test"
      />
    )

    expect(screen.getByText(/selecione/i)).toBeVisible()
    expect(screen.queryByText(/car2.svg/g)).toBeNull()
    fireEvent.click(screen.getByTestId('select-option-input-select-test'))
    expect(screen.getByText(/car2.svg/g)).toBeDefined()
    fireEvent.click(screen.getByText(/car2.svg/g).parentElement as Element)
    rerender(
      <Select
        label="Selecione"
        selected={selected}
        options={options}
        testId="select-test"
      />
    )
    userEvent.click(screen.getByTestId('select-option-input-select-test'))
    expect(screen.getByText(/carro/i)).toBeDefined()
  })
})
