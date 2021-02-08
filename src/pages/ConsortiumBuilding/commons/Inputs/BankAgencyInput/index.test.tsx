import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import userEvent from '@testing-library/user-event'

import BankAgencyInput from '.'

const setup = () =>
  renderWithReduxAndTheme(<BankAgencyInput inputState={['', () => {}]} />)

describe('BankAgencyInput component', () => {
  it('should exists', () => {
    setup()
    expect(BankAgencyInput).toBeDefined()
  })
  it('Should have input max length equal 4', () => {
    setup()
    const textInput = screen.getByTestId('agência')

    userEvent.type(textInput, '123456789111111')
    expect(textInput).toHaveValue('1234')
  })
  it('Should accept only numbers', () => {
    setup()
    const textInput = screen.getByTestId('agência')

    userEvent.type(textInput, 'A123X4567D89111Z111')
    expect(textInput).toHaveValue('1234')
  })
})
