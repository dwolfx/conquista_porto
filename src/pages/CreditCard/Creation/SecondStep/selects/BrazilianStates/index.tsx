import React, { Dispatch, SetStateAction } from 'react'
import { BrazilianState } from 'pages/CreditCard/Creation/types'
import Select from 'components/Inputs/Select'

export default function BrazilianStatesSelect({
  state,
}: {
  state: [
    BrazilianState | null,
    Dispatch<SetStateAction<BrazilianState | null>>
  ]
}) {
  return <Select label="Estado" options={[]} selected={{ id: 0 }} />
}
