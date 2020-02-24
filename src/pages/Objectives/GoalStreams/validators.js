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
  moment(value, 'DD/MM/YYYY').fromNow() === 'Invalid date'

export const minDate = (value, expectedDiffDay) =>
  moment(value, 'DD/MM/YYYY').isSameOrAfter(
    moment().add(expectedDiffDay, 'day')
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
