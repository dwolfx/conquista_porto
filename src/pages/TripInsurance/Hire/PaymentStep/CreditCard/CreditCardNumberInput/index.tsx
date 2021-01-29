import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import IconExporter from 'components/IconExporter'
import { ITripInsuranceCreditCard } from 'store/modules/TripInsurance/CreditCard/types'

import {
  applyCreditCardMask,
  validateCreditCardNumber,
  creditCardError,
  isNotPortoCreditCardError,
} from './utils'
import { TFlagName } from '../../types'
import * as s from './styles'

const CreditCardNumberInput = ({
  cardNumberState,
  selectedCreditCardIndex,
  isNumberValidState,
  flagNameState,
  ...rest
}: {
  cardNumberState: [string, React.Dispatch<React.SetStateAction<string>>]
  selectedCreditCardIndex: number
  isNumberValidState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  flagNameState: [TFlagName, React.Dispatch<React.SetStateAction<TFlagName>>]
}) => {
  const [isOnBlurSizeError, setIsOnBlurSizeError] = useState<boolean>(false)
  const { creditCardData } = useSelector(
    (state: { tripInsuranceCreditCard: ITripInsuranceCreditCard }) => ({
      creditCardData: state.tripInsuranceCreditCard.data,
    })
  )

  const hasError = () => {
    if (
      (cardNumberState[0].length >= 19 && !isNumberValidState[0]) ||
      (cardNumberState[0].length >= 4 &&
        flagNameState[0] !== 'mastercard' &&
        flagNameState[0] !== 'visa')
    ) {
      return creditCardError
    }

    if (isOnBlurSizeError) {
      return creditCardError
    }

    // Verifica se os últimos números do cartão são iguais aos últimos números do cartão porto selecionado
    if (
      creditCardData?.creditCards &&
      creditCardData?.creditCards.length > selectedCreditCardIndex &&
      cardNumberState[0].length >= 19 &&
      creditCardData?.creditCards[selectedCreditCardIndex].UltimosDigitos !==
        cardNumberState[0].slice(15, 19)
    ) {
      return isNotPortoCreditCardError
    }

    return undefined
  }

  return (
    <s.CreditCardInput
      label="Número do cartão"
      error={hasError()}
      placeholder="Digite"
      onBlur={() => {
        if (cardNumberState[0].length < 19) {
          setIsOnBlurSizeError(true)
        } else {
          setIsOnBlurSizeError(false)
        }
      }}
      onChange={e => {
        applyCreditCardMask(e, cardNumberState[1], flagNameState)
        if (e.target.value.length >= 19) {
          cardNumberState[1](e.target.value)
          isNumberValidState[1](validateCreditCardNumber(e.target.value))
        }
        setIsOnBlurSizeError(false)
      }}
      suffix={flagNameState[0] && <IconExporter name={flagNameState[0]} />}
      maxLength={19}
      {...rest}
    />
  )
}

export default CreditCardNumberInput
