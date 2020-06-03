import React from 'react'
import { uuid } from 'uuidv4'

import VerticalList from 'components/VerticalList'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import { formatMoney } from 'helpers'
import { StyledIcon } from 'pages/Investments/FundsList/styles'

import { Li, LiTitle, LiValue, TransactionsWrapper, Ul } from './styles'

interface IFund {
  fund: {
    minimo_inicial: string
    aplicao_minima: string
    saldo_minimo?: number | string
    hora_aplicacao: string
    aplicacao_cotizacao: string
    aplicacao_financeiro: string
    resgate_cotizacao: string
    resgate_financeiro: string
    categoria: string
  }
}

export const Transactions = ({ fund }: IFund) => {
  const liContent = [
    [
      <LiTitle>Aplicação Inicial</LiTitle>,
      <LiValue bold>{formatMoney(fund.minimo_inicial)}</LiValue>,
    ],
    [
      <LiTitle>Movimentação Mín.</LiTitle>,
      <LiValue bold>{formatMoney(fund.aplicao_minima)}</LiValue>,
    ],
    [
      <LiTitle>Saldo Mín.</LiTitle>,
      <LiValue bold>
        {typeof fund.saldo_minimo === 'string' || undefined
          ? '-'
          : formatMoney(fund.saldo_minimo || 0)}
      </LiValue>,
    ],
    [
      <LiTitle>Horário Limite</LiTitle>,
      <LiValue bold>{fund.hora_aplicacao}</LiValue>,
    ],
    [
      <LiTitle>Aplicação (Cotização)</LiTitle>,
      <LiValue bold>{fund.aplicacao_cotizacao} (Úteis)</LiValue>,
    ],
    [
      <LiTitle>Aplicação (Financeiro)</LiTitle>,
      <LiValue bold>{fund.aplicacao_financeiro} (Úteis)</LiValue>,
    ],
    [
      <LiTitle>Resgate (Cotização)</LiTitle>,
      <LiValue bold>{fund.resgate_cotizacao} (Corridos)</LiValue>,
    ],
    [
      <LiTitle>Resgate (Financeiro)</LiTitle>,
      <LiValue bold>{fund.resgate_financeiro} (Úteis)</LiValue>,
    ],
    [
      <LiTitle>Categoria</LiTitle>,
      <LiValue bold>
        {fund.categoria === 'Renda Variável' ? 'Ações' : fund.categoria}
      </LiValue>,
    ],
  ]

  return (
    <TransactionsWrapper>
      <HorizontalList
        noPadding
        startItems={[
          <StyledIcon name="money" />,
          <Text color="gray6" type="subheading" bold>
            MOVIMENTAÇÕES
          </Text>,
        ]}
      />

      <Ul>
        {liContent.map((item, index) => (
          <Li key={uuid()}>
            <VerticalList elements={item} />
          </Li>
        ))}
      </Ul>
    </TransactionsWrapper>
  )
}

export default Transactions
