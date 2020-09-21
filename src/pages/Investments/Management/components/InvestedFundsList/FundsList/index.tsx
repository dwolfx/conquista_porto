import React from 'react'
import { useHistory } from 'react-router-dom'
import { uuid } from 'uuidv4'
import 'styled-components/macro'

import VerticalList from 'components/VerticalList'
import Text from 'components/Text'

import * as t from '../types'

import * as s from './styles'

const FundsList = ({
  filteredFunds,
  idFund,
  displayInformation,
  onHandleChangeIdFund,
}: t.IFundsList) => {
  const history = useHistory()
  return (
    <s.CardStyled
      footer={
        <s.ButtonStyled
          color="primary"
          data-testid="button-add-fund"
          onClick={() => history.push('/investimentos/lista-fundos')}
        >
          Adicionar fundo
        </s.ButtonStyled>
      }
    >
      {filteredFunds.map((fund: any) => (
        <s.FundItem
          key={uuid()}
          data-testid="fund-list-item"
          selected={idFund === fund.id}
          itemsLength={filteredFunds.length}
          onClick={() => onHandleChangeIdFund(fund.id)}
        >
          <s.HorizontalListStyled
            startItems={[
              <VerticalList
                elements={[
                  <Text type="captionUppercase" bold color="gray6">
                    {fund.categoria === 'Renda Variável'
                      ? 'Ações'
                      : fund.categoria}
                  </Text>,
                  <Text
                    type="body"
                    bold
                    color={idFund === fund.id ? 'blue4' : 'gray5'}
                  >
                    {fund.apelido}
                  </Text>,
                ]}
              />,
            ]}
            endItems={[
              <Text
                type="body"
                bold
                color={idFund === fund.id ? 'gray6' : 'gray5'}
                css={`
                  -webkit-text-security: ${displayInformation
                    ? 'disc'
                    : 'none'};
                `}
              >
                {fund.saldo_bruto}
              </Text>,
            ]}
          />
        </s.FundItem>
      ))}
    </s.CardStyled>
  )
}

export default FundsList
