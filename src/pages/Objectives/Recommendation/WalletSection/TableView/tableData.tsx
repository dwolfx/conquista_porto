import React from 'react'

import Button from 'components/Button'
import Text from 'components/Text'
import { formatMoney } from 'helpers'
import { RiskColorTag } from 'pages/Objectives/Recommendation/WalletSection/styles'

import { IFund } from 'pages/Objectives/Recommendation/WalletSection/types'

import * as s from './styles'

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
      row.profitability &&
      row.profitability[0] &&
      row.profitability[0].value &&
      row.profitability[0].value[3]
        ? `${row.profitability[0].value[3]}%`
        : '--',
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
