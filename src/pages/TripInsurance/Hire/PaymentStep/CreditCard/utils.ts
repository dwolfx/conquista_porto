import React from 'react'

import { dict } from 'components/IconExporter'

import { formatMoney } from 'helpers'

import { ICreditCardInstallment } from 'store/modules/TripInsurance/InsuranceQuotation/types'
import { IParcelOptionState, IOption } from '../types'

const formatText = (installment: ICreditCardInstallment): string =>
  installment.descricao.includes('x')
    ? `${installment.descricao} de ${formatMoney(installment.valor)}`
    : `1x de ${formatMoney(installment.valor)} (${installment.descricao})`

export const formatOption = (
  installment: ICreditCardInstallment,
  setParcelOption: React.Dispatch<React.SetStateAction<IParcelOptionState>>
): IOption => {
  return {
    id: +installment.id,
    text: formatText(installment),
    onClick: () =>
      setParcelOption({
        id: +installment.id,
        name: formatText(installment),
      }),
  }
}

export const applyValidityMask = (
  event: React.ChangeEvent<HTMLInputElement>,
  setValidityDate: React.Dispatch<React.SetStateAction<string>>
): void => {
  const strippedValue = event.target.value.replace(/\D/g, '')

  if (strippedValue.length <= 5) {
    event.target.value = strippedValue.replace(/(\d{2})(\d{1})/g, '$1/$2')
  } else {
    event.target.value = strippedValue.replace(/(\d{2})(\d{4})/g, '$1/$2')
  }

  setValidityDate(event.target.value)
}

export const validityError = {
  icon: 'information' as keyof typeof dict,
  message: 'Digite uma data válida.',
}
