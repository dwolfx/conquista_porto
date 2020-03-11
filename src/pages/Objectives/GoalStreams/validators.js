/* eslint-disable no-restricted-globals */
import { string, number } from 'yup'
import moment from 'moment'

const removeNonDigit = (value = '') => value.replace(/[\D]/g, '')

export const validateMaxLength = (value, maxLength) => {
  const schema = string().max(maxLength)
  return schema.isValidSync(value)
}

export const validateMinLength = (value, minLength) => {
  const schema = string().min(minLength)
  return schema.isValidSync(value)
}

export const isInvalidDate = value =>
  !moment(value, 'DD/MM/YYYY', true).isValid()

export const minDate = (value, expectedDiffMonth) =>
  moment(value, 'DD/MM/YYYY').isSameOrAfter(
    moment().add(expectedDiffMonth, 'month')
  )

export const maxDate = (value, expectedDiffMonth) =>
  moment(value, 'DD/MM/YYYY').isSameOrBefore(
    moment().add(expectedDiffMonth, 'month')
  )

export const minValue = (value, minimum) => {
  const schema = number().min(removeNonDigit(minimum))
  return schema.isValidSync(removeNonDigit(value))
}

export const betweenLength = (minLength, maxLength, value) => {
  const min = validateMinLength(value, minLength)
  const max = validateMaxLength(value, maxLength)
  return {
    min,
    max,
  }
}

export const validateDate = (value, minDateErrorText, maxDateErrorText) => {
  if (isInvalidDate(value)) {
    return 'Data inválida'
  }
  if (!minDate(value, 6)) {
    return minDateErrorText
  }
  if (!maxDate(value, 360)) {
    return maxDateErrorText
  }
  return undefined
}
