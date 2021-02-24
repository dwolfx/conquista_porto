import React from 'react'
import { brazilianStates } from 'pages/CreditCard/Creation/CreditCardStep/Selects/BrazilianStates/types'
import { TSelected } from 'components/Inputs/Select/types'

export const statusOption = (
  setState: React.Dispatch<React.SetStateAction<TSelected>>
) =>
  brazilianStates.map((value, index) => ({
    id: index,
    text: value,
    onClick: () => {
      setState({ id: index, name: value })
    },
  }))
