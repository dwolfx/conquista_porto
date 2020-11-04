import React from 'react'
import moment from 'moment'

import { dict } from 'components/IconExporter'

import * as s from '../styles'

export const isExpiredDateValid = (value: string) => {
  const inputValue = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
  const today = moment().format('YYYY-MM-DD')

  // is valid date and past date
  return (
    moment(inputValue).isValid() &&
    moment(inputValue).isAfter(today) &&
    value.length >= 10
  )
}

interface IProps {
  expiredDate: string
  setExpiredDate: (date: string) => void
}

const ExpiredDateInput: React.FC<IProps> = ({
  expiredDate,
  setExpiredDate,
  ...rest
}) => {
  const expiredDateError = {
    icon: 'information' as keyof typeof dict,
    message: 'Digite uma data válida',
  }

  return (
    <s.DateInput
      newInput
      label="data de vencimento"
      error={!isExpiredDateValid(expiredDate) && expiredDateError}
      value={expiredDate}
      onChange={(e: any) => setExpiredDate(e.target.value)}
      {...rest}
    />
  )
}

export default ExpiredDateInput
