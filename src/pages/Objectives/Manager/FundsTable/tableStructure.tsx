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
  isPendingFund?: boolean,
  isTabletHorizontal?: boolean
): TColumns[] => {
  let columnsTemplate: TColumns[] = [
    {
      accessor: 'nickname',
      Header: 'Fundo de investimento',
      styles: {
        minWidth: 250,
        width: isPendingFund ? '30%' : '25%',
        header: {
          width: isPendingFund ? '35%' : '30%',
          minWidth: 230,
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
        minWidth: 150,
        width: isPendingFund ? '20%' : '10%',
        header: {
          width: isPendingFund ? '20%' : '10%',
          minWidth: 136,
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
        minWidth: 150,
        width: isPendingFund ? '15%' : '10%',
        header: {
          width: isPendingFund ? '15%' : '10%',
          minWidth: 136,
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
        minWidth: 150,
        width: isPendingFund ? '15%' : '10%',
        header: {
          width: isPendingFund ? '15%' : '10%',
          minWidth: 136,
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
      align: 'center',
      justifyHeader: 'center',
      styles: {
        minWidth: '10%',
        width: isPendingFund ? '15%' : '10%',
        header: {
          minWidth: '10%',
          width: isPendingFund ? '15%' : '10%',
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
      align: 'center',
      justifyHeader: 'flex-end',
      styles: {
        minWidth: 150,
        width: '20%',
        header: {
          width: '20%',
          minWidth: 150,
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
          width: isPendingFund ? 261 : 251,
          minWidth: 221,
          header: {
            width: isPendingFund ? 241 : 231,
            minWidth: 221,
          },
        },
      },
      {
        ...columnsTemplate[1],
        styles: {
          ...columnsTemplate[1].styles,
          width: isPendingFund ? 135 : 151,
          minWidth: 123,
          header: {
            width: isPendingFund ? 135 : 151,
            minWidth: 115,
          },
        },
      },
      {
        ...columnsTemplate[2],
        styles: {
          ...columnsTemplate[2].styles,
          width: isPendingFund ? 135 : 151,
          minWidth: 123,
          header: {
            width: isPendingFund ? 135 : 151,
            minWidth: 115,
          },
        },
      },
      {
        ...columnsTemplate[3],
        styles: {
          ...columnsTemplate[3].styles,
          width: isPendingFund ? 135 : 151,
          minWidth: 123,
          header: {
            width: isPendingFund ? 135 : 151,
            minWidth: 115,
          },
        },
      },
      ...(isPendingFund
        ? [
            {
              ...columnsTemplate[4],
              styles: {
                ...columnsTemplate[4].styles,
                minWidth: 54,
                width: 54,
                header: {
                  width: 34,
                  minWidth: 34,
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
                width: 245,
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

  if (isTabletHorizontal) {
    columnsTemplate = [
      {
        ...columnsTemplate[0],
        styles: {
          ...columnsTemplate[0].styles,
          width: isPendingFund ? 261 : 251,
          minWidth: 221,
          header: {
            width: isPendingFund ? 241 : 200,
            minWidth: 200,
          },
        },
      },
      {
        ...columnsTemplate[1],
        styles: {
          ...columnsTemplate[1].styles,
          width: isPendingFund ? 155 : 161,
          minWidth: 133,
          header: {
            width: isPendingFund ? 155 : 161,
            minWidth: 125,
          },
        },
      },
      {
        ...columnsTemplate[2],
        styles: {
          ...columnsTemplate[2].styles,
          width: isPendingFund ? 135 : 151,
          minWidth: 123,
          header: {
            width: isPendingFund ? 135 : 151,
            minWidth: 115,
          },
        },
      },
      {
        ...columnsTemplate[3],
        styles: {
          ...columnsTemplate[3].styles,
          width: isPendingFund ? 135 : 151,
          minWidth: 123,
          header: {
            width: isPendingFund ? 135 : 151,
            minWidth: 115,
          },
        },
      },
      ...(isPendingFund
        ? [
            {
              ...columnsTemplate[4],
              styles: {
                ...columnsTemplate[4].styles,
                minWidth: 145,
                width: 84,
                header: {
                  width: 64,
                  minWidth: 64,
                },
              },
              sticky: 'right',
              align: 'flex-end',
            } as TColumns,
          ]
        : [
            {
              ...columnsTemplate[4],
              styles: {
                ...columnsTemplate[4].styles,
                minWidth: 163,
                width: 245,
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
