import React from 'react'

import MoneyInput from 'components/Inputs/Money'

import { formatMoney, formatLocaleStringToNumber } from 'helpers'

import { IFormData } from '../types'
import * as s from './styles'

interface IFormWithdraw {
  formData: IFormData
  onChangeFormData: (formData: IFormData) => void
  setIsInputValueValid: (isValueValid: boolean) => void
  accountBalanceValue: string
}

const FormWithdraw = React.forwardRef<HTMLInputElement, IFormWithdraw>(
  (
    { formData, onChangeFormData, setIsInputValueValid, accountBalanceValue },
    ref
  ) => {
    const innerRef =
      ref || (React.createRef() as React.RefObject<HTMLInputElement>)

    const isAmountGreaterThanAccountBalance = () => {
      const withdrawValue = formatLocaleStringToNumber(formData.withdrawValue)

      setIsInputValueValid(
        !(withdrawValue > +accountBalanceValue || withdrawValue === 0)
      )

      return withdrawValue > +accountBalanceValue
    }

    return (
      <s.InputWrapper>
        <s.LabelText type="headline" color="gray6">
          Quanto você quer retirar?
        </s.LabelText>
        <MoneyInput
          ref={innerRef}
          data-gtm-form="input"
          data-gtm-name="quanto retirar"
          value={formData.withdrawValue}
          placeholder="0,00"
          onChange={({ target }) => {
            onChangeFormData({
              ...formData,
              withdrawValue: target.value === '0,00' ? '' : target.value,
            })
          }}
          error={
            isAmountGreaterThanAccountBalance() && {
              icon: 'alertrounded',
              message: `O valor não pode ser maior do que ${formatMoney(
                accountBalanceValue ? accountBalanceValue : '0'
              )}`,
            }
          }
        />
      </s.InputWrapper>
    )
  }
)

export default FormWithdraw
