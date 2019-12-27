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
