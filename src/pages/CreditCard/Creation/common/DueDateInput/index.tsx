import React from 'react'
import moment from 'moment'

import { dict } from 'components/IconExporter'

import * as s from '../styles'

const validateDate = (value: string) => {
  const inputValue = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
  const today = moment().format('YYYY-MM-DD')

  // is valid date and past date
  if (moment(inputValue).isValid() && moment(inputValue).isAfter(today)) {
    return true
  }
  return false
}

interface IProps {
  dueDate: string
  setDueDate: (date: string) => void
}

const DueDateInput: React.FC<IProps> = ({ dueDate, setDueDate, ...rest }) => {
  const dueDateError = {
    icon: 'information' as keyof typeof dict,
    message: 'Digite uma data válida',
  }

  return (
    <s.DateInput
      newInput
      label="data de vencimento"
      error={(!validateDate(dueDate) || !dueDate.length) && dueDateError}
      value={dueDate}
      onChange={(e: any) => setDueDate(e.target.value)}
      {...rest}
    />
  )
}

export default DueDateInput
