import React from 'react'
import { ILinkableFunds } from './types'
import * as s from './styles'

export default function FundsInput({ fund }: { fund: ILinkableFunds }) {
  return (
    <s.Input
      data-fundid={fund.fund_id}
      placeholder="0,00"
      onChange={() => {}}
    />
  )
}
