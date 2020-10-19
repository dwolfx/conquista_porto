import React from 'react'
import { IExtractFund } from './types'
import * as s from './styles'

export default function FundsInput({ fund }: { fund: IExtractFund }) {
  return (
    <s.Input
      data-fundid={fund.fund_id}
      placeholder="0,00"
      onChange={() => {}}
    />
  )
}
