import React from 'react'

import { TColumns } from 'components/Table/types'
import { ILinkableFunds } from '../types'
import Text from 'components/Text'

import { Currency } from 'helpers/money'
import { RiskColorTag } from 'pages/Objectives/Recommendation/WalletSection/styles'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'

import { IActions } from 'pages/Objectives/Manager/FundsTable/types'
import * as s from './styles'
import FundsInput from './FundInput'

export const columns = (
  actions?: IActions,
  isTabletVertical?: boolean
): TColumns[] => {
  let columnsTemplate: TColumns[] = [
    {
      accessor: 'nickname',
      Header: 'Fundo',
      styles: {
        minWidth: 120,
        width: '25%',
        header: {
          width: '25%',
          minWidth: 120,
        },
      },
      align: 'flex-start',
      justifyHeader: 'flex-start',
      format: (row: TObjectiveFunds) => (
        <s.FundoOutterWrapper key={`fund_name_${row.fund_id}`}>
          <RiskColorTag borderRisk={row.order_profile_risk} />
          <s.FundoWrapper>
            <s.FundoNameWrapper color="gray5">
              {row.nickname}
            </s.FundoNameWrapper>
            <Text type="caption" color="gray4" bold textAlign="left">
              {row.arena_category}
            </Text>
          </s.FundoWrapper>
        </s.FundoOutterWrapper>
      ),
    },
    {
      accessor: 'balance',
      Header: 'Saldo bruto',
      align: 'flex-end',
      justifyHeader: 'flex-end',
      styles: {
        minWidth: 170,
        width: '10%',
        header: {
          width: '10%',
          minWidth: 156,
        },
      },
      format: (row: TObjectiveFunds) => (
        <Text type="title" color="gray6" bold>
          {Currency.parse(row.balance, true)}
        </Text>
      ),
    },
    {
      accessor: 'available',
      Header: 'Disponível',
      align: 'flex-end',
      justifyHeader: 'flex-end',
      styles: {
        minWidth: 170,
        width: '10%',
        header: {
          width: '10%',
          minWidth: 156,
        },
      },
      format: (row: TObjectiveFunds) => (
        <Text type="title" color="gray6" bold>
          {Currency.parse(row.available, true)}
        </Text>
      ),
    },
    {
      accessor: 'input',
      Header: 'Vincular ao Objetivo',
      align: 'flex-end',
      justifyHeader: 'flex-end',
      styles: {
        minWidth: 170,
        width: '55%',
        header: {
          width: '55%',
          minWidth: 156,
        },
      },
      format: (fund: ILinkableFunds) => FundsInput({ fund }),
    },
  ]

  if (isTabletVertical) {
    columnsTemplate = [
      {
        ...columnsTemplate[0],
        styles: {
          ...columnsTemplate[0].styles,
          minWidth: 260,
          header: {
            minWidth: 242,
          },
        },
      },
      {
        ...columnsTemplate[1],
        styles: {
          ...columnsTemplate[1].styles,
          minWidth: 163,
          header: {
            minWidth: 155,
          },
        },
      },
      {
        ...columnsTemplate[2],
        styles: {
          ...columnsTemplate[2].styles,
          minWidth: 163,
          header: {
            minWidth: 155,
          },
        },
      },
      {
        ...columnsTemplate[3],
        styles: {
          ...columnsTemplate[3].styles,
          minWidth: 163,
          header: {
            minWidth: 155,
          },
        },
      },
    ]
  }

  return columnsTemplate
}
