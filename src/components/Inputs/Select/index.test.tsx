import React from 'react'
import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import Select from './index'
import { TOptions } from './types'

let selected = {}

const changeSelected = (id: number, name: string) => {
  selected = {
    id,
    name,
  }
}

const options: TOptions[] = [
  {
    id: 1,
    name: 'Carro',
    icon: 'car2',
    onClick: () => changeSelected(1, 'Carro'),
  },
  {
    id: 2,
    name: 'Viagem',
    icon: 'plane',
    onClick: () => changeSelected(2, 'Viagem'),
  },
]

describe('Select component', () => {
  it('should render component', () => {
    renderWithReduxAndTheme(<Select selected={{}} options={options} />)
    expect(screen.getByDisplayValue('Selecione')).toBeDefined()
  })

  it('should show options when component is clicked', () => {
    renderWithReduxAndTheme(<Select selected={{}} options={options} />)

    expect(screen.getByDisplayValue('Selecione')).toBeDefined()
    expect(screen.queryByText(/car2.svg/g)).toBeNull()
    expect(screen.queryByText(/Carro/g)).toBeNull()
    expect(screen.queryByText(/plane.svg/g)).toBeNull()
    expect(screen.queryByText(/Viagem/g)).toBeNull()
    fireEvent.click(screen.getByTestId('input-container'))
    expect(screen.getByText(/car2.svg/g)).toBeDefined()
    expect(screen.getByText(/Carro/g)).toBeDefined()
    expect(screen.getByText(/plane.svg/g)).toBeDefined()
    expect(screen.getByText(/Viagem/g)).toBeDefined()
    fireEvent.click(screen.getByTestId('overlay'))
    expect(screen.queryByText(/car2.svg/g)).toBeNull()
    expect(screen.queryByText(/Carro/g)).toBeNull()
  })

  it('should select an option', () => {
    const { rerender } = renderWithReduxAndTheme(
      <Select selected={selected} options={options} />
    )

    expect(screen.getByDisplayValue('Selecione')).toBeDefined()
    expect(screen.queryByText(/car2.svg/g)).toBeNull()
    fireEvent.click(screen.getByTestId('input-container'))
    expect(screen.getByText(/car2.svg/g)).toBeDefined()
    fireEvent.click(screen.getByText(/car2.svg/g).parentElement as Element)
    rerender(<Select selected={selected} options={options} />)
    expect(screen.getByDisplayValue('Carro')).toBeDefined()
  })
})
