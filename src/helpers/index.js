export const formatMoney = number =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    number
  )

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

export function handleExternalLink(link) {
  window.location.href = link
}
