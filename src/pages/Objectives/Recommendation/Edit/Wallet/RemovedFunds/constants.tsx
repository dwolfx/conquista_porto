import React from 'react'
import Text from 'components/Text'
import { IFunds } from 'store/modules/Objective/types'
import * as s from './styles'

export const columns = [
  {
    Header: 'FUNDO DE INVESTIMENTO',
    accessor: 'name',
    align: 'flex-start',
    justifyHeader: 'flex-start',
    styles: {
      width: '100%',
      minWidth: 208,
      header: {
        width: '100%',
        minWidth: 185,
      },
    },
    format: (row: IFunds) => (
      <s.FundoOutterWrapper key={`fund_name_${row.fund_id}`}>
        <s.FundoWrapper>
          <s.FundoNameWrapper color="gray5">{row.name}</s.FundoNameWrapper>
          <Text type="caption" color="gray4" bold textAlign="left">
            {row.arena_category}
          </Text>
        </s.FundoWrapper>
      </s.FundoOutterWrapper>
    ),
  },
]
