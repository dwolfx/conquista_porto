import React from 'react'
import moment from 'moment'
import { IAmountToBeSettledExtract } from './types'
import * as s from './styles'
import { formatMoney } from 'helpers'

export const DateFormatter = ({ data }: IAmountToBeSettledExtract) => (
  <s.StyledDate data-testid="styled-date">
    {moment(data).format('DD/MM/YYYY')}
  </s.StyledDate>
)

export const FundFormatter = ({ nome }: IAmountToBeSettledExtract) => (
  <s.FundText data-testid="styled-name">{nome}</s.FundText>
)

export const TypeFormatter = ({ tipo }: IAmountToBeSettledExtract) => (
  <s.BoldTypeText>{tipo.toLowerCase()}</s.BoldTypeText>
)

export const MoneyFormatter = ({ valor }: IAmountToBeSettledExtract) => {
  return <s.BoldMoneyText>{formatMoney(valor)}</s.BoldMoneyText>
}
