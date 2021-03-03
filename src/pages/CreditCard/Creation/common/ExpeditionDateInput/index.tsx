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
  touched: boolean
  handleTouchField: () => void
  setExpeditionDate: (date: string) => void
}
const ExpeditionDateInput: React.FC<IProps> = ({
  expeditionDate,
  setExpeditionDate,
  handleTouchField,
  touched,
  ...rest
}) => {
  const expeditionDateError = {
    icon: 'information' as keyof typeof dict,
    message: 'Digite uma data válida',
  }

  return (
    <s.DateInput
      newInput
      placeholder="Digite aqui..."
      label="data de expedição"
      error={((!expeditionDate.length || !isExpeditionDateValid(expeditionDate)) && touched) && expeditionDateError }
      value={expeditionDate}
      onChange={(e: any) => {
        handleTouchField()
        setExpeditionDate(e.target.value) 
      }}
      {...rest}
    />
  )
}

export default ExpeditionDateInput
