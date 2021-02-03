import React from 'react'

import ButtonIcon from 'components/Button/Icon'
import Dropdown from 'components/Dropdown'
import { IItemsProps } from 'components/Dropdown/interface'
import { TColumns } from 'components/Table/types'
import Text from 'components/Text'

import { Currency } from 'helpers/money'
import { RiskColorTag } from 'pages/Objectives/Recommendation/WalletSection/styles'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'

import { generateActionMenuOptions } from './utils'
import { IActions } from './types'
import * as s from './styles'

export const columns = (
  actions: IActions,
  isTabletVertical?: boolean,
  isPendingFund?: boolean
): TColumns[] => {
  let columnsTemplate: TColumns[] = [
    {
      accessor: 'nickname',
      Header: 'Fundo de investimento',
      styles: {
        minWidth: 120,
        width: 165,
        header: {
          width: 165,
          minWidth: 120,
        },
      },
      align: 'flex-start',
      justifyHeader: 'flex-start',
      sticky: 'left',
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
        width: '20%',
        header: {
          width: '20%',
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
        width: '27%',
        header: {
          width: '27%',
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
      accessor: 'initial_value',
      Header: 'Inv. inicial',
      align: 'flex-end',
      justifyHeader: 'flex-end',
      styles: {
        minWidth: 170,
        width: '25%',
        header: {
          width: '25%',
          minWidth: 156,
        },
      },
      format: (row: TObjectiveFunds) => (
        <Text type="title" color="gray6" bold>
          {Currency.parse(row.initial_value, true)}
        </Text>
      ),
    },
    {
      accessor: 'actions',
      Header: '',
      align: 'flex-end',
      justifyHeader: 'center',
      styles: {
        minWidth: 88,
        width: 188,
        header: {
          minWidth: 58,
          width: 188,
        },
      },
      format: (row: TObjectiveFunds) => {
        const actionMenuOptions: IItemsProps[] = generateActionMenuOptions(
          row,
          actions
        )
        return (
          <Dropdown
            containerPadding="0"
            customWidth="341px"
            items={actionMenuOptions}
          >
            <ButtonIcon icon="more" shape="square" color="secondary" />
          </Dropdown>
        )
      },
    },
  ]

  if (!isPendingFund) {
    const objectValueColumn: TColumns = {
      accessor: 'invested',
      Header: 'Valor no objetivo',
      align: 'flex-end',
      justifyHeader: 'flex-end',
      styles: {
        minWidth: 120,
        width: '20%',
        header: {
          width: '20%',
          minWidth: 120,
        },
      },
      format: (row: TObjectiveFunds) => (
        <Text type="title" color="gray6" bold>
          {Currency.parse(row.invested, true)}
        </Text>
      ),
    }

    columnsTemplate.splice(4, 0, objectValueColumn)
  }

  if (isTabletVertical) {
    columnsTemplate = [
      {
        ...columnsTemplate[0],
        styles: {
          ...columnsTemplate[0].styles,
          width: isPendingFund ? 221 : 251,
          minWidth: 221,
          header: {
            width: isPendingFund ? 221 : 251,
            minWidth: 221,
          },
        },
      },
      {
        ...columnsTemplate[1],
        styles: {
          ...columnsTemplate[1].styles,
          width: isPendingFund ? 210 : 251,
          minWidth: 163,
          header: {
            width: isPendingFund ? 200 : 251,
            minWidth: 155,
          },
        },
      },
      {
        ...columnsTemplate[2],
        styles: {
          ...columnsTemplate[2].styles,
          width: isPendingFund ? 210 : 251,
          minWidth: 163,
          header: {
            width: isPendingFund ? 190 : 251,
            minWidth: 155,
          },
        },
      },
      {
        ...columnsTemplate[3],
        styles: {
          ...columnsTemplate[3].styles,
          width: isPendingFund ? 210 : 251,
          minWidth: 163,
          header: {
            width: isPendingFund ? 197 : 251,
            minWidth: 155,
          },
        },
      },
      ...(isPendingFund
        ? [
            {
              ...columnsTemplate[4],
              styles: {
                ...columnsTemplate[4].styles,
                minWidth: 44,
                width: 44,
                header: {
                  width: 24,
                  minWidth: 24,
                },
              },
              sticky: 'right',
            } as TColumns,
          ]
        : [
            {
              ...columnsTemplate[4],
              styles: {
                ...columnsTemplate[4].styles,
                minWidth: 163,
                width: 261,
                header: {
                  minWidth: 163,
                  width: 221,
                },
              },
            } as TColumns,
            {
              ...columnsTemplate[5],
              styles: {
                ...columnsTemplate[5].styles,
                width: 49,
                minWidth: 49,
                header: {
                  width: 19,
                  minWidth: 19,
                },
              },
              sticky: 'right',
            } as TColumns,
          ]),
    ]
  }

  return columnsTemplate
}
