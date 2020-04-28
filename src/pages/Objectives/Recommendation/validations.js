import moment from 'moment'

export const ValidateNickname = value => {
  if (value.length >= 3 && value.length <= 19) {
    return [true]
  }

  let errorMessage = ''
  if (value.length < 3) errorMessage = 'Mínimo 3 caracteres'
  if (value.length > 19) errorMessage = 'Máximo 19 caracteres'
  return [false, errorMessage]
}

export const ValidateInitialInvestment = value => {
  const numbers = (+value.replace(/\D/g, '')).toString()
  const integer = numbers.slice(0, numbers.length - 2)
  if (+integer >= 1000) return [true]
  return [false, 'Mínimo de R$ 1.000,00']
}

export const ValidateMonthlyInvestment = value => {
  const numbers = (+value.replace(/\D/g, '')).toString()
  const integer = numbers.slice(0, numbers.length - 2)
  if (+integer >= 100) return [true]
  return [false, 'Mínimo de R$ 100,00']
}

export const ValidateTargetDate = value => {
  const isInvalidDate = () => !moment(value, 'DD/MM/YYYY', true).isValid()

  const minDate = expectedDiffDay =>
    moment(value, 'DD/MM/YYYY').isSameOrAfter(
      moment().add(expectedDiffDay, 'day')
    )

  const validateMinDate = () => {
    if (isInvalidDate(value)) {
      return [false, 'Data Inválida']
    }
    const isValid = minDate(180)
    return isValid ? [true] : [false, 'Mínimo de 6 meses']
  }

  return validateMinDate()
}
