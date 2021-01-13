import React from 'react'

import 'jest-styled-components'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import userEvent from '@testing-library/user-event'

import CreditCardNumberInput from '.'

const setup = () =>
  renderWithReduxAndTheme(
    <CreditCardNumberInput
      cardNumberState={['', () => {}]}
      selectedCreditCardIndex={0}
      isNumberValidState={[true, () => {}]}
      flagNameState={['', () => {}]}
    />
  )

describe('CreditCardNumberInput component', () => {
  it('should exists', () => {
    setup()
    expect(CreditCardNumberInput).toBeDefined()
  })
  it(`should format input value`, () => {
    setup()

    const creditCardNumberInput = screen.getByTestId('número do cartão')
    userEvent.type(creditCardNumberInput, '6362970000457013')
    expect(creditCardNumberInput).toHaveValue('6362 9700 0045 7013')
  })
  it(`should display 'visa' flag`, () => {
    renderWithReduxAndTheme(
      <CreditCardNumberInput
        cardNumberState={['', () => {}]}
        selectedCreditCardIndex={0}
        isNumberValidState={[true, () => {}]}
        flagNameState={['visa', () => {}]}
      />
    )

    const creditCardNumberInput = screen.getByTestId('número do cartão')
    userEvent.type(creditCardNumberInput, '4012001037141112')

    expect(screen.getByRole('img', { name: 'visa' })).toBeVisible()
  })
  it(`should display 'mastercard' flag`, () => {
    renderWithReduxAndTheme(
      <CreditCardNumberInput
        cardNumberState={['', () => {}]}
        selectedCreditCardIndex={0}
        isNumberValidState={[true, () => {}]}
        flagNameState={['mastercard', () => {}]}
      />
    )

    const creditCardNumberInput = screen.getByTestId('número do cartão')
    userEvent.type(creditCardNumberInput, '5555666677778884')

    expect(screen.getByRole('img', { name: 'mastercard' })).toBeVisible()
  })
  it(`should display error if creditCard has the same digit`, () => {
    renderWithReduxAndTheme(
      <CreditCardNumberInput
        cardNumberState={['1111111111111111', jest.fn()]}
        selectedCreditCardIndex={0}
        isNumberValidState={[false, jest.fn()]}
        flagNameState={['', jest.fn()]}
      />
    )

    const creditCardNumberInput = screen.getByTestId('número do cartão')
    userEvent.type(creditCardNumberInput, '1111111111111111')

    expect(
      screen.getByText(
        /Por favor, insira um número de cartão válido de 0-16 dígitos./i
      )
    ).toBeVisible()
  })
})
