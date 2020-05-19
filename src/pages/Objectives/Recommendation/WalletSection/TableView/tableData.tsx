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

export const columns = [
  {
    Header: 'FUNDO DE INVESTIMENTO',
    accessor: 'name',
    justifyHeader: 'flex-start',
    styles: {
      width: '22%',
      minWidth: 208,
      header: {
        width: '22%',
        minWidth: 185,
      },
    },
    format: (row: IFund) => (
      <s.FundoOutterWrapper>
        <RiskColorTag borderRisk={row['wsdls/profile']} />
        <s.FundoWrapper>
          <s.FundoNameWrapper>{row.name}</s.FundoNameWrapper>
          <Text type="caption" color="gray4" bold textAlign="left">
            {row.category_name}
          </Text>
        </s.FundoWrapper>
      </s.FundoOutterWrapper>
    ),
  },
  {
    Header: 'RENT. ÚLT. 12 MESES',
    accessor: 'profitability',
    align: 'center',
    format: (row: IFund) =>
      profitabilityExists(row) ? `${row.profitability[0].value[3]}%` : '--',
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
    format: (row: IFund) => formatMoney(row.initial_value),
    align: 'center',
    styles: {
      width: '12%',
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
    format: (row: IFund) => formatMoney(row.monthly_value),
    align: 'center',
    styles: {
      width: '14%',
      minWidth: 120,
      header: {
        width: '14%',
        minWidth: 120,
      },
    },
  },
  {
    Header: '',
    accessor: 'acao',
    format: (row: IFund, onShowDetails: (r: IFund) => void) => (
      <Button outline onClick={() => onShowDetails(row)}>
        mais informações
      </Button>
    ),
    align: 'center',
    styles: {
      width: '22%',
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
    justifyHeader: 'flex-start',
    styles: {
      width: '24%',
      minWidth: 208,
      header: {
        width: '22%',
        minWidth: 185,
      },
    },
    format: (row: IFund) => (
      <s.FundoOutterWrapper>
        <RiskColorTag borderRisk={row['wsdls/profile']} />
        <s.FundoWrapper>
          <s.FundoNameWrapper>{row.name}</s.FundoNameWrapper>
          <Text type="caption" color="gray4" bold textAlign="left">
            {row.category_name}
          </Text>
        </s.FundoWrapper>
      </s.FundoOutterWrapper>
    ),
  },
  {
    Header: 'RENT. ÚLT. 12 MESES',
    accessor: 'profitability',
    align: 'center',
    format: (row: IFund) =>
      profitabilityExists(row) ? `${row.profitability[0].value[3]}%` : '--',
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
      minWidth: 134,
      header: {
        width: '16%',
        minWidth: 144,
      },
    },
  },
  {
    Header: 'INV. INICIAL',
    accessor: 'initial_value',
    format: (row: IFund) => formatMoney(row.initial_value),
    align: 'center',
    styles: {
      width: '12%',
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
    format: (row: IFund) => formatMoney(row.monthly_value),
    align: 'center',
    styles: {
      width: '14%',
      minWidth: 120,
      header: {
        width: '14%',
        minWidth: 120,
      },
    },
  },
  {
    Header: '',
    accessor: 'acao',
    format: (row: IFund, onShowDetails: (r: IFund) => void) => (
      <Button outline onClick={() => onShowDetails(row)}>
        mais informações
      </Button>
    ),
    align: 'center',
    styles: {
      width: 194,
      minWidth: 194,
      header: {
        width: 184,
        minWidth: 184,
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
