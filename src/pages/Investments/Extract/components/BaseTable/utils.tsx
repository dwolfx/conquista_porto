import React from 'react'
import moment from 'moment'
import { IBankExtract } from './types'
import * as S from './styles'
import { formatMoney } from 'helpers'

export const DateFormatter = ({ data }: IBankExtract) => <S.StyledDate data-testid="styled-date">{moment(data).format('DD/MM/YYYY')}</S.StyledDate>

export const TypeFormatter = ({ tipo }: IBankExtract) => <S.BoldText>{tipo.toLowerCase()}</S.BoldText>

export const Description = ({ tipoOperacao }: IBankExtract) =>  <S.BoldText>{tipoOperacao}</S.BoldText>

export const MoneyFormatter = ({ valor }: IBankExtract) => {
  return <S.BoldText>{formatMoney(valor)}</S.BoldText>
}
