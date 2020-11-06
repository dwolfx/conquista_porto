import Cookies from 'js-cookie'

type IFormatMoneyOptions = {
  currency?: string
  style?: string
  fractionDigits?: number
}

export const formatMoney = (
  number: string | number,
  options?: IFormatMoneyOptions
) => {
  const convertedToNumber = Number(number)
  const defaultOptions = {
    currency: 'BRL',
    style: 'currency',
    fractionDigits: 2,
    ...options,
  }
  return new Intl.NumberFormat('pt-BR', {
    ...defaultOptions,
    minimumFractionDigits: defaultOptions.fractionDigits,
    maximumFractionDigits: defaultOptions.fractionDigits,
  }).format(convertedToNumber)
}

export const formatMoneyDecimal = (value: number | string = 0) => {
  const options = {
    currency: 'BRL',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'decimal',
  }
  return String(new Intl.NumberFormat('pt-BR', options).format(+value / 100))
}

export const capitalize = (stringValue: string) => {
  if (typeof stringValue !== 'string') return ''
  return stringValue.charAt(0).toUpperCase() + stringValue.slice(1)
}

export const formatMoneyWithoutCurrencyFlag = (value: string) => {
  if (!value) {
    return 0
  }

  return value.toLocaleString()
}

interface FormatNumberOptions extends Intl.NumberFormatOptions {}

export const formatNumber = (
  value: string | number,
  options?: FormatNumberOptions
) => new Intl.NumberFormat('pt-BR', options).format(+value)

export const formatCpf = (value: string) => {
  const numbers = value.replace(/\D/g, '')

  if (numbers.length < 11) {
    return value
  }

  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

const hexToRgb = (hex: string) => {
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

export const rgba = (hex: string, alpha: number | string) => {
  const color: {
    r: number
    g: number
    b: number
  } | null = hexToRgb(hex)
  return `rgba(${color?.r}, ${color?.g}, ${color?.b}, ${alpha})`
}

export function handleGiwRedirect(link: string) {
  window.location.href = `${window.location.origin}/${link}`
}

export const getCookieValue = (key: string) => {
  return Cookies.get(key)
}

export const setCookieValue = (key: string, value: string) => {
  let domain = ''

  if (
    process.env.REACT_APP_ENV !== 'development' &&
    process.env.REACT_APP_ENV !== 'local'
  ) {
    // get domain without the subdomain (cliente.portoseguro.com.br / otclienthom.portoseguro.brasil)
    domain = window.location.hostname.substr(
      window.location.hostname.indexOf('.portoseguro'),
      window.location.hostname.length
    )
  }

  Cookies.set(key, value, { domain })
}

export const removeCookieValue = (key: string) => {
  let domain = ''

  if (
    process.env.REACT_APP_ENV !== 'development' &&
    process.env.REACT_APP_ENV !== 'local'
  ) {
    // get domain without the subdomain (cliente.portoseguro.com.br / otclienthom.portoseguro.brasil)
    domain = window.location.hostname.substr(
      window.location.hostname.indexOf('.portoseguro'),
      window.location.hostname.length
    )
  }

  Cookies.remove(key, { domain })
}

export const formatLocaleStringToNumber = (value: string) =>
  +value.replace(/\./g, '').replace(',', '.')

export const replacePatternToComponent = (
  text: string,
  pattern: RegExp,
  Component: React.ReactNode
) => {
  const splitText = text.split(pattern)
  const matches = text.match(pattern)

  if (splitText.length <= 1) {
    return text
  }

  return splitText.reduce((acc: React.ReactNode[], cur: string) => {
    if (!cur) return acc

    if (matches?.includes(cur)) {
      return [...acc, Component]
    }

    return [...acc, cur]
  }, [])
}

export const printFieldText = (text: string | undefined) => {
  if (!text) {
    return '---'
  }

  let innerText: number | string = formatNumber(text)

  if (isNaN(+text)) {
    innerText = text
  }

  return text && text !== '-' ? innerText : '---'
}

export const printFieldTextWithPercent = (text: string) =>
  text && text !== '-' ? `${formatNumber(text)}%` : '---'

/* Função responsável por criar uma máscara e esconder parte do e-mail */
export const hideEmailCharacters = (email: string): string => {
  if (email.length < 1) return '****@****'
  const emailSplit = email.split('@')
  return emailSplit[0]
    .substring(0, 2)
    .concat('****@****')
    .concat(emailSplit[1].substring(4, emailSplit[1].length))
}

export const truncateString = (str: string, num: number) => {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + '...'
}

export const formatPhoneNumber = (
  areaCode: number | undefined,
  phoneNumber: number | undefined
) => {
  if (!areaCode || !phoneNumber) {
    return ''
  } else {
    return String(phoneNumber).length === 9
      ? `${areaCode}${phoneNumber}`.replace(
          /(\d{2})(\d{1})(\d{4})(\d{4})/,
          '($1) $2 $3-$4'
        )
      : `${areaCode}${phoneNumber}`.replace(
          /(\d{2})(\d{4})(\d{4})/,
          '($1) $2-$3'
        )
  }
}
