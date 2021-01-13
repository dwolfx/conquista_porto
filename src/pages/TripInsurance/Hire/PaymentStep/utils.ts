export const getFlagCode = (
  isPortoCard: boolean,
  flagName: string
): 0 | 4 | 5 | 6 | 7 => {
  //se for cartão porto
  if (isPortoCard) {
    switch (true) {
      case flagName === 'visa':
        return 6
      case flagName === 'mastercard':
        return 7
      default:
        return 0
    }
    //caso não seja cartão porto
  } else {
    switch (true) {
      case flagName === 'visa':
        return 4
      case flagName === 'mastercard':
        return 5
      default:
        return 0
    }
  }
}
