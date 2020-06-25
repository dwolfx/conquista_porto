import React from 'react'

import Text from 'components/Text'
import { formatMoney } from 'helpers'
import { RiskColorTag } from 'pages/Objectives/Recommendation/WalletSection/styles'

import { IFund } from 'pages/Objectives/Recommendation/types'

import * as s from './styles'

const profitabilityExists = (fund: IFund) =>
  fund.profitability &&
  fund.profitability[0] &&
  fund.profitability[0].value &&
  fund.profitability[0].value[3]

const formatFundoInv = (row: IFund) => (
  <s.FundoOutterWrapper>
    <RiskColorTag borderRisk={row.share_holder_profile_risk} />
    <s.FundoWrapper>
      <s.FundoNameWrapper color="gray5">{row.name}</s.FundoNameWrapper>
      <Text type="caption" color="gray4" bold textAlign="left">
        {row.arena_category}
      </Text>
    </s.FundoWrapper>
  </s.FundoOutterWrapper>
)

const formatRent12Meses = (row: IFund) => (
  <Text color="gray5">
    {profitabilityExists(row)
      ? `${Intl.NumberFormat('pt-br').format(row.profitability[0].value[3])}%`
      : '--'}
  </Text>
)

const formatInicialValue = (row: IFund) => (
  <Text type="title" color="gray6" bold>
    {formatMoney(row.initial_value)}
  </Text>
)

const formatMonthlyValue = (row: IFund) => (
  <Text type="title" color="gray6" bold>
    {formatMoney(row.monthly_value)}
  </Text>
)

export const columns = [
  {
    Header: 'FUNDO DE INVESTIMENTO',
    accessor: 'name',
    align: 'flex-start',
    justifyHeader: 'flex-start',
    styles: {
      width: '25%',
      minWidth: 208,
      header: {
        width: '25%',
        minWidth: 185,
      },
    },
    format: (row: IFund) => formatFundoInv(row),
  },
  {
    Header: 'RENT. ÚLT. 12 MESES',
    accessor: 'profitability',
    align: 'center',
    format: (row: IFund) => formatRent12Meses(row),
    sort: (a: IFund, b: IFund) => {
      if (profitabilityExists(a)) {
        if (profitabilityExists(b)) {
          return a.profitability[0].value[3] > b.profitability[0].value[3]
            ? 1
            : -1
        }

        return 1
      }

      return -1
    },
    styles: {
      width: '25%',
      minWidth: 144,
      header: {
        width: '25%',
        minWidth: 144,
      },
    },
  },
  {
    Header: 'INV. INICIAL',
    accessor: 'initial_value',
    format: (row: IFund) => formatInicialValue(row),
    align: 'center',
    styles: {
      width: '25%',
      minWidth: 120,
      header: {
        width: '25%',
        minWidth: 120,
      },
    },
  },
  {
    Header: 'INV. MENSAL',
    accessor: 'monthly_value',
    format: (row: IFund) => formatMonthlyValue(row),
    align: 'center',
    styles: {
      width: '25%',
      minWidth: 120,
      header: {
        width: '25%',
        minWidth: 110,
      },
    },
  },
]

export const columnsSticky = [
  {
    Header: 'FUNDO DE INVESTIMENTO',
    accessor: 'name',
    align: 'flex-start',
    justifyHeader: 'flex-start',
    styles: {
      width: 208,
      minWidth: 208,
      header: {
        width: 208,
        minWidth: 185,
      },
    },
    format: (row: IFund) => formatFundoInv(row),
    sticky: 'left',
  },
  {
    Header: 'RENT. ÚLT. 12 MESES',
    accessor: 'profitability',
    align: 'center',
    format: (row: IFund) => formatRent12Meses(row),
    sort: (a: IFund, b: IFund) => {
      if (profitabilityExists(a)) {
        if (profitabilityExists(b)) {
          return a.profitability[0].value[3] > b.profitability[0].value[3]
            ? 1
            : -1
        }

        return 1
      }

      return -1
    },
    styles: {
      width: '25%',
      minWidth: 188,
      header: {
        width: '25%',
        minWidth: 188,
      },
    },
  },
  {
    Header: 'INV. INICIAL',
    accessor: 'initial_value',
    format: (row: IFund) => formatInicialValue(row),
    align: 'center',
    styles: {
      width: '25%',
      minWidth: 170,
      header: {
        width: '25%',
        minWidth: 155,
      },
    },
  },
  {
    Header: 'INV. MENSAL',
    accessor: 'monthly_value',
    format: (row: IFund) => formatMonthlyValue(row),
    align: 'center',
    styles: {
      width: '25%',
      minWidth: 133,
      header: {
        width: '25%',
        minWidth: 133,
      },
    },
  },
]

export const fundsType = [
  {
    name: 'Renda Fixa',
    value: 'Renda Fixa',
  },
  {
    name: 'Multimercado',
    value: 'multimercado',
  },
  {
    name: 'Ações',
    value: 'rendavariável',
  },
  {
    name: 'Investimento no Exterior',
    value: 'investimentonoexterior',
  },
  {
    name: 'Cambial',
    value: 'cambial',
  },
]
