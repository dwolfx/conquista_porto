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

export const minDate = (value, expectedDiff, expectedDiffType) =>
  moment(value, 'DD/MM/YYYY').isSameOrAfter(
    moment().add(expectedDiff, expectedDiffType || 'month')
  )

export const maxDate = (value, expectedDiff, expectedDiffType) =>
  moment(value, 'DD/MM/YYYY').isSameOrBefore(
    moment().add(expectedDiff, expectedDiffType || 'month')
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

export const validateDate = (value, minDateValues, maxDataValues) => {
  if (isInvalidDate(value)) {
    return 'Data inválida'
  }
  if (!minDate(value, minDateValues.value, minDateValues.type)) {
    return `Mínimo de ${minDateValues.value} ${minDateValues.text}`
  }
  if (!maxDate(value, maxDataValues.value, maxDataValues.type)) {
    return `Máximo de ${maxDataValues.value} ${maxDataValues.text}`
  }
  return undefined
}
