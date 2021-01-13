import { dict } from 'components/IconExporter'
import { TFlagName } from '../../types'

const cardFlags = {
  // elo: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|50(9[0-9][0-9][0-9])|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|05([7-9])|06([0-9])|07([0-9])|08([0-9])|4([0-3][0-9]|8[5-9]|9[0-9])|5([0-9][0-9]|3[0-8])|9([0-6][0-9]|7[0-8])|7([0-2][0-9])|541|700|720|727|901)|65165([2-9])|6516([6-7][0-9])|65500([0-9])|6550([0-5][0-9])|655021|65505([6-7])|6516([8-9][0-9])|65170([0-4]))/,
  visa: /^4[0-9]{3}$/,
  masterCard: /^(5[1-5][0-9]{2})|(222[1-9])|(22[3-9][0-9])|(2[3-6][0-9]{2})|(27[0-1][0-9])|(2720)$/,
}

const setCreditCardFlag = (
  strippedValue: string,
  setFlagName: React.Dispatch<React.SetStateAction<TFlagName>>
): void => {
  switch (true) {
    case strippedValue.length <= 1:
      setFlagName('')
      break
    // case cardFlags['elo'].test(strippedValue):
    //   setFlagName('elo')
    //   break
    case cardFlags['visa'].test(strippedValue.slice(0, 4)):
      setFlagName('visa')
      break
    case cardFlags['masterCard'].test(strippedValue.slice(0, 4)):
      setFlagName('mastercard')
      break
    default:
      setFlagName('')
      break
  }
}

export const applyCreditCardMask = (
  event: React.ChangeEvent<HTMLInputElement>,
  setCardNumber: React.Dispatch<React.SetStateAction<string>>,
  flagNameState: [TFlagName, React.Dispatch<React.SetStateAction<TFlagName>>]
): void => {
  const strippedValue = event.target.value.replace(/\D/g, '')

  setCreditCardFlag(strippedValue, flagNameState[1])

  if (strippedValue.length >= 13) {
    event.target.value = strippedValue.replace(
      /(\d{4})(\d{4})(\d{4})(\d{1})/g,
      '$1 $2 $3 $4'
    )
  } else if (strippedValue.length >= 9) {
    event.target.value = strippedValue.replace(
      /(\d{4})(\d{4})(\d{1})/g,
      '$1 $2 $3'
    )
  } else if (strippedValue.length >= 4) {
    event.target.value = strippedValue.replace(/(\d{4})(\d{1})/g, '$1 $2')
  } else {
    event.target.value = strippedValue.replace(/\D/g, '')
  }

  setCardNumber(event.target.value)
}

export const validateCreditCardNumber = (creditCardNumber: string): boolean => {
  const creditCardWithoutSpaces = creditCardNumber.replace(/ /g, '')
  const creditCardCharArray = creditCardWithoutSpaces.split('')

  if (creditCardCharArray.every(item => item === creditCardNumber[0])) {
    return false
  }

  const multiplicationNums = creditCardCharArray.map((value, index) => {
    let number = +value

    if (index % 2 === 0) {
      number = number * 2
    }
    return number
  })

  const calcNumbers = multiplicationNums.map(value => {
    if (value > 9) {
      return (value % 10) + 1
    }
    return value
  })

  const sums = calcNumbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  )

  if (sums % 10 === 0) {
    // valid
    return true
  } else {
    // not valid
    return false
  }
}

export const creditCardError = {
  icon: 'information' as keyof typeof dict,
  message: 'Por favor, insira um número de cartão válido de 0-16 dígitos.',
}

export const isNotPortoCreditCardError = {
  icon: 'information' as keyof typeof dict,
  message: 'Por favor, insira o seu cartão Porto Seguro selecionado acima.',
}
