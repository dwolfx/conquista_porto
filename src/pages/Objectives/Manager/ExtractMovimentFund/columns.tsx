import React from 'react'
import { uuid } from 'uuidv4'

import { TColumns } from 'components/Table/types'
import Text from 'components/Text'

import { IFundExtract } from 'store/modules/ObjectiveManagement/types'

import { Currency } from 'helpers/money'

import { IActions } from '../FundsTable/types'
import * as s from './styles'

export const columns = (
  actions?: IActions,
  isTabletVertical?: boolean
): TColumns[] => {
  let columnsTemplate: TColumns[] = [
    {
      accessor: 'transaction_date',
      Header: 'Data da transação',
      styles: {
        minWidth: 120,
        width: '20%',
        header: {
          width: '20%',
          minWidth: 120,
        },
      },
      align: 'flex-start',
      justifyHeader: 'flex-start',
      format: (row: IFundExtract) => (
        <s.FundoWrapper key={uuid()}>
          <s.FundoNameWrapper color="gray5">
            {row.transaction_date}
          </s.FundoNameWrapper>
        </s.FundoWrapper>
      ),
    },
    {
      accessor: 'type',
      Header: 'Tipo',
      align: 'flex-start',
      justifyHeader: 'flex-start',
      styles: {
        minWidth: 156,
        width: '20%',
        header: {
          width: '20%',
          minWidth: 156,
        },
      },
      format: (row: IFundExtract) => (
        <Text type="title" color="gray6" bold>
          {row.transaction_type}
        </Text>
      ),
    },
    {
      accessor: 'balance',
      Header: 'Valor',
      align: 'flex-end',
      justifyHeader: 'flex-end',
      styles: {
        minWidth: 156,
        width: '40%',
        header: {
          width: '40%',
          minWidth: 156,
        },
      },
      format: (row: IFundExtract) => (
        <Text type="title" color="gray6" bold>
          {Currency.parse(row.value, true)}
        </Text>
      ),
    },
    {
      accessor: 'status',
      Header: 'Status',
      align: 'flex-end',
      justifyHeader: 'flex-end',
      styles: {
        minWidth: 120,
        width: '10%',
        header: {
          width: '10%',
          minWidth: 100,
        },
      },
      format: (row: IFundExtract) => (
        <Text type="title" color="gray6" bold>
          {row.transaction_status}
        </Text>
      ),
    },
    {
      accessor: 'processed_transaction_date',
      Header: 'Data da efetivação',
      align: 'end',
      justifyHeader: 'flex-end',
      styles: {
        minWidth: 120,
        width: '20%',
        header: {
          width: '20%',
          minWidth: 156,
        },
      },
      format: (row: IFundExtract) => (
        <s.FundoWrapper>
          <s.FundoNameWrapper
            css={`
              text-align: 'right' !important;
            `}
            color="gray5"
          >
            {row.processed_transaction_date}
          </s.FundoNameWrapper>
        </s.FundoWrapper>
      ),
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
