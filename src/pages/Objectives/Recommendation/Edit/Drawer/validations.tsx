import moment from 'moment'

export const ValidateNickname = (value: string) => {
  if (value.length <= 20) {
    return [true]
  }

  let errorMessage = ''

  if (value.length > 20) {
    errorMessage = 'Máximo 20 caracteres'
  }

  return [false, errorMessage]
}

export const ValidateInitialInvestment = (value: number) => {
  if (value >= 1000) {
    return [true]
  }

  return [false, 'Mínimo de R$ 1.000,00']
}

export const ValidateMonthlyInvestment = (value: number) => {
  if (value >= 100) {
    return [true]
  }

  return [false, 'Mínimo de R$ 100,00']
}

const isInvalidDate = (value: string) =>
  !moment(value, 'DD/MM/YYYY', true).isValid()

const minDate = (value: string, expectedDiffDay: number) =>
  moment(value, 'DD/MM/YYYY').isSameOrAfter(
    moment()
      .add(expectedDiffDay, 'day')
      .startOf('day')
  )

const maxDate = (value: string, expectedDiffYears: number) =>
  moment(value, 'DD/MM/YYYY').isSameOrBefore(
    moment()
      .add(expectedDiffYears, 'years')
      .startOf('day')
  )

export const ValidateTargetDate = (value: string) => {
  if (isInvalidDate(value)) {
    return [false, 'Data inválida']
  }

  const isValid = minDate(value, 180) && maxDate(value, 100)
  return isValid ? [true] : [false, 'Mínimo de 6 meses']
}
