import React from 'react'
import { uuid } from 'uuidv4'

import VerticalList from 'components/VerticalList'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import { formatMoney } from 'helpers'
import useMedia from 'hooks/useMedia'
import { StyledIcon } from 'pages/Investments/FundsList/styles'

import { Li, LiTitle, LiValue, TransactionsWrapper, Ul } from './styles'
import { IFundDetails } from 'store/modules/Investment/Details/iDetails'

interface IProps {
  fund: IFundDetails
}
export const Transactions = ({ fund }: IProps) => {
  const isMobile = useMedia('xs')

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
        {fund.saldo_minimo ? '-' : formatMoney(fund.saldo_minimo || 0)}
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
      <LiValue
        bold
      >{`${fund.resgate_cotizacao} (${fund.contagem_dias_resgate})`}</LiValue>,
    ],
    [
      <LiTitle>Resgate (Financeiro)</LiTitle>,
      <LiValue bold>{fund.resgate_financeiro} (Úteis)</LiValue>,
    ],
  ]

  const category = [
    <LiTitle>Categoria</LiTitle>,
    <LiValue bold>
      {fund.categoria_arena === 'Renda Variável'
        ? 'Ações'
        : fund.categoria_arena}
    </LiValue>,
  ]

  !isMobile && liContent.length === 8 && liContent.push(category)

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
