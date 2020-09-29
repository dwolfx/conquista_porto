import React from 'react'
import { uuid } from 'uuidv4'

import Icon from 'components/IconExporter'
import VerticalList from 'components/VerticalList'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'

import { formatMoney } from 'helpers'
import useMedia from 'hooks/useMedia'

import { IFunds } from 'store/modules/Objective/types'

import { Li, LiTitle, LiValue, TransactionsWrapper, Ul } from './styles'

interface IFund {
  fund: IFunds
}

export const Transactions = ({ fund, ...rest }: IFund) => {
  const isMobile = useMedia('xs')

  const liContent = [
    [
      <LiTitle>Aplicação Inicial</LiTitle>,
      <LiValue bold>{formatMoney(fund.min_initial_value)}</LiValue>,
    ],
    [
      <LiTitle>Movimentação Mín.</LiTitle>,
      <LiValue bold>{formatMoney(fund.min_rescue_value)}</LiValue>,
    ],
    [
      <LiTitle>Saldo Mín.</LiTitle>,
      <LiValue bold>
        {typeof fund.min_balance_value === 'string' ||
        fund.min_balance_value === undefined
          ? '-'
          : formatMoney(fund.min_balance_value)}
      </LiValue>,
    ],
    [
      <LiTitle>Horário Limite</LiTitle>,
      <LiValue bold>{fund.time_limit_to_apply}</LiValue>,
    ],
    [
      <LiTitle>Aplicação (Cotização)</LiTitle>,
      <LiValue bold>{fund.quotation_apply_days} (Úteis)</LiValue>,
    ],
    [
      <LiTitle>Aplicação (Financeiro)</LiTitle>,
      <LiValue bold>{fund.financial_apply_days} (Úteis)</LiValue>,
    ],
    [
      <LiTitle>Resgate (Cotização)</LiTitle>,
      <LiValue bold>{fund.quotation_rescue_days}</LiValue>,
    ],
    [
      <LiTitle>Resgate (Financeiro)</LiTitle>,
      <LiValue bold>{fund.financial_rescue_days}</LiValue>,
    ],
  ]

  const category = [
    <LiTitle>Categoria</LiTitle>,
    <LiValue bold>
      {fund.arena_category === 'Renda Variável' ? 'Ações' : fund.arena_category}
    </LiValue>,
  ]

  !isMobile && liContent.length === 8 && liContent.push(category)

  return (
    <TransactionsWrapper {...rest}>
      <HorizontalList
        noPadding
        startItems={[
          <Icon name="money" width={21} />,
          <Text color="gray6" type="subheading" bold>
            MOVIMENTAÇÕES
          </Text>,
        ]}
      />

      <Ul>
        {liContent.map(item => (
          <Li key={uuid()}>
            <VerticalList elements={item} />
          </Li>
        ))}
      </Ul>
    </TransactionsWrapper>
  )
}

export default Transactions
