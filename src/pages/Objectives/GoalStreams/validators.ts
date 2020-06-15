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
  moment(value, 'DD/MM/YYYY')
    .startOf('day')
    .isSameOrAfter(
      moment()
        .add(expectedDiff, expectedDiffType || 'month')
        .startOf('day')
    )

export const maxDate = (
  value: string,
  expectedDiff: number,
  expectedDiffType: TDateTypes
) =>
  moment(value, 'DD/MM/YYYY')
    .startOf('day')
    .isSameOrBefore(
      moment()
        .add(expectedDiff, expectedDiffType || 'month')
        .startOf('day')
    )

export const minValue = (value: string, minimum: string) => {
  const schema = number().min(+removeNonDigit(minimum))
  return schema.isValidSync(removeNonDigit(value.toString()))
}

export const betweenLength = (
  minLength: number,
  maxLength: number,
  value: string
) => {
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
    return 'Insira uma data válida, por favor.'
  }
  if (!minDate(value, minDateValues.value, minDateValues.type)) {
    return `Insira um prazo a partir de ${minDateValues.value} ${minDateValues.text}, por favor.`
  }
  if (!maxDate(value, maxDataValues.value, maxDataValues.type)) {
    return `Insira um prazo menor que ${maxDataValues.value} ${maxDataValues.text}, por favor.`
  }
  return undefined
}
