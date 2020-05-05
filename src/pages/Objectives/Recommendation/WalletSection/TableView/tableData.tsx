import React from 'react'

import Button from 'components/Button'
import Text from 'components/Text'
import { formatMoney } from 'helpers'
import { RiskColorTag } from 'pages/Objectives/Recommendation/WalletSection/styles'

import { IFund } from 'pages/Objectives/Recommendation/WalletSection/types'

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
    width: '221px',
    widthHeader: '200px',
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
    width: '144px',
  },
  {
    Header: 'INV. INICIAL',
    accessor: 'initial_value',
    format: (row: IFund) => formatMoney(row.initial_value),
    align: 'center',
    width: '129px',
  },
  {
    Header: 'INV. MENSAL',
    accessor: 'monthly_value',
    format: (row: IFund) => formatMoney(row.monthly_value),
    align: 'center',
    width: '129px',
  },
  {
    Header: '',
    accessor: 'acao',
    format: (row: IFund, onShowDetails: (r: IFund) => void) => (
      <Button outline onClick={() => onShowDetails(row)}>
        mais informações
      </Button>
    ),
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
