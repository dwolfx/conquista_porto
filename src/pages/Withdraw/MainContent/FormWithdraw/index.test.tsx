import React from 'react'
import { renderWithReduxAndTheme, fireEvent } from 'testUtils'

import FormWitdraw from '.'

describe('FormWitdraw', () => {
  const accountBalance = '1000'
  let formData = {
    withdrawValue: '',
  }

  const mockOnChangeFormData = jest.fn(newState => {
    formData = { ...formData, ...newState }
  })
  const mockIsValueValid = jest.fn()

  it('should be able to render form with a valid value', () => {
    const {
      getByDisplayValue,
      getByPlaceholderText,
      rerender,
    } = renderWithReduxAndTheme(
      <FormWitdraw
        formData={formData}
        onChangeFormData={mockOnChangeFormData}
        setIsInputValueValid={mockIsValueValid}
        accountBalanceValue={accountBalance}
      />
    )
    expect(getByPlaceholderText('0,00')).toBeDefined()

    fireEvent.change(getByPlaceholderText('0,00'), {
      target: { value: '110.90' },
    })

    rerender(
      <FormWitdraw
        formData={formData}
        onChangeFormData={mockOnChangeFormData}
        setIsInputValueValid={mockIsValueValid}
        accountBalanceValue={accountBalance}
      />
    )

    expect(getByDisplayValue('110,90')).toBeDefined()
  })

  it('should be able to set target value empty if the provided value is 0,00', () => {
    const {
      getByDisplayValue,
      getByPlaceholderText,
      rerender,
    } = renderWithReduxAndTheme(
      <FormWitdraw
        formData={formData}
        onChangeFormData={mockOnChangeFormData}
        setIsInputValueValid={mockIsValueValid}
        accountBalanceValue={accountBalance}
      />
    )

    fireEvent.change(getByPlaceholderText('0,00'), {
      target: { value: '0,00' },
    })

    rerender(
      <FormWitdraw
        formData={formData}
        onChangeFormData={mockOnChangeFormData}
        setIsInputValueValid={mockIsValueValid}
        accountBalanceValue={accountBalance}
      />
    )

    expect(getByDisplayValue('')).toBeDefined()
  })

  it('Should be able to display error alert if the input value is greater then account balance value', () => {
    const {
      getByText,
      getByPlaceholderText,
      rerender,
    } = renderWithReduxAndTheme(
      <FormWitdraw
        formData={formData}
        onChangeFormData={mockOnChangeFormData}
        setIsInputValueValid={mockIsValueValid}
        accountBalanceValue={accountBalance}
      />
    )

    fireEvent.change(getByPlaceholderText('0,00'), {
      target: { value: '1000.01' },
    })

    rerender(
      <FormWitdraw
        formData={formData}
        onChangeFormData={mockOnChangeFormData}
        setIsInputValueValid={mockIsValueValid}
        accountBalanceValue={accountBalance}
      />
    )

    expect(
      getByText((text, el) => {
        return text.includes(`O valor não pode ser maior do que R$ 1.000,00`)
      })
    ).toBeDefined()
  })

  it('Should be able to display error alert with 0 value if the input has some value and account balance is empty', () => {
    const {
      getByText,
      getByPlaceholderText,
      rerender,
    } = renderWithReduxAndTheme(
      <FormWitdraw
        formData={formData}
        onChangeFormData={mockOnChangeFormData}
        setIsInputValueValid={mockIsValueValid}
        accountBalanceValue={accountBalance}
      />
    )

    fireEvent.change(getByPlaceholderText('0,00'), {
      target: { value: '0.01' },
    })

    rerender(
      <FormWitdraw
        formData={formData}
        onChangeFormData={mockOnChangeFormData}
        setIsInputValueValid={mockIsValueValid}
        accountBalanceValue={''}
      />
    )

    expect(
      getByText((text, el) => {
        return text.includes(`O valor não pode ser maior do que R$ 0,00`)
      })
    ).toBeDefined()
  })
})
