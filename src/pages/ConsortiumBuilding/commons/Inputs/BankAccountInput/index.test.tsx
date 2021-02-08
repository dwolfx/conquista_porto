import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import userEvent from '@testing-library/user-event'

import BankAccountInput from '.'

const setup = () =>
  renderWithReduxAndTheme(<BankAccountInput inputState={['', () => {}]} />)

describe('BankAccountInput component', () => {
  it('should exists', () => {
    setup()
    expect(BankAccountInput).toBeDefined()
  })
  it('Should have input max length equal 9', () => {
    setup()
    const textInput = screen.getByTestId('conta corrente')

    userEvent.type(textInput, '123456789111111')
    expect(textInput).toHaveValue('123456789')
  })
  it('Should accept only numbers', () => {
    setup()
    const textInput = screen.getByTestId('conta corrente')

    userEvent.type(textInput, 'A123X4567D89111Z111')
    expect(textInput).toHaveValue('123456789')
  })
})
