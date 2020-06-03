export const formatMoney = (number, options) =>
  new Intl.NumberFormat(
    'pt-BR',
    options || { currency: 'BRL', style: 'currency' }
  ).format(number)

const UNICODE_NON_BREAKING_SPACE = String.fromCharCode(160)
const USUAL_SPACE = String.fromCharCode(32)

export const formatMoneyDecimal = (value = 0) => {
  const options = {
    currency: 'BRL',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'decimal',
  }
  return String(
    new Intl.NumberFormat('pt-BR', options).format(+value / 100)
  ).replace(UNICODE_NON_BREAKING_SPACE, USUAL_SPACE)
}

export const capitalize = stringValue => {
  if (typeof stringValue !== 'string') return ''
  return stringValue.charAt(0).toUpperCase() + stringValue.slice(1)
}

export const formatMoneyWithoutCurrencyFlag = value => {
  if (!value) {
    return 0
  }

  return value.toLocaleString('pt-BR')
}

export const formatDotToComma = value => value.toString().replace('.', ',')

export const formatCpf = value => {
  const numbers = value.toString().replace(/\D/g, '')

  if (numbers.length < 11) {
    return value
  }

  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

const hexToRgb = hex => {
  // if hex has only 3 codes, duplicate. ex: #fab => #ffaabb
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const newHex = hex.replace(
    shorthandRegex,
    (m, r, g, b) => r + r + g + g + b + b
  )

  // result must be 6 codes and is separated in 3 groups (red, green and blue)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newHex)
  // each group will be transformed to an integer (base 10) and will be add to the rgb format
  // if result dont exists, the color will return null
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export const rgba = (hex, alpha) => {
  const color = hexToRgb(hex)
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
}

export function handleGiwRedirect(link) {
  window.location.href = `${window.location.origin}/${link}`
}

export const formatDateMask = event => {
  const strippedValue = event.target.value.replace(/\D/g, '')
  let newValue = strippedValue
  if (strippedValue.length < 5) {
    newValue = strippedValue.replace(/(\d{2})(\d{1})/g, '$1/$2')
  } else {
    newValue = strippedValue.replace(/(\d{2})(\d{2})(\d{1})/g, '$1/$2/$3')
  }
  // eslint-disable-next-line no-param-reassign
  event.target.value = newValue
}

export const getCookieValue = key => {
  const regexPattern = `(?:(?:^|.*;\\s*)${key}\\s*=\\s*([^;]*).*$)|^.*$`
  const regExp = new RegExp(regexPattern, 'g')

  return document.cookie.replace(regExp, '$1')
}

export const setCookieValue = (key, value) => {
  let domain = ''

  if (
    process.env.REACT_APP_ENV !== 'development' &&
    process.env.REACT_APP_ENV !== 'local'
  ) {
    domain = '.portoseguro.brasil'
  }

  document.cookie = `${key}=${value};Path=/;Domain=${domain};`
}

export const removeCookieValue = key => {
  let domain = ''

  if (
    process.env.REACT_APP_ENV !== 'development' &&
    process.env.REACT_APP_ENV !== 'local'
  ) {
    domain = '.portoseguro.brasil'
  }

  document.cookie = `${key}=;Path=/;Domain=${domain};Expires=Thu, 01 Jan 1970 00:00:00 UTC`
}
