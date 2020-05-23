/* eslint-disable no-restricted-globals */
import { string, number } from 'yup'
import moment from 'moment'

type TDateTypes = 'month' | 'months' | 'years'

const removeNonDigit = (value = '') => value.replace(/[\D]/g, '')

export const validateMaxLength = (value: string, maxLength: number) => {
  const schema = string().max(maxLength)
  return schema.isValidSync(value)
}

export const validateMinLength = (value: string, minLength: number) => {
  const schema = string().min(minLength)
  return schema.isValidSync(value)
}

export const isInvalidDate = (value: string) =>
  !moment(value, 'DD/MM/YYYY', true).isValid()

export const minDate = (
  value: string,
  expectedDiff: number,
  expectedDiffType: TDateTypes
) =>
  moment(value, 'DD/MM/YYYY').isSameOrAfter(
    moment().add(expectedDiff, expectedDiffType || 'month')
  )

export const maxDate = (
  value: string,
  expectedDiff: number,
  expectedDiffType: TDateTypes
) =>
  moment(value, 'DD/MM/YYYY').isSameOrBefore(
    moment().add(expectedDiff, expectedDiffType || 'month')
  )

export const minValue = (value: number, minimum: string) => {
  const schema = number().min(+removeNonDigit(minimum))
  return schema.isValidSync(removeNonDigit(value.toString()))
}

export const betweenLength = (minLength: number, maxLength: number, value: string) => {
  const min = validateMinLength(value, minLength)
  const max = validateMaxLength(value, maxLength)
  return {
    min,
    max,
  }
}

export interface IDateValues {
  value: number
  type: TDateTypes
  text: string
}

export const validateDate = (
  value: string,
  minDateValues: IDateValues,
  maxDataValues: IDateValues
) => {
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
