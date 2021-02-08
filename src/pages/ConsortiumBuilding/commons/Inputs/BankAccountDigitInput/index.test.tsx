import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import userEvent from '@testing-library/user-event'

import BankAccountDigitInput from '.'

const setup = () =>
  renderWithReduxAndTheme(<BankAccountDigitInput inputState={['', () => {}]} />)

describe('BankAccountDigitInput component', () => {
  it('should exists', () => {
    setup()
    expect(BankAccountDigitInput).toBeDefined()
  })
  it('Should have input max length equal 1', () => {
    setup()
    const textInput = screen.getByTestId('dígito')

    userEvent.type(textInput, '912111')
    expect(textInput).toHaveValue('9')

    userEvent.type(textInput, '{backspace}X2199')
    expect(textInput).toHaveValue('X')
  })
})
