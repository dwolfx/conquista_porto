import React from 'react'

import Button from 'components/Button'
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
      <s.FundoNameWrapper>{row.name}</s.FundoNameWrapper>
      <Text type="caption" color="gray4" bold textAlign="left">
        {row.arena_category}
      </Text>
    </s.FundoWrapper>
  </s.FundoOutterWrapper>
)

const formatRent12Meses = (row: IFund) =>
  profitabilityExists(row)
    ? `${Intl.NumberFormat('pt-br').format(row.profitability[0].value[3])}%`
    : '--'

const formatInicialValue = (row: IFund) => formatMoney(row.initial_value)

const formatMonthlyValue = (row: IFund) => formatMoney(row.monthly_value)

const formatActionButton = (row: IFund, onShowDetails: (r: IFund) => void) => (
  <Button outline onClick={() => onShowDetails(row)}>
    mais informações
  </Button>
)

export const columns = [
  {
    Header: 'FUNDO DE INVESTIMENTO',
    accessor: 'name',
    align: 'flex-start',
    justifyHeader: 'flex-start',
    styles: {
      width: '22%',
      minWidth: 208,
      header: {
        width: '22%',
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
      width: '18%',
      minWidth: 144,
      header: {
        width: '16%',
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
      width: '13%',
      minWidth: 120,
      header: {
        width: '14%',
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
      width: '12%',
      minWidth: 120,
      header: {
        width: '11%',
        minWidth: 110,
      },
    },
  },
  {
    Header: '',
    accessor: 'acao',
    format: (row: IFund, onShowDetails: (r: IFund) => void) =>
      formatActionButton(row, onShowDetails),
    align: 'center',
    styles: {
      width: '28%',
      minWidth: 160,
      header: {
        width: '22%',
        minWidth: 140,
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
      width: '24%',
      minWidth: 208,
      header: {
        width: '22%',
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
      width: '18%',
      minWidth: 160,
      header: {
        width: '16%',
        minWidth: 160,
      },
    },
  },
  {
    Header: 'INV. INICIAL',
    accessor: 'initial_value',
    format: (row: IFund) => formatInicialValue(row),
    align: 'center',
    styles: {
      width: '12%',
      minWidth: 155,
      header: {
        width: '14%',
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
      width: '14%',
      minWidth: 105,
      header: {
        width: '14%',
        minWidth: 105,
      },
    },
  },
  {
    Header: '',
    accessor: 'acao',
    format: (row: IFund, onShowDetails: (r: IFund) => void) =>
      formatActionButton(row, onShowDetails),
    align: 'center',
    styles: {
      width: 194,
      minWidth: 194,
      header: {
        width: '34%',
        minWidth: 210,
      },
    },
    sticky: 'right',
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
