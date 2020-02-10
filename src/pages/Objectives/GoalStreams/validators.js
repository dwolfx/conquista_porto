/* eslint-disable no-restricted-globals */
import { string, number } from 'yup'
import moment from 'moment'

const removeNonDigit = (value = '') => value.replace(/[\D]/g, '')

export const validateMaxLength = (value, maxLength) => {
  const schema = string().max(maxLength)
  return schema.isValid(value)
}

export const validateMinLength = (value, minLength) => {
  const schema = string().min(minLength)
  return schema.isValid(value)
}

export const minDate = (value, expectedDiffDay) => {
  const [vDay, vMonth, vYear] = value.split('/')
  const receivedDate = moment([
    parseInt(vYear, 10),
    parseInt(vMonth, 10) - 1,
    parseInt(vDay, 10),
  ])

  const diff = receivedDate.diff(moment(), 'day')
  return diff >= expectedDiffDay
}

export const minValue = (value, minimum) => {
  const schema = number().min(removeNonDigit(minimum))
  return schema.isValid(removeNonDigit(value))
}

export const betweenLength = async (minLength, maxLength, value) => {
  const min = await validateMinLength(value, minLength)
  const max = await validateMaxLength(value, maxLength)
  return {
    min,
    max,
  }
}
