import React from 'react'

import { formatMoney, formatLocaleStringToNumber } from 'helpers'

import { IFormData } from '../types'
import * as s from './styles'

interface IFormWithdraw {
  formData: IFormData
  onChangeFormData: (formData: IFormData) => void
  setIsInputValueValid: (isValueValid: boolean) => void
  accountBalanceValue: string
  onEnterPress?: () => void
  blocked?: boolean
}

const FormWithdraw = React.forwardRef<HTMLInputElement, IFormWithdraw>(
  (
    {
      formData,
      onChangeFormData,
      setIsInputValueValid,
      accountBalanceValue,
      onEnterPress,
      blocked,
    },
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
        <s.MoneyInput
          ref={innerRef}
          data-gtm-form="input"
          data-gtm-name="quanto retirar"
          value={formData.withdrawValue}
          placeholder="0,00"
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
            onChangeFormData({
              ...formData,
              withdrawValue: target.value === '0,00' ? '' : target.value,
            })
          }}
          onKeyUp={({ keyCode }: React.KeyboardEvent) => {
            if (keyCode === 13 && onEnterPress) {
              onEnterPress()
            }
          }}
          error={
            isAmountGreaterThanAccountBalance() && {
              icon: 'alertrounded',
              message: `O valor não pode ser maior do que ${formatMoney(
                accountBalanceValue ? accountBalanceValue : '0'
              )}`,
            }
          }
          blocked={blocked}
        />
      </s.InputWrapper>
    )
  }
)

export default FormWithdraw
