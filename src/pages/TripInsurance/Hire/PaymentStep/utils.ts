export const getFlagCode = (
  isPortoCard: boolean,
  flagName: string
): 0 | 4 | 5 | 6 | 7 => {
  // se for cartão porto
  if (isPortoCard) {
    switch (true) {
      case flagName === 'visa':
        return 6
      case flagName === 'mastercard':
        return 7
      default:
        return 0
    }
    // caso não seja cartão porto
  }

  switch (true) {
    case flagName === 'visa':
      return 4
    case flagName === 'mastercard':
      return 5
    default:
      return 0
  }
}

export const getFlagName = (
  isPortoCard: boolean,
  flagCode: number
): 'visa' | 'mastercard' | '' => {
  // se for cartão porto
  if (isPortoCard) {
    switch (true) {
      case flagCode === 6:
        return 'visa'
      case flagCode === 7:
        return 'mastercard'
      default:
        return ''
    }
    // caso não seja cartão porto
  }

  switch (true) {
    case flagCode === 4:
      return 'visa'
    case flagCode === 5:
      return 'mastercard'
    default:
      return ''
  }
}
