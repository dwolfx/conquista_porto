import React from 'react'
import PropTypes from 'prop-types'

import { formatMoney } from 'helpers'
import VerticalList from 'components/VerticalList'

import {
  GrayLine,
  Li,
  LiTitle,
  LiValue,
  MoneyIcon,
  Title,
  TitleWrapper,
  TransactionsWrapper,
  Ul,
} from './styles'

export const Transactions = ({ fund, category }) => {
  const liContent = [
    [
      <LiTitle>Aplicação Inicial</LiTitle>,
      <LiValue>{formatMoney(fund.minimo_inicial)}</LiValue>,
    ],
    [
      <LiTitle>Movimentação Mín.</LiTitle>,
      <LiValue>{formatMoney(fund.aplicao_minima)}</LiValue>,
    ],
    [
      <LiTitle>Saldo Mín.</LiTitle>,
      <LiValue>
        {typeof fund.saldo_minimo === 'string' || undefined
          ? '-'
          : formatMoney(fund.saldo_minimo)}
      </LiValue>,
    ],
    [
      <LiTitle>Horário Limite</LiTitle>,
      <LiValue>{fund.hora_aplicacao}</LiValue>,
    ],
    [
      <LiTitle>Aplicação (Cotização)</LiTitle>,
      <LiValue>{fund.aplicacao_cotizacao} (Úteis)</LiValue>,
    ],
    [
      <LiTitle>Aplicação (Financeiro)</LiTitle>,
      <LiValue>{fund.aplicacao_financeiro} (Úteis)</LiValue>,
    ],
    [
      <LiTitle>Resgate (Cotização)</LiTitle>,
      <LiValue>{fund.resgate_cotizacao} (Corridos)</LiValue>,
    ],
    [
      <LiTitle>Resgate (Financeiro)</LiTitle>,
      <LiValue>{fund.resgate_financeiro} (Úteis)</LiValue>,
    ],
    [
      <LiTitle>Categoria</LiTitle>,
      <LiValue>{category === 'Renda Variável' ? 'Ações' : category}</LiValue>,
    ],
  ]

  return (
    <>
      <TransactionsWrapper>
        <TitleWrapper>
          <MoneyIcon />
          <Title>Movimentações</Title>
        </TitleWrapper>
        <Ul>
          {liContent.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Li key={`transactions-cell-${index}`}>
              <VerticalList elements={item} />
            </Li>
          ))}
        </Ul>
      </TransactionsWrapper>
      <GrayLine />
    </>
  )
}

export default Transactions

Transactions.propTypes = {
  fund: PropTypes.shape({
    aplicao_minima: PropTypes.string,
    aplicacao_cotizacao: PropTypes.string,
    aplicacao_financeiro: PropTypes.string,
    resgate_cotizacao: PropTypes.string,
    resgate_financeiro: PropTypes.string,
    hora_aplicacao: PropTypes.string,
    minimo_inicial: PropTypes.string,
    saldo_minimo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    classificacao: PropTypes.string,
  }).isRequired,
  category: PropTypes.string.isRequired,
}
