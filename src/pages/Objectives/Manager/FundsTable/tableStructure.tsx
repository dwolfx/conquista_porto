import React from 'react'

import ButtonIcon from 'components/Button/Icon'
import Dropdown from 'components/Dropdown'
import { TColumns } from 'components/Table/types'
import Text from 'components/Text'

import { Currency } from 'helpers/money'
import { RiskColorTag } from 'pages/Objectives/Recommendation/WalletSection/styles'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'

import * as s from './styles'

export const columns: TColumns[] = [
  {
    accessor: 'nickname',
    Header: 'Fundo de investimento',
    styles: {
      minWidth: 120,
      width: '30%',
    },
    align: 'flex-start',
    justifyHeader: 'flex-start',
    format: (row: TObjectiveFunds) => (
      <s.FundoOutterWrapper key={`fund_name_${row.fund_id}`}>
        <RiskColorTag borderRisk={row.order_profile_risk} />
        <s.FundoWrapper>
          <s.FundoNameWrapper color="gray5">{row.nickname}</s.FundoNameWrapper>
          <Text type="caption" color="gray4" bold textAlign="left">
            {row.anbima_category}
          </Text>
        </s.FundoWrapper>
      </s.FundoOutterWrapper>
    ),
  },
  {
    accessor: 'balance',
    Header: 'Saldo bruto',
    styles: {
      minWidth: 120,
      width: '20%',
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
    styles: {
      minWidth: 120,
      width: '20%',
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
    styles: {
      minWidth: 120,
      width: '20%',
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
    styles: {
      minWidth: 60,
      width: '10%',
    },
    format: (row: any) => (
      <Dropdown
        containerPadding="0"
        items={[
          {
            icon: 'add',
            text: 'Investir',
            onClick: () => console.log('oi'),
          },
          {
            icon: 'minus',
            text: 'Resgatar',
            onClick: () => console.log('oi'),
          },
          {
            icon: 'list',
            text: 'Extrato de movimentações',
            onClick: () => console.log('oi'),
          },
          {
            icon: 'money',
            text: 'Vincular disponível ao objetivo',
            onClick: () => console.log('oi'),
          },
          {
            icon: 'information',
            text: 'Mais informações',
            onClick: () => console.log('oi'),
          },
        ]}
      >
        <ButtonIcon icon="more" shape="square" color="secondary" />
      </Dropdown>
    ),
  },
]
