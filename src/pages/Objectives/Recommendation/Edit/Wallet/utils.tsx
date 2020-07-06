import React from 'react'

import ButtonIcon from 'components/Button/Icon'

import Text from 'components/Text'
import { formatMoney, formatLocaleStringToNumber } from 'helpers'

import { RiskColorTag } from 'pages/Objectives/Recommendation/WalletSection/styles'
import { IFunds } from 'store/modules/Objective/types'

import * as s from './styles'

export const formatFundoInv = (row: IFunds) => (
  <s.FundoOutterWrapper key={`fund_name_${row.fund_id}`}>
    <RiskColorTag borderRisk={row.share_holder_profile_risk} />
    <s.FundoWrapper>
      <s.FundoNameWrapper color="gray5">{row.name}</s.FundoNameWrapper>
      <Text type="caption" color="gray4" bold textAlign="left">
        {row.arena_category}
      </Text>
    </s.FundoWrapper>
  </s.FundoOutterWrapper>
)

interface IFormatValue {
  row: IFunds
  onChange: ({ row, event, ref }: any) => void
  type: 'initial_value' | 'monthly_value'
}

export const FormatValue = ({ row, onChange, type }: IFormatValue) => {
  const [innerValue, setInnerValue] = React.useState(0)

  React.useEffect(() => {
    setInnerValue(row[type])
  }, [row, type])

  return (
    <s.MoneyInput
      prefix="R$"
      name={type}
      value={formatMoney(innerValue, {
        style: 'decimal',
      })}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setInnerValue(formatLocaleStringToNumber(event.target.value))
      }}
      onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
          event,
          row,
          value: innerValue,
        })
      }}
      key={`fund_${type}_${row.fund_id}`}
    />
  )
}

export const formatActions = (row: IFunds) => (
  <ButtonIcon
    icon="close"
    onClick={() => console.log(row)}
    key={`fund_remove_${row.fund_id}`}
  />
)
