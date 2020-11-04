import React from 'react'
import moment from 'moment'

import { dict } from 'components/IconExporter'

import * as s from '../styles'

export const isExpeditionDateValid = (value: string) => {
  const inputValue = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
  const today = moment().format('YYYY-MM-DD')

  // is valid date and past date
  return (
    moment(inputValue).isValid() &&
    moment(inputValue).isBefore(today) &&
    value.length >= 10
  )
}

interface IProps {
  expeditionDate: string
  setExpeditionDate: (date: string) => void
}

const ExpeditionDateInput: React.FC<IProps> = ({
  expeditionDate,
  setExpeditionDate,
  ...rest
}) => {
  const expeditionDateError = {
    icon: 'information' as keyof typeof dict,
    message: 'Digite uma data válida',
  }

  return (
    <s.DateInput
      newInput
      label="data de expedição"
      error={!isExpeditionDateValid(expeditionDate) && expeditionDateError}
      value={expeditionDate}
      onChange={(e: any) => setExpeditionDate(e.target.value)}
      {...rest}
    />
  )
}

export default ExpeditionDateInput
