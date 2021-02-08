import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import userEvent from '@testing-library/user-event'

import BankSelect from '.'

const setup = () => {
  return renderWithReduxAndTheme(
    <BankSelect selectedState={[{ id: 0, name: '' }, () => {}]} />
  )
}

describe('BankSelect component', () => {
  it('should exists', () => {
    setup()
    expect(BankSelect).toBeDefined()
  })
  it('Should open select when select is clicked', () => {
    setup()
    const select = screen.getByTestId('select-option-input-bancos')

    userEvent.click(select)
    expect(screen.getByRole('img', { name: 'arrowup' })).toBeVisible()
    expect(screen.getByText('HSBC Bank do Brasil')).toBeVisible()
  })
})
